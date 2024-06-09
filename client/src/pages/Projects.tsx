import React, { useState, useEffect, useRef, useCallback } from "react";
import { getProjectsPaginated } from "../http";
import { Project, projectPreview } from "../types/project";
import ProjectsList from "../components/Projects/ProjectList";
import InfiniteScroll from "../components/single/InfiniteScroll";

const LIMIT = 5;

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getProjectsPaginated(page, LIMIT);
      setProjects((prevProjects) => [...prevProjects, ...result]);
      setHasMore(result.length === LIMIT);
    } catch (error) {
      console.error("Error fetching projects", error);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <h1>Projects</h1>
      <InfiniteScroll loadMore={loadMore} loading={loading} hasMore={hasMore}>
        <ProjectsList projects={projects as any} />
      </InfiniteScroll>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Projects;
