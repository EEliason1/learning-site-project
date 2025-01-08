import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './schemas';
import { resolvers } from './resolvers';
import { getContext } from './auth/context';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import contentRoutes from './routes/contentRoutes';

dotenv.config();

const app = express();

app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          frameSrc: ["'self'", "https://sandbox.embed.apollographql.com"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "https://fonts.gstatic.com"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "https://embeddable-sandbox.cdn.apollographql.com",
          ],
          connectSrc: [
            "'self'",
            "https://apollo-server-landing-page.cdn.apollographql.com",
            "https://sandbox.embed.apollographql.com",
          ],
          imgSrc: [
            "'self'",
            "data:",
            "https://apollo-server-landing-page.cdn.apollographql.com",
          ],
          manifestSrc: [
            "'self'",
            "https://apollo-server-landing-page.cdn.apollographql.com",
          ],
        },
      },
    })
  );

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests, please try again later.',
  })
);
app.use(mongoSanitize());
app.use(xss());

app.use(cors({ origin: [process.env.CLIENT_URL || 'http://localhost:3000'], credentials: true }));
app.use(bodyParser.json({ limit: '10kb' }));
app.use(bodyParser.urlencoded({ extended: true }));

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/e-learning');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const startApolloServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: getContext,
    })
  );

  console.log('GraphQL server ready at /graphql');
};

app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/content', contentRoutes);

const startServer = async () => {
  await connectDatabase();
  await startApolloServer();

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
    console.log(`🚀 GraphQL is available at http://localhost:${PORT}/graphql`);
  });
};

startServer().catch((err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

export default app;
