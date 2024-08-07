import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Projects from "../components/Projects";
import SortProjects from "../components/single/ProjectsSort";
import { Squares2X2Icon } from "@heroicons/react/24/outline";
import Button from "../components/single/button";
import ProjectMap from "../components/single/Map";
import { RootState } from "../store/store";

const ProjectsPage = () => {
  const [viewMode, setViewMode] = useState<"grid">("grid");
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
          <div className="view-toggle-buttons flex space-x-4">
            <Button
              variant={viewMode === "grid" ? "primary" : "dim"}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg"
              onClick={() => setViewMode("grid")}
            >
              <Squares2X2Icon className="h-5 w-5" />
              Grid
            </Button>
          </div>
          <SortProjects />
        </div>
        <ProjectMap projects={projects}/>
        <Projects limit={9} showPagination={true} />
      </div>
    </>
  );
};

export default ProjectsPage;
