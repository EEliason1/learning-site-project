import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  return (
    <div className="text-center bg-blue-400 rounded-lg w-full">
      <h1 className="text-4xl font-bold pt-10">Welcome to EduFlex</h1>
      <p className="mt-6 mb-24 mx-auto w-2/3">
        Find the perfect courses for your learning goals. Log in or create an
        account to start learning and track you progress. Browse the course
        catalog without an account to see if EduFlex is right for you.
      </p>
      <div className="flex justify-center gap-6 pb-10">
        <Button
          title="Browse Courses"
          onClick={() => navigate("/browse-courses")}
        />
        {!isLoggedIn ? (
          <Button title="Sign In" onClick={() => navigate("/sign-in")} />
        ) : (
          <Button
            title="View Active Courses"
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
