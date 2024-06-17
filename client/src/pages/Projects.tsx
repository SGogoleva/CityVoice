import { useState } from "react";
import Projects from "../components/Projects";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import ProjectMap from "../components/single/Map";
import CityFilter from "../components/single/ProjectsFilter";
import SortProjects from "../components/single/ProjectsSort";
import { MapIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

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

        <div className="flex justify-between items-center">
          <CityFilter />
          <div className="view-toggle-buttons flex space-x-4">
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg focus:outline-none transition ${
                viewMode === "grid"
                  ? "bg-[#1F3E52] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setViewMode("grid")}
            >
              <Squares2X2Icon className="h-5 w-5" />
              Grid
            </button>
            <button
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg focus:outline-none transition ${
                viewMode === "map"
                  ? "bg-[#1F3E52] text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="h-5 w-5" />
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
