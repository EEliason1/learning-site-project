import React from "react";

interface DashboardCourseCardProps {
  name: string;
  progress: number;
}

const DashboardCourseCard: React.FC<DashboardCourseCardProps> = ({ name, progress }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{name}</h2>
      <div className="mt-2">
        <progress value={progress} max={100} className="w-full"></progress>
        <p>{progress}% Complete</p>
      </div>
    </div>
  );
};

export default DashboardCourseCard;
