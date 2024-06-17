import { useState } from "react";
import Projects from "../components/Projects";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import ProjectMap from "../components/single/Map";
import CityFilter from "../components/single/ProjectsFilter";
import SortProjects from "../components/single/ProjectsSort";

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState<"map" | "grid">("grid");
  const cities = useAppSelector((state: RootState) => state.projects.cities);
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects
  );
  return (
    <>
      <div className="container mt-4 text-sm min-h-screen">
        <h1 className="sr-only">Projects</h1>

        <div className="flex justify-between">
          <CityFilter />
          <div className="view-toggle-buttons">
            <button
              className={`px-4 py-2 rounded-lg focus:outline-none transition ${
                viewMode === "grid"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </button>
            <button
              className={`px-4 py-2 rounded-lg focus:outline-none transition ${
                viewMode === "map"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setViewMode("map")}
            >
              Map
            </button>
          </div>
          <SortProjects />
        </div>

        {viewMode === "map" ? (
          <ProjectMap projects={projects} cities={cities} />
        ) : (
          <Projects />
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
