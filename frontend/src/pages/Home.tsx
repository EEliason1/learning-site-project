import React from "react";
import HeroSection from "../components/HeroSection";

const Home: React.FC = () => {
  return (
    <div className="text-center bg-blue-400 rounded-lg w-full">
      <h1 className="text-4xl font-bold pt-10">
        Welcome to the E-Learning Platform
      </h1>
      <p className="mt-6 mb-24 mx-auto w-2/3">
        Find the perfect courses for your learning goals. Log in or create an
        account to start learning and track you progress. Browse the course
        catalog without an account to see if EduFlex is right for you.
      </p>
      <HeroSection />
    </div>
  );
};

export default Home;
