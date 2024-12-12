import { BsGripVertical } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import QuizControlButtons from "./QuizControlButtons";
import { useNavigate, useParams } from "react-router";
import * as quizzesClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes, deleteQuiz, addQuiz } from "./reducer";
import { Button } from "react-bootstrap";

export default function Quizzes() {
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizScores, setQuizScores] = useState<Record<string, number>>({});

  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return `${date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    })} at ${date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  }

  const fetchQuizzes = async () => {
    const quizzes = await quizzesClient.getQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const togglePublishStatus = async (quiz: any) => {
    const updatedQuiz = quiz.isPublished
      ? await quizzesClient.unpublishQuiz(quiz._id)
      : await quizzesClient.publishQuiz(quiz._id);

    dispatch(
      setQuizzes(
        quizzes.map((q: any) => (q._id === quiz._id ? updatedQuiz : q))
      )
    );
  };

  const fetchLatestScores = async (quizzes: any[]) => {
    const scores: Record<string, number> = {};
    for (const quiz of quizzes) {
      if (currentUser.role === "STUDENT") {
        const latestAttempt = await quizzesClient.getLatestAttempt(
          quiz._id,
          currentUser._id
        );
        if (latestAttempt) {
          scores[quiz._id] = latestAttempt.score;
        }
      }
    }
    setQuizScores(scores);
  };

  const addNewQuiz = async () => {
    if (!cid) {
      console.error("Course ID is undefined.");
      return;
    }
    const newQuiz = {
      title: "New Quiz",
      courseId: cid,
      description: "This is a new quiz",
      points: 0,
      dueDate: new Date().toISOString(),
      availabilityDate: new Date().toISOString(),
      quizType: "Graded Quiz",
      shuffleAnswers: false,
      allowMultipleAttempts: false,
      isPublished: false,
    };

    const createdQuiz = await quizzesClient.createQuiz(cid as string, newQuiz);
    dispatch(addQuiz(createdQuiz));
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  useEffect(() => {
    if (quizzes.length > 0 && currentUser.role === "STUDENT") {
      fetchLatestScores(quizzes);
    }
  }, [quizzes]);

  const removeQuiz = async (quizId: string) => {
    await quizzesClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };
  

  return (
    <div id="wd-quizzes" style={{ marginLeft: "20px", marginRight: "20px" }}>
      <ul id="wd-quiz-title" className="list-group rounded-0">
        <li className="wd-quiz-title list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-quiz-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-1 fs-3" />
            <RiArrowDropDownFill className="me-2 fs-1" type="button" />
            QUIZZES
            <IoEllipsisVertical className="float-end fs-3" />
            {currentUser.role === "FACULTY" && (
                <Button
                  variant="danger"
                  className="float-end d-flex align-items-center me-2"
                  onClick={addNewQuiz}
                >
                  <FaPlus className="me-1" /> Quiz
                </Button>
                )}
          </div>
          <ul className="wd-quiz-list list-group rounded-0">
            {quizzes
              .filter(
                (quiz: any) =>
                  currentUser.role === "FACULTY" || quiz.isPublished
              )
              .map((quiz: any) => {
                const currentDate = new Date();
                const availableDate = new Date(quiz.availabilityDate);
                const dueDate = new Date(quiz.dueDate);

                let availabilityStatus = "";
                if (currentDate < availableDate) {
                  availabilityStatus = `Not available until ${formatDate(
                    quiz.availabilityDate
                  )}`;
                } else if (
                  currentDate >= availableDate &&
                  currentDate <= dueDate
                ) {
                  availabilityStatus = "Available";
                } else if (currentDate > dueDate) {
                  availabilityStatus = "Closed";
                }

                return (
                  <li
                    className="wd-quiz-list-item list-group-item p-3 ps-1 wd-lesson"
                    key={quiz._id}
                  >
                    {currentUser.role === "FACULTY" && (
                      <QuizControlButtons
                        quizId={quiz._id}
                        isPublished={quiz.isPublished}
                        togglePublishStatus={() => togglePublishStatus(quiz)}
                        deleteQuiz={() => removeQuiz(quiz._id)}
                      />
                    )}
                    <div style={{ marginLeft: "75px" }}>
                      <a
                        className="wd-quiz-link text-black"
                        style={{ textDecoration: "none" }}
                        onClick={() =>
                          navigate(
                            currentUser.role === "FACULTY"
                              ? `/Kanbas/Courses/${cid}/Quizzes/${quiz._id}/Details`
                              : `/Kanbas/Courses/${cid}/QuizAttempt/${quiz._id}`
                          )
                        }
                      >
                        <strong>{quiz.title}</strong>
                      </a>
                      <div>
                        <span>
                          <strong>Availability:</strong> {availabilityStatus}
                        </span>
                      </div>
                      <div>
                        <span>
                          <strong>Due:</strong> {formatDate(quiz.dueDate)} |{" "}
                          <strong>Points:</strong> {quiz.points || 0} pts |{" "}
                          <strong>Number:</strong> {quiz.questions?.length || 0}{" "}
                          Questions
                        </span>
                      </div>
                      {currentUser.role === "STUDENT" && quizScores[quiz._id] !== undefined && (
                      <div>
                        <span>
                          <strong>Score:</strong> {quizScores[quiz._id]} pts
                        </span>
                      </div>
                    )}
                    </div>
                  </li>
                );
              })}
          </ul>
        </li>
      </ul>
    </div>
  );
}
