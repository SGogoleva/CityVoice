import { RootState, AppDispatch } from "../store/store";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { previewProjectThunk } from "../store/thunks/project.thunk";
import { setPage, setSortBy, setSortOrder } from "../store/slices/project.slice";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ClockIcon } from "@heroicons/react/24/outline";

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
  // useEffect(() => {
  //   if (projectLength === 0) {
  //     dispatch(previewProjectThunk({ limit: 9, page: currentPage }));
  //   }
  // }, [projectLength]);

  const sortBy = useAppSelector((state: RootState) => state.projects.sortBy)
  const sortOrder = useAppSelector((state: RootState) => state.projects.sortOrder)

  useEffect(() => {
    dispatch(
      previewProjectThunk({ limit: 9, page: currentPage, sortBy, sortOrder })
    );
  }, [/*projectLength, sortBy, sortOrder*/ currentPage, sortBy, sortOrder]);
  
  const handleSortOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortRule = event.target.value.split(',');
    dispatch(setSortOrder(sortRule[1]));
    dispatch(setSortBy(sortRule[0]))
    // dispatch(setPage(1));
    // dispatch(previewProjectThunk({ limit: 9, page: 1, sortBy: sortBy, sortOrder: sortOrder }))
    };
    

    // const handleShowMore = () => {
    //   const nextPage = currentPage + 1;
    //   dispatch(setPage(nextPage));
    //   dispatch(previewProjectThunk({ limit: 9, page: nextPage }));
    //   };

      const handleShowMore = () => {
        const nextPage = currentPage + 1;
        dispatch(setPage(nextPage));
        };
      

      const handleProjectClick = (projectName: string, projectId: string) => {
        const formattedName = projectName.toLowerCase().replace(/\s+/g, "-");
        navigate(`/projects/${formattedName}`, {
      state: { projectId },
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yy");
  };

  return (
    <>
      <div className="sort-options flex justify-end items-center">
        <label htmlFor="sort" className="mb-1 mr-4 text-sm font-semibold text-gray-700">Sort by: </label>
        <select id="sort" onChange={handleSortOrderChange} className="px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F3E52]">
          <option value="">None</option>
          <option value="dateCreated,asc">Oldest</option>
          <option value="dateCreated,desc">Newest</option>
          <option value="pollPrice,asc">Price low to high</option>
          <option value="pollPrice,desc">Price high to low</option>
        </select>
      </div>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 project-list">
        {projects?.map((project) => (
          <div
            key={project._id}
            className="project-card cursor-pointer p-4 bg-white shadow-md rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg group relative"
            onClick={() => handleProjectClick(project.name, project._id)}
          >
            <div className="relative h-64 mb-4 bg-gray-200">
              <div className="absolute top-2 right-2 text-sm px-2 py-1 rounded transition-colors duration-300 group-hover:bg-[#50B04C] group-hover:text-white">
                +{project.pollPrice} scores
              </div>
              <div className="absolute top-2 left-2 flex space-x-1 px-2 py-1">
                <ClockIcon className="h-5 w-5" />
                <p>before {formatDate(project.dateCreated)}</p>
              </div>
              <div className="image-placeholder flex items-center justify-center text-gray-500 h-full">
                Photo
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <div className="description text-gray-700 truncate-multiline">
              {project.description}
            </div>
          </div>
        ))}
      </div>
      {currentPage < totalPages && (
        <div className="flex justify-center">
          <button
            onClick={handleShowMore}
            disabled={loading}
            className="mt-6 mb-6 bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 disabled:bg-gray-300"
          >
            {loading ? "Loading..." : "Show more"}
          </button>
        </div>
      )}
    </>
  );
};

export default Projects;
