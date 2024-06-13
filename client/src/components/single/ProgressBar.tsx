import { Project, Question, Option } from "../../types/project";
import ProgressBar from "@ramonak/react-progress-bar";
import { v4 as uuidv4 } from "uuid";

interface ProgressBarProps {
  project: Project;
}
const VoteProgressBar: React.FC<ProgressBarProps> = ({ project }) => {
  const calculatePercentage = (voteCount: number, totalVotes: number) => {
    return totalVotes > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0;
  };
  return (
    <div>
      {project.questionnaire.map((question: Question) => {
        const sumVotes = question.options.reduce(
          (acc: number, curr: Option) => acc + curr.voteCount,
          0
        );
        return (
          <div key={`${uuidv4()}-${question.questionText}`}>
            <p>{question.questionText}</p>
            {question.options.map((option: Option) => (
              <div key={`${uuidv4()}-${option.optionText}`}>
                <p>{option.optionText}</p>
                <ProgressBar
                  //   completed={`${calculatePercentage(option.voteCount, sumVotes)}%`}
                  completed={calculatePercentage(option.voteCount, sumVotes)}
                  bgColor="#6f9381"
                  baseBgColor="#c1d0c8"
                  labelColor="#6f9381"
                  labelAlignment="outside"
                  margin="50"
                  maxCompleted={100}
                  width="300px"
                  height="25px"
                  borderRadius="7px"
                />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
export default VoteProgressBar;
