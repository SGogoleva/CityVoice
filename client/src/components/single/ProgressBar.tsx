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
    <div className="space-y-6">
      {project.questionnaire.map((question: Question) => {
        const sumVotes = question.options.reduce(
          (acc: number, curr: Option) => acc + curr.voteCount,
          0
        );
        
        const maxVoteCount = Math.max(...question.options.map((opt) => opt.voteCount));

        return (
          <div key={`${uuidv4()}-${question.questionText}`}>
            <p className="text-lg font-semibold text-gray-700">{question.questionText}</p>
            {question.options.map((option: Option) => (
              <div key={`${uuidv4()}-${option.optionText}`} className="space-y-2">
                <p className="text-sm text-gray-600">{option.optionText}</p>
                <ProgressBar
                  //   completed={`${calculatePercentage(option.voteCount, sumVotes)}%`}
                  completed={calculatePercentage(option.voteCount, sumVotes)}
                  bgColor={option.voteCount === maxVoteCount ? "#4CAF50" : "#A9A9A9"}
                  baseBgColor={option.voteCount === maxVoteCount ? "#D6E9C6" : "#F5F5F5"}
                  labelColor={option.voteCount === maxVoteCount ? "#4CAF50" : "#A9A9A9"}
                  labelAlignment="outside"
                  margin="0 auto"
                  maxCompleted={100}
                  width="100%"
                  height="12px"
                  borderRadius="10px"
                  className="progress-bar"
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
