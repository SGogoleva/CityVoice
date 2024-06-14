import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useLocation } from "react-router-dom";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  postVoteThunk,
  singleProjectThunk,
} from "../../store/thunks/project.thunk";
import { Option, Project, Question } from "../../types/project";
import VoteProgressBar from "../single/ProgressBar";

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
  const [validationError, setValidationError] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
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
  const isAuthenticated = useAppSelector((state) => state.isAuth.isAuthenticated)

  const { projectId } = location.state as { projectId: string };
  console.log(projectId);
  useEffect(() => {
    dispatch(singleProjectThunk(projectId));
  }, [projectId]);

  console.log(projectId);

  useEffect(() => {
    const voted = localStorage.getItem(`voted-${projectId}`);
    if (voted) {
      setVoteSubmitted(true);
    }
  }, [projectId]);

  const handleOptionChange = (question: Question, option: Option) => {
    setAnswers((prevAnswers) => {
      const newAnswers = { ...prevAnswers };

      if (question.type === "boolean") {
        newAnswers[question.questionText] = option.optionText;
      } else if (question.type === "multiple_choice") {
        const currentAnswers =
          (newAnswers[question.questionText] as string[]) || [];
        if (currentAnswers.includes(option.optionText)) {
          newAnswers[question.questionText] = currentAnswers.filter(
            (opt) => opt !== option.optionText
          );
        } else {
          newAnswers[question.questionText] = [
            ...currentAnswers,
            option.optionText,
          ];
        }
      }

      return newAnswers;
    });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!isAuthenticated) {
      alert("You need to login!")
      return
    }
    if (
      project?.questionnaire.some((question) => !answers[question.questionText])
    ) {
      setValidationError("Please answer all questions before submitting.");
      return;
    }

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
      localStorage.setItem(`voted-${projectId}`, "true");
      setVoteSubmitted(true);
    } catch (error) {
      alert("Failed to submit votes");
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < (project?.questionnaire.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  if (loading) return <p>Loading project...</p>;
  if (error) return <p>Error loading project: {error}</p>;

  const currentQuestion = project?.questionnaire[currentQuestionIndex];

  return (
    <div>
      <h1>{project?.name}</h1>
      <p>{project?.description}</p>
      {voteSubmitted ? (
        <>
          <p>Thank you for your vote!</p>
          <VoteProgressBar project={project as Project} />
        </>
      ) : (
        currentQuestion && (
          <div>
            <div key={currentQuestion.questionText}>
              <p>{currentQuestion.questionText}</p>
              {currentQuestion.options.map((option) => (
                <label key={option.optionText}>
                  <input
                    type={
                      currentQuestion.type === "boolean" ? "radio" : "checkbox"
                    }
                    name={currentQuestion.questionText}
                    value={option.optionText}
                    checked={
                      currentQuestion.type === "boolean"
                        ? answers[currentQuestion.questionText] ===
                          option.optionText
                        : (
                            answers[currentQuestion.questionText] as string[]
                          )?.includes(option.optionText)
                    }
                    onChange={() => handleOptionChange(currentQuestion, option)}
                  />
                  {option.optionText}
                </label>
              ))}
            </div>
            <div>
              {validationError && (
                <p style={{ color: "red" }}>{validationError}</p>
              )}
              {currentQuestionIndex > 0 && (
                <button type="button" onClick={handlePrev}>
                  Previous
                </button>
              )}
              {currentQuestionIndex <
              (project?.questionnaire.length || 0) - 1 ? (
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={async (event) => {
                    await handleSubmit(event);
                  }}
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        )
      )}
      {voteStatus === "loading" && <p>Submitting votes...</p>}
      {voteStatus === "failed" && (
        <p style={{ color: "red" }}>Failed to submit votes: {voteError}</p>
      )}
    </div>
  );
};

export default SingleProject;
