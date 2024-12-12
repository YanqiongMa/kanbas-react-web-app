import { RiArrowDropDownFill } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { updateQuiz } from "./reducer";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import * as quizzesClient from "./client";
import QuestionCreator from "./QuestionCreator";
import { FaTrash } from "react-icons/fa";
import { Editor, EditorProvider } from "react-simple-wysiwyg";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

export default function QuizEditor() {

    const { cid, qid } = useParams();
    const fetchQuizDetails = async (quizId: string) => {

        const quiz = await quizzesClient.getQuizById(quizId);
        console.log(quiz);
        const processedQuestions = quiz?.questions.map((q: any) => ({
            ...q,
            choices: q.choices || [], 
            blanks: q.blanks || [], 
        })) || [];
        setQuestions(processedQuestions);
        setQuizName(quiz.title);
        setPoints(quiz.points);
        setDescription(quiz.description);
        setDueDate(quiz.dueDate);
        setAvailabilityDate(quiz.availabilityDate);
        setQuizType(quiz.quizType);
        setTimeLimit(quiz.timeLimit);
        setAssignmentGroup(quiz.assignmentGroup);
        setShuffleForEachStudent(quiz.shuffleForEachStudent);
        setAllowMultipleAttempts(quiz.allowMultipleAttempts);
        setIsPublished(quiz.isPublished);
        setViewResponse(quiz.viewResponse);
        setShowCorrectAnswers(quiz.showCorrectAnswers);
        setAccessCode(quiz.accessCode);
        setSingleQuestionAtATime(quiz.singleQuestionAtATime);
        setCameraRequired(quiz.cameraRequired);
        setLockQuestionsAfterAnswering(quiz.lockQuestionsAfterAnswering);
        setLoading(false);
    };

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid) {
        fetchQuizDetails(qid);
      }
    };
    loadQuiz();
  }, [qid]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [quizName, setQuizName] = useState("");
  const [points, setPoints] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [availabilityDate, setAvailabilityDate] = useState("");
  const [quizType, setQuizType] = useState("Graded Quiz");
  const [timeLimit, setTimeLimit] = useState("");
  const [assignmentGroup, setAssignmentGroup] = useState("Quizzes");
  const [shuffleForEachStudent, setShuffleForEachStudent] = useState(false);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [viewResponse, setViewResponse] = useState("Always");
  const [showCorrectAnswers, setShowCorrectAnswers] = useState("Immediately");
  const [accessCode, setAccessCode] = useState("");
  const [singleQuestionAtATime, setSingleQuestionAtATime] = useState(false);
  const [cameraRequired, setCameraRequired] = useState(false);
  const [lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering] =
    useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [createQuestion, setCreateQuestion] = useState(false);

  const saveQuiz = async (quiz: any) => {
    await quizzesClient.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
  };
  if (loading) {
    return <div>Quiz not found</div>;
  }

  const calculateTotalPoints = () => {
    return questions.reduce(
      (sum, question) => sum + (Number(question.points) || 0),
      0
    );
  };

  return (
    <EditorProvider>
    <div id="wd-quizzes-editor" style={{ marginLeft: "2%", marginRight: "2%" }}>
    <Tabs>
        <TabList>
          <Tab>Detail</Tab>
          <Tab>Question</Tab>
        </TabList>
        <TabPanel>
      <label htmlFor="wd-name"><strong>Name</strong></label>
      <br />
      <input
        id="wd-name"
        value={quizName}
        className="form-control mb-2"
        onChange={(e) => setQuizName(e.target.value)}
      />
      <br />

        {/* Description (WYSIWYG) */}
        <label htmlFor="quiz-description">
          <strong>Description</strong>
        </label>
        <Editor
          value={description} // 当前编辑内容
          onChange={(e) => setDescription(e.target.value)} // 更新 description 状态
          placeholder="Add Quiz Description here..."
          style={{
            minHeight: "200px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
        <br />
      <br />
      <hr />
      <div>
        {/* Points */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-points"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Points</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              id="wd-points"
              value={calculateTotalPoints()}
              className="form-control mb-2"
              readOnly
              onChange={(e) => setPoints(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Quiz Type */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-quiz-type"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Quiz Type</strong>
            </label>
          </div>
          <div className="w-50 pe-3" style={{ position: "relative" }}>
            <select
              name="quiz-type"
              id="wd-quiz-type"
              className="form-control mb-2"
              value={quizType}
              onChange={(e) => setQuizType(e.target.value)}
            >
              <option value="" disabled>
                Select Quiz Type
              </option>
                  <option value="Graded Quiz">Graded Quiz</option>
                  <option value="Practice Quiz">Practice Quiz</option>
                  <option value="Graded Survey">Graded Survey</option>
                  <option value="Ungraded Survey">Ungraded Survey</option>
            </select>
            <RiArrowDropDownFill
              className="fs-1"
              style={{
                position: "absolute",
                top: "1%",
                right: "3%",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <br />

        {/* Time Limit */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-time-limit"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Time Limit</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              id="wd-time-limit"
              value={timeLimit}
              className="form-control mb-2"
              onChange={(e) => setTimeLimit(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Assignment Group */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-assignment-group"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Assignment Group</strong>
            </label>
          </div>
          <div className="w-50 pe-3" style={{ position: "relative" }}>
            <select
              name="assignment-group"
              id="wd-assignment-group"
              className="form-control mb-2"
              value={assignmentGroup}
              onChange={(e) => setAssignmentGroup(e.target.value)}
            >
              <option value="" disabled>
              <strong>Select Assignment Group</strong>
              </option>
              <option value="Quizzes">Quiz</option>
              <option value="Exams">Exam</option>
              <option value="Assignments">Assignment</option>
              <option value="Projects">Project</option>
            </select>
            <RiArrowDropDownFill
              className="fs-1"
              style={{
                position: "absolute",
                top: "1%",
                right: "3%",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <br />

        {/* Shuffle For Each Student */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-shuffle-each-student" className="float-end">
            <strong>Shuffle For Each Student</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-shuffle-each-student"
              checked={shuffleForEachStudent}
              className="form-check-input mb-2"
              onChange={(e) => setShuffleForEachStudent(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* Multiple Attempts */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-allow-multiple-attempts" className="float-end">
            <strong>Multiple Attempts</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-allow-multiple-attempts"
              checked={allowMultipleAttempts}
              className="form-check-input mb-2"
              onChange={(e) => setAllowMultipleAttempts(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* Published */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-is-published" className="float-end">
            <strong>Published</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-is-published"
              checked={isPublished}
              className="form-check-input mb-2"
              onChange={(e) => setIsPublished(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* View Responses */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-view-responses"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>View Responses</strong>
            </label>
          </div>
          <div className="w-50 pe-3" style={{ position: "relative" }}>
            <select
              name="view-responses"
              id="wd-view-responses"
              className="form-control mb-2"
              value={viewResponse}
              onChange={(e) => setViewResponse(e.target.value)}
            >
              <option value="" disabled>
                Select Response View
              </option>
              <option value="Always">Always</option>
              <option value="Never">Never</option>
              <option value="Once">Once</option>
            </select>
            <RiArrowDropDownFill
              className="fs-1"
              style={{
                position: "absolute",
                top: "1%",
                right: "3%",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <br />

        {/* Show Correct Answers */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-show-correct-answers"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Correct Answers</strong>
            </label>
          </div>
          <div className="w-50 pe-3" style={{ position: "relative" }}>
            <select
              name="show-correct-answers"
              id="wd-show-correct-answers"
              className="form-control mb-2"
              value={showCorrectAnswers}
              onChange={(e) => setShowCorrectAnswers(e.target.value)}
            >
              <option value="" disabled>
                Select Correct Answers Visibility
              </option>
              <option value="Immediately">Immediately</option>
              <option value="After all attempts are graded">
                After all attempts are graded
              </option>
              <option value="After due date">After due date</option>
            </select>
            <RiArrowDropDownFill
              className="fs-1"
              style={{
                position: "absolute",
                top: "1%",
                right: "3%",
                pointerEvents: "none",
              }}
            />
          </div>
        </div>
        <br />

        {/* Access Code */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label
              htmlFor="wd-access-code"
              className="float-end"
              style={{ marginTop: "5px" }}
            >
              <strong>Access Code</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              id="wd-access-code"
              type="password"
              value={accessCode}
              className="form-control mb-2"
              onChange={(e) => setAccessCode(e.target.value)}
            />
          </div>
        </div>
        <br />

        {/* Single Question At A Time */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-single-question" className="float-end">
            <strong>Single Question At A Time</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-single-question"
              checked={singleQuestionAtATime}
              className="form-check-input mb-2"
              onChange={(e) => setSingleQuestionAtATime(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* Camera Required */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-camera-required" className="float-end">
            <strong>Camera Required</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-camera-required"
              checked={cameraRequired}
              className="form-check-input mb-2"
              onChange={(e) => setCameraRequired(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* Lock Question After Answering */}
        <div className="d-flex">
          <div className="w-50 pe-5">
            <label htmlFor="wd-lock-question" className="float-end">
            <strong>Lock Question on Answering</strong>
            </label>
          </div>
          <div className="w-50 pe-3">
            <input
              type="checkbox"
              id="wd-lock-question"
              checked={lockQuestionsAfterAnswering}
              className="form-check-input mb-2"
              onChange={(e) => setLockQuestionsAfterAnswering(e.target.checked)}
              style={{ border: "1px solid black" }}
            />
          </div>
        </div>
        <br />

        {/* Dates */}
<div className="d-flex ps-3 pe-3">
  <div className="w-50 pe-5">
    <label
      htmlFor="wd-assign-to"
      className="float-end"
      style={{ marginTop: "5px" }}
    >
      <strong>Assign</strong>
    </label>
  </div>
  <div className="w-50 border p-3">
    <div>
      <label htmlFor="wd-due-date" className="mb-2">
        <strong>Due</strong>
      </label>
      <input
        type="datetime-local"
        id="wd-due-date"
        name="due-date"
        value={dueDate}
        className="form-control mb-2"
        onChange={(e) => setDueDate(e.target.value)}
      />
    </div>

    <br />

    <div className="row">
      <div className="col-md-6 mb-2">
        <label htmlFor="wd-available-from" className="mb-2">
          <strong>Available From</strong>
        </label>
        <input
          type="datetime-local"
          id="wd-available-from"
          name="available-from"
          value={availabilityDate}
          className="form-control mb-2"
          onChange={(e) => setAvailabilityDate(e.target.value)}
        />
      </div>

      <div className="col-md-6 mb-2">
        <label htmlFor="wd-available-until" className="mb-2">
          <strong>Until</strong>
        </label>
        <input
          type="datetime-local"
          id="wd-available-until"
          name="available-until"
          value={dueDate}
          className="form-control mb-2"
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
    </div>
  </div>
</div>

      </div>
      </TabPanel>

      <TabPanel>
  {/*Questions*/}
  <div className="container mt-4">
    {/* 标题与添加按钮 */}
    <div className="d-flex justify-content-between align-items-center mb-4">
      <h4 className="text-primary">Manage Questions</h4>
      <button
        className="btn btn-success d-flex align-items-center"
        onClick={() => setCreateQuestion(true)}
      >
        <i className="bi bi-plus-circle me-2"></i> Add Question
      </button>
    </div>

    {/* Add Question Dialog */}
    {createQuestion && (
      <QuestionCreator
        dialogTitle="Add New Question"
        onAdd={(newQuestion) => {
          const updatedQuestions = [...questions, newQuestion];
          setQuestions(updatedQuestions);
        }}
        onClose={() => setCreateQuestion(false)}
      />
    )}

    {/* 渲染问题列表 */}
    {questions.map((question, index) => (
      <div key={index} className="card shadow-sm mb-4">
        <div className="card-body">
          {/* 标题与删除按钮 */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">Question {index + 1}</h5>
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={() => {
                const updatedQuestions = questions.filter((_, i) => i !== index);
                setQuestions(updatedQuestions);
              }}
            >
              <i className="bi bi-trash"></i> Delete
            </button>
          </div>

          {/* 分数输入 */}
          <label className="form-label">Points</label>
          <input
            type="number"
            className="form-control mb-3 w-25"
            value={question.points}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index].points = e.target.value;
              setQuestions(updatedQuestions);
            }}
          />

          {/* 题目类型 */}
          <label className="form-label">Question Type</label>
          <select
            className="form-select mb-3 w-25"
            value={question.questionType}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index].questionType = e.target.value;
              setQuestions(updatedQuestions);
            }}
          >
            <option value="Multiple Choice">Multiple Choice</option>
            <option value="Multiple Select">Multiple Select</option>
            <option value="True/False">True/False</option>
            <option value="Fill in the Blanks">Fill in the Blanks</option>
          </select>

          {/* 题目内容 */}
          <label className="form-label">Question Text</label>
          <input
            type="text"
            className="form-control mb-3"
            value={question.questionText}
            onChange={(e) => {
              const updatedQuestions = [...questions];
              updatedQuestions[index].questionText = e.target.value;
              setQuestions(updatedQuestions);
            }}
          />

          {/* 答案区域 */}
          <div className="mt-3">
            <label className="form-label">Answers</label>
            {question.questionType === "Multiple Choice" ||
            question.questionType === "Multiple Select" ? (
              <ul className="list-group">
                {question.choices &&
                  question.choices.map((choice: { text: string; isCorrect: boolean }, choiceIndex: number) => (
                    <li
                      key={choiceIndex}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <input
                        type="text"
                        className="form-control w-75"
                        value={choice.text || ""}
                        onChange={(e) => {
                          const updatedQuestions = [...questions];
                          updatedQuestions[index].choices[choiceIndex].text =
                            e.target.value;
                          setQuestions(updatedQuestions);
                        }}
                      />
                      <div className="d-flex align-items-center">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={choice.isCorrect || false}
                          onChange={(e) => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].choices[
                              choiceIndex
                            ].isCorrect = e.target.checked;
                            setQuestions(updatedQuestions);
                          }}
                        />
                       <button
                          className="btn btn-sm btn-outline-danger ms-2"
                          onClick={() => {
                            const updatedQuestions = [...questions];
                            updatedQuestions[index].choices.splice(choiceIndex, 1);
                            setQuestions(updatedQuestions);
                          }}
                        >
                          <FaTrash />
                        </button>

                          <i className="bi bi-trash"></i>
                     
                      </div>
                    </li>
                  ))}
                <li className="list-group-item text-center">
                  <button
                    className="btn btn-sm btn-outline-success"
                    onClick={() => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].choices.push({
                        text: "",
                        isCorrect: false,
                      });
                      setQuestions(updatedQuestions);
                    }}
                  >
                    <i className="bi bi-plus"></i> Add Option
                  </button>
                </li>
              </ul>
            ) :question.questionType === "Fill in the Blanks" ? (
              <div>
                {/* 渲染已有的 blanks */}
                {question.blanks?.map((blank: { answer: string }, blankIndex: number) => (
                  <div key={blankIndex} className="d-flex align-items-center mb-2">
                    {/* Blank 输入框 */}
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Blank ${blankIndex + 1}`}
                      value={blank.answer || ""}
                      onChange={(e) => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].blanks[blankIndex].answer = e.target.value;
                        setQuestions(updatedQuestions);
                      }}
                    />
                    {/* 删除 Blank 按钮 */}
                    <button
                      className="btn btn-outline-danger btn-sm ms-2"
                      onClick={() => {
                        const updatedQuestions = [...questions];
                        updatedQuestions[index].blanks.splice(blankIndex, 1);
                        setQuestions(updatedQuestions);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                ))}
            
                {/* 添加 Blank 按钮 */}
                <button
                  className="btn btn-outline-primary btn-sm mt-2"
                  onClick={() => {
                    const updatedQuestions = [...questions];
            
                    // 确保 blanks 数组已初始化
                    if (!updatedQuestions[index].blanks) {
                      updatedQuestions[index].blanks = [];
                    }
            
                    // 添加一个新的空白项
                    updatedQuestions[index].blanks.push({ answer: "" });
                    setQuestions(updatedQuestions);
                  }}
                >
                  Add Blank
                </button>
              </div>
            ) : question.questionType === "True/False" ? (
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`true-false-${index}`}
                    checked={question.choices[0]?.isCorrect}
                    onChange={() => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].choices = [
                        { text: "True", isCorrect: true },
                        { text: "False", isCorrect: false },
                      ];
                      setQuestions(updatedQuestions);
                    }}
                  />
                  <label className="form-check-label">True</label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`true-false-${index}`}
                    checked={question.choices[1]?.isCorrect}
                    onChange={() => {
                      const updatedQuestions = [...questions];
                      updatedQuestions[index].choices = [
                        { text: "True", isCorrect: false },
                        { text: "False", isCorrect: true },
                      ];
                      setQuestions(updatedQuestions);
                    }}
                  />
                  <label className="form-check-label">False</label>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ))}
  </div>
</TabPanel>

      <div className="pe-3">
        <button
          id="wd-quiz-save"
          className="btn btn-danger float-end"
          onClick={() => {
            saveQuiz({
              _id: qid,
              title: quizName,
              points: calculateTotalPoints(),
              dueDate: dueDate,
              availabilityDate: availabilityDate,
              questions: questions,
              quizType: quizType,
              assignmentGroup: assignmentGroup,
              shuffleForEachStudent: shuffleForEachStudent,
              allowMultipleAttempts: allowMultipleAttempts,
              isPublished: isPublished,
              viewResponse: viewResponse,
              showCorrectAnswers: showCorrectAnswers,
              accessCode: accessCode,
              singleQuestionAtATime: singleQuestionAtATime,
              cameraRequired: cameraRequired,
              lockQuestionsAfterAnswering: lockQuestionsAfterAnswering,
            });
            navigate(`/Kanbas/Courses/${cid}/Quizzes`);
          }}
        >
          Save
        </button>
        <button
          id="wd-quiz-cancel"
          className="btn btn-secondary float-end me-2"
        >
          <a
            href={`#/Kanbas/Courses/${cid}/Quizzes`}
            className="text-decoration-none text-black"
          >
            Cancel
          </a>
        </button>
      </div>
      </Tabs>
    </div>
    </EditorProvider>
  );
}
