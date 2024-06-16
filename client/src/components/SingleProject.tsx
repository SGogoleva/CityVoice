import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLocation, Link } from "react-router-dom";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import {
  postVoteThunk,
  singleProjectThunk,
} from "../store/thunks/project.thunk";
import { Option, Project, Question } from "../types/project";
import VoteProgressBar from "./single/ProgressBar";

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
  const isAuthenticated = useAppSelector(
    (state) => state.isAuth.isAuthenticated
  );

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
      alert("You need to login!");
      return;
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
    <div className="mx-auto mt-4 p-6 rounded-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
      {/* Project Info */}
      <div className="w-full md:w-3/5 flex flex-col items-center md:items-start">
        <h1 className="text-xl font-bold text-gray-800 mb-4 text-center md:text-left">
          {project?.name}
        </h1>
        <img
          src={project?.imageUrl}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
        <p className="text-gray-600 text-center md:text-left">
          {project?.description}
        </p>
        <Link
          to="/projects"
          className="bg-[#50B04C] text-white mt-8 py-2 px-4 rounded hover:bg-opacity-90"
        >
          Back to all Projects
        </Link>
      </div>

      {/* Voting */}
      <div className="w-full md:w-2/5 mb-4">
        {voteSubmitted ? (
          <>
            <p className="text-[#50B04C] mb-4 text-2xl font-bold">
              Thank you for your vote!
            </p>
            <VoteProgressBar project={project as Project} />
          </>
        ) : (
          currentQuestion && (
            <div>
              <div key={currentQuestion.questionText} className="mb-4">
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {currentQuestion.questionText}
                </p>
                {currentQuestion.options.map((option) => (
                  <label key={option.optionText} className="block mb-2">
                    <input
                      type={
                        currentQuestion.type === "boolean"
                          ? "radio"
                          : "checkbox"
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
                      onChange={() =>
                        handleOptionChange(currentQuestion, option)
                      }
                      className="mr-2"
                    />
                    {option.optionText}
                  </label>
                ))}
              </div>

              {validationError && (
                <p className="text-red-600 mb-4">{validationError}</p>
              )}

              <div className="flex justify-between">
                {currentQuestionIndex > 0 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 w-32"
                  >
                    Previous
                  </button>
                )}

                {currentQuestionIndex <
                (project?.questionnaire.length || 0) - 1 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 w-32"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={async (event) => {
                      await handleSubmit(event);
                    }}
                    className="bg-[#1F3E52] text-white py-2 px-4 rounded hover:bg-opacity-90 w-32"
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          )
        )}
        {voteStatus === "loading" && (
          <p className="text-gray-500 mt-4">Submitting votes...</p>
        )}
        {voteStatus === "failed" && (
          <p className="text-red-600 mt-4">
            Failed to submit votes: {voteError}
          </p>
        )}
      </div>
    </div>
  );
};

export default SingleProject;
