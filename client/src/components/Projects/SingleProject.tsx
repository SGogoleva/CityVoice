import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  postVoteThunk,
  singleProjectThunk,
} from "../../store/thunks/project.thunk";
import { Option, Question } from "../../types/project";

// const SingleProject = () => {
//   const location = useLocation();
//   const dispatch = useAppDispatch();
//   const loading = useAppSelector(
//     (state: RootState) => state.singleProject.loading
//   );
//   const project = useAppSelector(
//     (state: RootState) => state.singleProject.project
//   );
//   const error = useAppSelector((state: RootState) => state.singleProject.error);

//   const { projectId } = location.state as { projectId: string };
//   console.log(projectId)
//   useEffect(() => {
//     dispatch(singleProjectThunk(projectId));
//   }, [projectId]);

//   console.log(projectId)

//   const handleVote = async (projectId: string, questionText: string, optionText: string) => {
//     dispatch(postVoteThunk({ projectId, questionText, optionText }));
//   };

//   return (
//     <>
//     <div>
//       <h1>{project?.name}</h1>
//       <p>{project?.description}</p>
//       <button>Proceed to vote</button>
//     </div>
//     <div>
//       {project?.questionnaire.map((question) => (
//         <div key={question.questionText}>
//           <h2>{question.questionText}</h2>
//           {question.options.map((option) => (
//             <button key={option.optionText} onClick={() => handleVote(project._id, question.questionText, option.optionText)}>
//               {option.optionText}
//             </button>
//           ))}
//         </div>
//       ))}
//     </div>

//     </>
//   );
// };

type Answers = Record<string, string | string[]>;
const SingleProject = () => {
  const location = useLocation();
  const [answers, setAnswers] = useState<Answers>({});
  const dispatch = useAppDispatch();
  const loading = useAppSelector(
    (state: RootState) => state.singleProject.loading
  );
  const project = useAppSelector(
    (state: RootState) => state.singleProject.project
  );
  const error = useAppSelector((state: RootState) => state.singleProject.error);
  const voteStatus = useAppSelector((state) => state.vote.status);
  const voteError = useAppSelector((state) => state.vote.error);

  const { projectId } = location.state as { projectId: string };
  console.log(projectId)
  useEffect(() => {
    dispatch(singleProjectThunk(projectId));
  }, [projectId]);

  console.log(projectId)

  const handleOptionChange = (question: Question, option: Option) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };

      if (question.type === "boolean") {
        newAnswers[question.questionText] = option.optionText;
      } else if (question.type === "multiple_choice") {
        const currentAnswers = newAnswers[question.questionText] as string[] || [];
        if (currentAnswers.includes(option.optionText)) {
          newAnswers[question.questionText] = currentAnswers.filter(
            (opt) => opt !== option.optionText
          );
        } else {
          newAnswers[question.questionText] = [...currentAnswers, option.optionText];
        }
      }

      return newAnswers;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      for (const [questionText, optionTexts] of Object.entries(answers)) {
        const optionTextArray = Array.isArray(optionTexts)
          ? optionTexts
          : [optionTexts];

        for (const optionText of optionTextArray) {
          await dispatch(
            postVoteThunk({
              projectId: project?._id,
              questionText,
              optionText,
            })
          );
        }
      }
      alert("Votes submitted successfully!");
    } catch (error) {
      alert("Failed to submit votes");
    }
  };

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      <form onSubmit={handleSubmit}>
        {project?.questionnaire.map((question) => (
          <div key={question.questionText}>
            <p>{question.questionText}</p>
            {question.options.map((option) => (
              <label key={option.optionText}>
                <input
                  type={question.type === "boolean" ? "radio" : "checkbox"}
                  name={question.questionText}
                  value={option.optionText}
                  checked={
                    question.type === "boolean"
                      ? answers[question.questionText] === option.optionText
                      : answers[question.questionText]?.includes(option.optionText)
                  }
                  onChange={() => handleOptionChange(question, option)}
                />
                {option.optionText}
              </label>
            ))}
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {voteStatus === "loading" && <p>Submitting votes...</p>}
      {voteStatus === "failed" && <p>Error: {voteError}</p>}
    </div>
  );
};

export default SingleProject;
