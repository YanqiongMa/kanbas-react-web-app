import { RiArrowDropDownFill } from "react-icons/ri";
import { Editor } from "react-simple-wysiwyg";

export default function QuizCreator({
  dialogTitle,
  quizName,
  setQuizName,
  addQuiz,
  points,
  setPoints,
  description,
  setDescription,
  dueDate,
  setDueDate,
  availabilityDate,
  setAvailabilityDate,
  quizType,
  setQuizType,
  timeLimit,
  setTimeLimit,
  assignmentGroup,
  setAssignmentGroup,
  shuffleForEachStudent,
  setShuffleForEachStudent,
  allowMultipleAttempts,
  setAllowMultipleAttempts,
  isPublished,
  setIsPublished,
  viewResponse,
  setViewResponse,
  showCorrectAnswers,
  setShowCorrectAnswers,
  accessCode,
  setAccessCode,
  singleQuestionAtATime,
  setSingleQuestionAtATime,
  cameraRequired,
  setCameraRequired,
  lockQuestionsAfterAnswering,
  setLockQuestionsAfterAnswering,
}: {
  dialogTitle: string;
  quizName: string;
  setQuizName: (name: string) => void;
  points: string;
  setPoints: (name: string) => void;
  description: string;
  setDescription: (name: string) => void;
  dueDate: string;
  setDueDate: (name: string) => void;
  availabilityDate: string;
  setAvailabilityDate: (name: string) => void;
  quizType: string;
  setQuizType: (name: string) => void;
  timeLimit: string;
  setTimeLimit: (name: string) => void;
  assignmentGroup: string;
  setAssignmentGroup: (name: string) => void;
  shuffleForEachStudent: boolean;
  setShuffleForEachStudent: (value: boolean) => void;
  allowMultipleAttempts: boolean;
  setAllowMultipleAttempts: (value: boolean) => void;
  isPublished: boolean;
  setIsPublished: (value: boolean) => void;
  viewResponse: string;
  setViewResponse: (name: string) => void;
  showCorrectAnswers: string;
  setShowCorrectAnswers: (name: string) => void;
  accessCode: string;
  setAccessCode: (name: string) => void;
  singleQuestionAtATime: boolean;
  setSingleQuestionAtATime: (value: boolean) => void;
  cameraRequired: boolean;
  setCameraRequired: (value: boolean) => void;
  lockQuestionsAfterAnswering: boolean;
  setLockQuestionsAfterAnswering: (value: boolean) => void;
  addQuiz: () => void;
}) {
  return (
    <div
      id="wd-add-quiz-dialog"
      className="modal fade"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div
        className="modal-dialog modal-xl"
        style={{ width: "90%", height: "100%" }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              {dialogTitle}
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>
          <div className="modal-body">
            {/* Name + Description */}
            <input
              className="form-control"
              value={quizName}
              placeholder="Quiz Name"
              onChange={(e) => setQuizName(e.target.value)}
            />
            <br />

            {/* Description (WYSIWYG) */}
            <label htmlFor="quiz-description">
              <strong>Quiz Description</strong>
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
            
            {/* Points */}
            <div className="d-flex">
              <div className="w-50 pe-5">
                <label
                  htmlFor="wd-points"
                  className="float-end"
                  style={{ marginTop: "5px" }}
                >
                  Points
                </label>
              </div>
              <div className="w-50 pe-3">
                <input
                  id="wd-points"
                  value={points}
                  className="form-control mb-2"
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
                  Quiz Type
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
                  Time Limit
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
                  Assignment Group
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
                    Select Assignment Group
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
                  Shuffle For Each Student
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
                <label
                  htmlFor="wd-allow-multiple-attempts"
                  className="float-end"
                >
                  Multiple Attempts
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
                  Published
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
                  View Responses
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
                  Correct Answers
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
                  Access Code
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
                  Single Question At A Time
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
                  Camera Required
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
                  Lock Question on Answering
                </label>
              </div>
              <div className="w-50 pe-3">
                <input
                  type="checkbox"
                  id="wd-lock-question"
                  checked={lockQuestionsAfterAnswering}
                  className="form-check-input mb-2"
                  onChange={(e) =>
                    setLockQuestionsAfterAnswering(e.target.checked)
                  }
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
                  {" "}
                  Assign
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
                    <label htmlFor="wd-due-date" className="mb-2">
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
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              onClick={addQuiz}
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-danger"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
