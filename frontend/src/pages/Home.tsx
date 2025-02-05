import React from "react";
import HeroSection from "../components/HeroSection";
import PopularCourses from "../components/PopularCourses";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <HeroSection />
      <PopularCourses />
    </div>
  );
};

export default Home;
