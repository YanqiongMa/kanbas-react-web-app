import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import QuizCreator from "./QuizCreator";
import { useState } from "react";
export default function QuizControls(
    {quizName, setQuizName, addQuiz, points, setPoints, description, setDescription, dueDate, 
        setDueDate, availabilityDate, setAvailabilityDate, quizType, setQuizType, timeLimit, setTimeLimit,
        assignmentGroup, setAssignmentGroup, shuffleForEachStudent, setShuffleForEachStudent,
        allowMultipleAttempts, setAllowMultipleAttempts, isPublished, setIsPublished,
        viewResponse, setViewResponse, showCorrectAnswers, setShowCorrectAnswers, 
        accessCode, setAccessCode, singleQuestionAtATime, setSingleQuestionAtATime,
        cameraRequired, setCameraRequired, lockQuestionsAfterAnswering, setLockQuestionsAfterAnswering} : 
    {quizName: string; setQuizName: (name: string) => void;
        points: string; setPoints: (name: string) => void;
        description: string, setDescription: (name: string) => void;
        dueDate: string; setDueDate: (name: string) => void;
        availabilityDate: string; setAvailabilityDate: (name: string) => void;
        quizType: string; setQuizType: (name: string) => void;
        timeLimit: string, setTimeLimit: (name: string) => void;
        assignmentGroup: string, setAssignmentGroup: (name: string) => void;
        shuffleForEachStudent: boolean, setShuffleForEachStudent: (value: boolean) => void;
        allowMultipleAttempts: boolean, setAllowMultipleAttempts: (value: boolean) => void;
        isPublished: boolean, setIsPublished: (value: boolean) => void;
        viewResponse: string, setViewResponse: (name: string) => void;
        showCorrectAnswers: string, setShowCorrectAnswers: (name: string) => void;
        accessCode: string, setAccessCode: (name: string) => void;
        singleQuestionAtATime: boolean, setSingleQuestionAtATime: (value: boolean) => void;
        cameraRequired: boolean, setCameraRequired: (value: boolean) => void;
        lockQuestionsAfterAnswering: boolean, setLockQuestionsAfterAnswering: (value: boolean) => void;
        addQuiz: () => void;
        }
) {
    return (
        <div>
            <div className="search-box-container me-1">
                <FaSearch className="search-icon fs-3"/>        
                <input id="wd-search-quiz" type="search"
                    placeholder="Search for Quiz" className="search-input"/>
            </div>
            <button id="wd-options-quiz" className="btn btn-lg btn-secondary me-1 float-end"><IoEllipsisVertical /></button>
            <button id="wd-add-quiz" className="btn btn-lg btn-danger me-1 float-end"
            data-bs-toggle="modal" data-bs-target="#wd-add-quiz-dialog">
                New Quiz
            </button>
            <button id="wd-add-quiz-group" className="btn btn-lg btn-secondary me-1 float-end">
                New Group
            </button>

            <QuizCreator
                dialogTitle="Create New Quiz"
                quizName={quizName}
                setQuizName={setQuizName}
                points={points}
                setPoints={setPoints}
                description={description}
                setDescription={setDescription}
                dueDate={dueDate}
                setDueDate={setDueDate}
                availabilityDate={availabilityDate}
                setAvailabilityDate={setAvailabilityDate}
                quizType={quizType}
                setQuizType={setQuizType}
                timeLimit={timeLimit}
                setTimeLimit={setTimeLimit}
                assignmentGroup={assignmentGroup}
                setAssignmentGroup={setAssignmentGroup}
                shuffleForEachStudent={shuffleForEachStudent}
                setShuffleForEachStudent={setShuffleForEachStudent}
                allowMultipleAttempts={allowMultipleAttempts}
                setAllowMultipleAttempts={setAllowMultipleAttempts}
                isPublished={isPublished}
                setIsPublished={setIsPublished}
                viewResponse={viewResponse}
                setViewResponse={setViewResponse}
                showCorrectAnswers={showCorrectAnswers}
                setShowCorrectAnswers={setShowCorrectAnswers}
                accessCode={accessCode}
                setAccessCode={setAccessCode}
                singleQuestionAtATime={singleQuestionAtATime}
                setSingleQuestionAtATime={setSingleQuestionAtATime}
                cameraRequired={cameraRequired}
                setCameraRequired={setCameraRequired}
                lockQuestionsAfterAnswering={lockQuestionsAfterAnswering}
                setLockQuestionsAfterAnswering={setLockQuestionsAfterAnswering}
                addQuiz={addQuiz}
            />
        </div>
    );
}