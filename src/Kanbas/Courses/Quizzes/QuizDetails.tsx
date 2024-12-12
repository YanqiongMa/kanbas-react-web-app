import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router"; // 引入 useNavigate
import * as quizzesClient from "./client";

export default function QuizDetails() {
  const { cid, qid } = useParams(); // 获取 Course ID 和 Quiz ID
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate(); // 导航函数


  // 获取 Quiz 详细信息
  const fetchQuizDetails = async () => {
    const quizData = await quizzesClient.getQuizById(qid);
    setQuiz(quizData);
  };

  useEffect(() => {
    fetchQuizDetails();
  }, [qid]);

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="quiz-details-container" style={{ margin: "20px" }}>
      {/* 顶部按钮 */}
      <div className="d-flex justify-content-end mb-3">
      <button
          className="btn btn-secondary me-2"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/QuizAttempt/${qid}`)} // 导航到 Attempt 页面
        >
          Preview
        </button>
        <button
          className="btn btn-primary"
          onClick={() => navigate(`/Kanbas/Courses/${cid}/Quizzes/${qid}`)} // 点击 Edit 跳转到编辑页面
        >
          Edit
        </button>
    </div>
      {/* Quiz 标题 */}
      <h2 className="mb-4">{quiz.title}</h2>

      {/* Quiz 详细信息 */}
      <table className="table table-borderless">
        <tbody>
          <tr>
            <td><strong>Quiz Type</strong></td>
            <td>{quiz.quizType || "Graded Quiz"}</td>
          </tr>
          <tr>
            <td><strong>Points</strong></td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td><strong>Assignment Group</strong></td>
            <td>{quiz.assignmentGroup || "Quizzes"}</td>
          </tr>
          <tr>
            <td><strong>Shuffle Answers</strong></td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Time Limit</strong></td>
            <td>{quiz.timeLimit ? `${quiz.timeLimit} Minutes` : "No Limit"}</td>
          </tr>
          <tr>
            <td><strong>Multiple Attempts</strong></td>
            <td>{quiz.allowMultipleAttempts ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Show Correct Answers</strong></td>
            <td>{quiz.showCorrectAnswers || "Immediately"}</td>
          </tr>
          <tr>
            <td><strong>One Question at a Time</strong></td>
            <td>{quiz.singleQuestionAtATime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Webcam Required</strong></td>
            <td>{quiz.cameraRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td><strong>Lock Questions After Answering</strong></td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      {/* 底部横向显示的 Due, Available from, Until */}
      <hr />
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Due</th>
            <th scope="col">For</th>
            <th scope="col">Available from</th>
            <th scope="col">Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate || "Not Set"}</td>
            <td>Everyone</td>
            <td>{quiz.availabilityDate || "Not Set"}</td>
            <td>{quiz.untilDate || "Not Set"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
