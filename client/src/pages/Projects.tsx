import { useEffect, useState } from "react";
import Projects from "../components/Projects";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import ProjectMap from "../components/single/Map";
import CityFilter from "../components/single/ProjectsFilter";
import SortProjects from "../components/single/ProjectsSort";
import { MapIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import Button from "../components/single/button";

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState<"map" | "grid">("grid");
  const cities = useAppSelector((state: RootState) => state.projects.cities);
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container mt-4 text-sm min-h-screen">
        <h1 className="sr-only">Projects</h1>

        <div className="flex justify-between items-center">
          <CityFilter />
          <div className="view-toggle-buttons flex space-x-4">
            <Button
              variant={viewMode === "grid" ? "primary" : "dim"}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg"
              onClick={() => setViewMode("grid")}
            >
              <Squares2X2Icon className="h-5 w-5" />
              Grid
            </Button>
            <Button
              variant={viewMode === "map" ? "primary" : "dim"}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg"
              onClick={() => setViewMode("map")}
            >
              <MapIcon className="h-5 w-5" />
              Map
            </Button>
          </div>
          <SortProjects />
        </div>

        {viewMode === "map" ? (
          <ProjectMap projects={projects} cities={cities} />
        ) : (
          <Projects limit={9} showPagination={true} />
        )}
      </div>
    </>
  );
};

export default ProjectsPage;
