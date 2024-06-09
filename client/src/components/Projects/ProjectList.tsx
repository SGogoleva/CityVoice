import React from "react";
import { projectPreview } from "../../types/project";
import Container from "../Container/Container";
import './ProjectList.css'

type ProjectsListProps = {
    projects: projectPreview[];
  };
  
  const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
    return (
      <Container>
      <div className="project-list">
        {projects.map((project, index) => (
          <div key={index} className="project-card">
            <h2>{project.name}</h2>
            <p>{project.dateCreated}</p>
            <p>+{project.pollPrice} scores</p>
            <div className="image-placeholder">Photo</div>
            <div className="description">{project.description}</div>
          </div>
        ))}
      </div>
      </Container>
    );
  };
  
  export default ProjectsList;
  