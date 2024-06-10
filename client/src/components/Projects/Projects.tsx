import { RootState, AppDispatch } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { previewProjectThunk } from "../../store/thunks/project.thunk";
import { setPage } from "../../store/slices/project.slice";
import { useEffect } from "react";
import Container from "../Container/Container";
import { Navigate, useNavigate } from "react-router-dom";

const Projects = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects = useAppSelector(
    (state: RootState) => state.projects.projects
  );
  const loading = useAppSelector((state: RootState) => state.projects.loading);
  const currentPage = useAppSelector(
    (state: RootState) => state.projects.currentPage
  );
  const totalPages = useAppSelector(
    (state: RootState) => state.projects.totalPages
  );
  const error = useAppSelector((state: RootState) => state.projects.error);
  const projectLength = useAppSelector((s) => s.projects.projects.length);
  useEffect(() => {
    if (projectLength === 0) {
      dispatch(previewProjectThunk({ limit: 3, page: currentPage }));
    }
  }, [projectLength]);
  const handleShowMore = () => {
    const nextPage = currentPage + 1;
    dispatch(setPage(nextPage));
    dispatch(previewProjectThunk({ limit: 3, page: nextPage }));
  };

  const handleProjectClick = (projectName: string, projectId: string) => {
    const formattedName = projectName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/projects/${formattedName}`, {
      state: { projectId },
    });
  };

  return (
    <Container>
      <div className="project-list">
        {projects?.map((project) => (
          <div
            key={project._id}
            className="project-card"
            onClick={() => handleProjectClick(project.name, project._id)}
          >
            <h2>{project.name}</h2>
            <p>{project.dateCreated}</p>
            <p>+{project.pollPrice} scores</p>
            <div className="image-placeholder">Photo</div>
            <div className="description">{project.description}</div>
          </div>
        ))}
      </div>
      {currentPage < totalPages && (
        <button onClick={handleShowMore} disabled={loading}>
          {loading ? "Loading..." : "Show more"}
        </button>
      )}
    </Container>
  );
};

export default Projects;
