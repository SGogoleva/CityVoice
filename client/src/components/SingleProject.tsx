import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLocation } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect } from "react";
import { postVoteThunk, singleProjectThunk } from "../store/thunks/project.thunk";

const SingleProject = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state: RootState) => state.singleProject.loading
  );
  const project = useAppSelector(
    (state: RootState) => state.singleProject.project
  );
  const error = useAppSelector((state: RootState) => state.singleProject.error);

  const { projectId } = location.state as { projectId: string };
  console.log(projectId)
  useEffect(() => {
    dispatch(singleProjectThunk(projectId));
  }, [projectId]);

  console.log(projectId)

  const handleVote = async (projectId: string, questionText: string, optionText: string) => {
    dispatch(postVoteThunk({ projectId, questionText, optionText }));
  };


  return (
    <>
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <button>Proceed to vote</button>
    </div>
    <div>
      {project?.questionnaire.map((question) => (
        <div key={question.questionText}>
          <h2>{question.questionText}</h2>
          {question.options.map((option) => (
            <button key={option.optionText} onClick={() => handleVote(project._id, question.questionText, option.optionText)}>
              {option.optionText}
            </button>
          ))}
        </div>
      ))}
    </div>

    </>
  );
};

export default SingleProject;
