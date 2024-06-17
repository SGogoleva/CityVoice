import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { get3LastProjectsThunk } from "../../store/thunks/project.thunk";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

const Projects3Preview = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const projects = useAppSelector((state) => state.last3Projects.projects);
  const loading = useAppSelector((state) => state.last3Projects.loading);

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "dd.MM.yy");
  };

  useEffect(() => {
    dispatch(get3LastProjectsThunk());
  }, []);

  const handleProjectClick = (projectName: string, projectId: string) => {
    const formattedName = projectName.toLowerCase().replace(/\s+/g, "-");
    navigate(`/projects/${formattedName}`, {
      state: { projectId },
    });
  };
  return (
    <>
      <div>{loading && <div>Loading...</div>}</div>
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
                {/* <ClockIcon className="h-5 w-5" /> */}
                <p>Vote until {formatDate(project.dueDate)}</p>
              </div>
              <div className="image-placeholder flex items-end justify-center text-gray-500 h-full">
                <img
                  src={project.imageUrl}
                  alt=""
                  className="h-5/6 w-full object-cover"
                />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">{project.name}</h2>
            <div className="description text-gray-700 truncate-multiline">
              {project.description}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Projects3Preview;
