import React from "react";
import { projectPreview } from "../../types/project";
import Container from "../Container/Container";

type ProjectsListProps = {
    projects: projectPreview[];
  };
  
  const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
    return (
      <Container className="projects-list">
        {projects.map((project, index) => (
          <div key={index} data-project={JSON.stringify(project)} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.dateCreated}</p>
            <p>{project.description}</p>
            <p>+{project.pollPrice} scores</p>  
          </div>
        ))}
      </Container>
    );
  };
  
  export default ProjectsList;
  