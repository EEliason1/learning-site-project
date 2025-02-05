import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = false;

  return (
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
  );
};

export default HeroSection;
