import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import User from '../models/User';

export const enableMFA = async (req: any, res: any) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const secret = speakeasy.generateSecret({ name: `E-Learning (${user.email})` });
  user.mfaSecret = secret.base32;
  await user.save();

  const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url!);
  res.json({ qrCodeUrl });
};

export const verifyMFA = async (req: any, res: any) => {
  const { token } = req.body;
  const user = await User.findById(req.user.id);
  if (!user || !user.mfaSecret) return res.status(400).json({ error: 'MFA not enabled' });

  const isVerified = speakeasy.totp.verify({
    secret: user.mfaSecret,
    encoding: 'base32',
    token,
  });

  if (!isVerified) return res.status(400).json({ error: 'Invalid MFA token' });
  res.json({ message: 'MFA verified successfully' });
};

export const requestPasswordReset = async (req: any, res: any) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'User not found' });

  const resetToken = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = new Date(Date.now() + 3600000); // 1 hour from now
  await user.save();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
  });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await transporter.sendMail({
    to: user.email,
    subject: 'Password Reset Request',
    html: `<p>You requested a password reset. Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
  });

  res.json({ message: 'Password reset email sent' });
};

export const resetPassword = async (req: any, res: any) => {
  const { token, newPassword } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: 'Password successfully reset' });
};

export const verifyAccount = async (req: any, res: any) => {
  const { token } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.isVerified = true;
    await user.save();
    res.json({ message: 'Account successfully verified' });
  } catch {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};
