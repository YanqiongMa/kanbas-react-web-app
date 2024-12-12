import { useParams } from "react-router";
import * as quizzesClient from "./client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
export default function QuizAttempt() {
const { qid } = useParams();
const { currentUser } = useSelector((state: any) => state.accountReducer);
const [latestAttempt, setLatestAttempt] = useState<any>({});
const [currentQuiz, setCurrentQuiz] = useState<any>({});
const [startAttempt, setStartAttempt] = useState(false);
const [currentAttempt, setCurrentAttempt] = useState<any>({});
const [enteredAccessCode, setEnteredAccessCode] = useState("");
const [clickedAccessSubmit, setClickedAccessSubmit] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const handleAccessCodeSubmit = () => {
  if (enteredAccessCode === currentQuiz.accessCode) {
    setErrorMessage("");
    setClickedAccessSubmit(true);
  } else {
    setErrorMessage("Incorrect access code. Please try again.");
  }
};


const getLatestAttempt = async () => {
  const response = await quizzesClient.getLatestAttempt(qid, currentUser._id);
  setLatestAttempt(response);
  if (response) {
    setCurrentAttempt(response);
  }
  return response;
};


const calculateScore = () => {
  let points = 0;
  const questions = currentQuiz?.questions || [];
  const answers = currentAttempt?.answers || [];
  if (answers.length === 0) {
    return points;
  }
  answers.forEach((answer: any) => {
    const question = questions?.find(
      (ques: any) => String(ques._id) === String(answer.questionId)
    );
    if (!question) return;
    switch (question.questionType) {
      case "Multiple Choice":
        if (
          answer.selectedChoices?.length === 1 &&
          answer.selectedChoices[0].isCorrect
        ) {
          points += question.points;
        }
        break;
      case "Multiple Select":
        const correctChoices = question.choices.filter(
          (choice: any) => choice.isCorrect
        );
        const selectedCorrectChoices = answer.selectedChoices.filter(
          (choice: any) => choice.isCorrect && choice.isSelected
        );
        if (
          correctChoices.length === selectedCorrectChoices.length &&
          correctChoices.every((correctChoice: any) =>
            selectedCorrectChoices.some(
              (selected: any) => selected.text === correctChoice.text
            )
          )
        ) {
          points += question.points;
        }
        break;
      case "True/False":
        const correctChoice = question.choices?.find(
          (choice: any) => choice.isCorrect
        );
        const correctAnswer = correctChoice
          ? correctChoice.text.toLowerCase() === "true"
          : null;
        if (answer.trueFalseAnswer === correctAnswer) {
          points += question.points;
        }
        break;
      case "Fill in the Blanks":
        const correctBlanks = question.blanks.map(
          (blank: any) => blank.answer
        );
        const providedAnswers = answer.fillInAnswers.map((ans: any) =>
          ans.answer.trim()
        );
        if (
          correctBlanks.length === providedAnswers.length &&
          correctBlanks.every(
            (correct: any, index: any) =>
              correct.toLowerCase() === providedAnswers[index]?.toLowerCase()
          )
        ) {
          points += question.points;
        }
        break;
      default:
        console.warn(`Unknown question type: ${question.questionType}`);
    }
  });
  return points;
};
const getQuiz = async () => {
  const quiz = await quizzesClient.getQuizById(qid);
  setCurrentQuiz(quiz);
  return quiz;
};
const handleSubmitQuiz = async () => {
  if (latestAttempt) {
    alert("Quiz is already submitted! You can only view the last attempt.");
  } else {
    const points = calculateScore();
    const finishedAttempt = {
      ...currentAttempt,
      completedAt: new Date().toISOString(),
      score: points,
    };
    await quizzesClient.submitQuiz(finishedAttempt);
    getLatestAttempt();
  }
};
const startQuiz = () => {
  getLatestAttempt();
  if (latestAttempt) {
    alert("Quiz is already submitted! You can only view the last attempt.");
  } else {
    setStartAttempt(true);
    setCurrentAttempt({
      quizId: qid,
      studentId: currentUser._id,
      attemptNumber: 1,
      startedAt: Date.now(),
      answers: [],
    });
  }
};
const handleAnswerChange = (questionId: any, answer: any) => {
  setCurrentAttempt((prevAttempt: any) => {
    const existingAnswerIndex = prevAttempt.answers?.findIndex(
      (ques: any) => ques.questionId === questionId
    );
    let updatedAnswers;
    if (existingAnswerIndex !== -1) {
      updatedAnswers = [...prevAttempt.answers];
      updatedAnswers[existingAnswerIndex] = {
        ...updatedAnswers[existingAnswerIndex],
        ...answer,
      };
    } else {
      updatedAnswers = [...prevAttempt.answers, { questionId, ...answer }];
    }
    return {
      ...prevAttempt,
      answers: updatedAnswers,
    };
  });
};
useEffect(() => {
  getQuiz();
  getLatestAttempt();
}, []);
return (
  <div className="container mt-4">
    <Tabs>
        <TabList>
          <Tab>Detail</Tab>
          <Tab>Quiz</Tab>
        </TabList>
        <TabPanel>
    <div className="container mt-4">
 {/* Quiz Details Card */}
 <div className="card p-4 shadow-sm">
   <h4 className="card-title text-center mb-4">
   📋  <span className="fw-bold">Details</span>
   </h4>
   {/* 使用网格系统分两列 */}
   <div className="row mb-3">
     <div className="col-md-6">
       <p><strong>Title:</strong> {currentQuiz.title}</p>
     </div>
     <div className="col-md-6">
       <p><strong>Total Points:</strong> {currentQuiz.points}</p>
     </div>
   </div>
   <hr />
   <div className="row mb-3">
     <div className="col-md-6">
       <p><strong>Description:</strong> {currentQuiz.description}</p>
     </div>
     <div className="col-md-6">
       <p><strong>Time Limit:</strong> {currentQuiz.timeLimit} minutes</p>
     </div>
   </div>
   <hr />
   <div className="row">
     <div className="col-md-6">
       <p><strong>Due Date:</strong> {currentQuiz.dueDate}</p>
     </div>
     <div className="col-md-6">
       <p><strong>Available Date:</strong> {currentQuiz.availabilityDate}</p>
     </div>
   </div>
 </div>
</div>
<div className="card mt-4 p-4 shadow-sm border-0 rounded">
 {/* 标题 */}
 <h4 className="card-title text-center mb-4">
   📊 <span className="fw-bold">Restlts</span>
 </h4>


 {/* 状态内容 */}
 <div className="row mb-3">
   <div className="col-6">
     <p>
       <strong>Points Scored:</strong>
     </p>
   </div>
   <div className="col-6 text-end">
     <p
       className={`fw-bold ${
         latestAttempt ? "text-success" : "text-danger"
       }`}
     >
       {latestAttempt ? latestAttempt.score : "Not Submitted"}
     </p>
   </div>
 </div>
 <hr />


 <div className="row mb-3">
   <div className="col-6">
     <p>
       <strong>Submitted On:</strong>
     </p>
   </div>
   <div className="col-6 text-end">
     <p
       className={`fw-bold ${
         latestAttempt ? "text-primary" : "text-muted"
       }`}
     >
       {latestAttempt ? latestAttempt.completedAt : "Not Submitted"}
     </p>
   </div>
 </div>
</div>
    {/* Access Code Section */}
    {currentQuiz.accessCode && !latestAttempt && (
      <div className="card mt-4 p-4">
        <h4 className="card-title">Enter Access Code</h4>
        <div className="form-group">
          <input
            type="text"
            className="form-control mb-3"
            value={enteredAccessCode}
            onChange={(e) => setEnteredAccessCode(e.target.value)}
            placeholder="Enter access code"
          />
          <button
            className="btn btn-primary"
            onClick={handleAccessCodeSubmit}
          >
            Submit
          </button>
          {errorMessage && (
            <div className="text-danger mt-2">{errorMessage}</div>
          )}
        </div>
      </div>
    )}
</TabPanel>
<TabPanel>
  {/* Start Quiz Button */}
  {!currentQuiz.accessCode || clickedAccessSubmit ? (
    <div className="text-center mt-4">
      <button
        className="btn btn-success"
        onClick={startQuiz}
        disabled={!!latestAttempt || startAttempt}
      >
        Start Quiz
      </button>
    </div>
  ) : null}

  {/* Questions Section */}
  {(startAttempt || latestAttempt) && currentQuiz.questions && (
    <div className="container mt-4">
      <h4 className="text-center mb-4">Quiz Questions</h4>

      {/* 遍历所有问题 */}
      {currentQuiz.questions.map((question: any, index: number) => {
        const existingAnswer = currentAttempt.answers?.find(
          (ans: any) => ans.questionId === question._id
        );

        return (
          <div key={index} className="card mb-4 shadow-sm">
            <div className="card-header">
              <strong>Question {index + 1}</strong>
            </div>
            <div className="card-body">
              <p className="mb-3">{question.questionText}</p>

              {/* True/False */}
              {question.questionType === "True/False" && (
                <div className="btn-group">
                  <button
                    className={`btn ${
                      existingAnswer?.trueFalseAnswer === true
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() =>
                      !latestAttempt &&
                      handleAnswerChange(question._id, {
                        answerType: "True/False",
                        trueFalseAnswer: true,
                      })
                    }
                  >
                    True
                  </button>
                  <button
                    className={`btn ${
                      existingAnswer?.trueFalseAnswer === false
                        ? "btn-primary"
                        : "btn-outline-secondary"
                    }`}
                    onClick={() =>
                      !latestAttempt &&
                      handleAnswerChange(question._id, {
                        answerType: "True/False",
                        trueFalseAnswer: false,
                      })
                    }
                  >
                    False
                  </button>
                </div>
              )}

              {/* 单选题 (Multiple Choice) */}
              {question.questionType === "Multiple Choice" &&
                question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      name={`question-${index}`}
                      value={choice.text}
                      checked={
                        existingAnswer?.selectedChoices?.[0]?.text ===
                        choice.text
                      }
                      onChange={() =>
                        !latestAttempt &&
                        handleAnswerChange(question._id, {
                          answerType: "Multiple Choice",
                          selectedChoices: [{ ...choice, isSelected: true }],
                        })
                      }
                      disabled={!!latestAttempt}
                    />
                    <label className="form-check-label">{choice.text}</label>
                  </div>
                ))}

              {/* 多选题 (Multiple Select) */}
              {question.questionType === "Multiple Select" &&
                question.choices.map((choice: any, idx: number) => (
                  <div key={idx} className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      name={`question-${index}-${idx}`}
                      value={choice.text}
                      checked={
                        existingAnswer?.selectedChoices?.some(
                          (opt: any) => opt.text === choice.text && opt.isSelected
                        ) || false
                      }
                      onChange={(e) => {
                        if (!latestAttempt) {
                          const isSelected = e.target.checked;
                          const updatedChoices =
                            existingAnswer?.selectedChoices?.map((opt: any) =>
                              opt.text === choice.text
                                ? { ...opt, isSelected }
                                : opt
                            ) || [];

                          if (
                            !updatedChoices.some(
                              (opt: any) => opt.text === choice.text
                            )
                          ) {
                            updatedChoices.push({ ...choice, isSelected });
                          }

                          handleAnswerChange(question._id, {
                            answerType: "Multiple Select",
                            selectedChoices: updatedChoices,
                          });
                        }
                      }}
                      disabled={!!latestAttempt}
                    />
                    <label className="form-check-label">{choice.text}</label>
                  </div>
                ))}

              {/* 填空题 (Fill in the Blanks) */}
              {question.questionType === "Fill in the Blanks" && (
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your answer"
                  value={
                    existingAnswer?.fillInAnswers?.[0]?.answer || ""
                  }
                  onChange={(e) =>
                    !latestAttempt &&
                    handleAnswerChange(question._id, {
                      answerType: "Fill in the Blanks",
                      fillInAnswers: [{ answer: e.target.value }],
                    })
                  }
                  disabled={!!latestAttempt}
                />
              )}

              {/* 显示正确答案（如果已提交） */}
              {latestAttempt && (
                <div className="mt-2 text-success">
                  <strong>Correct Answer:</strong>{" "}
                  {question.questionType === "Fill in the Blanks"
                    ? question.blanks.map((blank: any) => blank.answer).join(", ")
                    : question.choices
                        ?.filter((choice: any) => choice.isCorrect)
                        .map((choice: any) => choice.text)
                        .join(", ")}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* 提交按钮 */}
      {!latestAttempt && (
        <div className="text-center">
          <button
            className="btn btn-primary"
            onClick={handleSubmitQuiz}
            disabled={!startAttempt}
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  )}
</TabPanel>

    </Tabs>
  </div>
);
}

