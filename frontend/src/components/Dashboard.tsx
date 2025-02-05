import React, { useState } from "react";
import { Link } from "react-router-dom";
import CourseCard from "./CourseCard";
import { Responsive, WidthProvider } from "react-grid-layout";

// Wrap Responsive with WidthProvider to allow dynamic layouts
const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard: React.FC = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Course 1", progress: 70 },
    { id: 2, name: "Course 2", progress: 50 },
    { id: 3, name: "Course 3", progress: 30 },
  ]);

  return (
    <div>
      {/* Layout for Course Cards */}
      <ResponsiveGridLayout
        className="layout"
        layouts={{
          lg: [
            { i: "1", x: 0, y: 0, w: 4, h: 4 },
            { i: "2", x: 4, y: 0, w: 4, h: 4 },
            { i: "3", x: 8, y: 0, w: 4, h: 4 },
          ],
        }}
        breakpoints={{ lg: 1200 }}
        cols={{ lg: 12 }}
        isDraggable={false} // No dragging allowed
        isResizable={false} // No resizing allowed
      >
        {courses.map((course) => (
          <div key={course.id} className="course-card-wrapper">
            <Link to={`/course/${course.id}`}>
              <CourseCard name={course.name} progress={course.progress} />
            </Link>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default Dashboard;
