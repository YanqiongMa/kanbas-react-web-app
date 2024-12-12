import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function QuestionCreator({
  onAdd,
  onClose,
  dialogTitle,
}: {
  onAdd: (newQuestion: any) => void;
  onClose: () => void;
  dialogTitle: string;
}) {
  const [newQuestion, setNewQuestion] = useState({
    questionType: "Multiple Choice",
    questionText: "",
    points: "10",
    choices: [{ text: "", isCorrect: false }],
    blanks: [{ answer: "" }],
  });

  const addOption = () => {
    setNewQuestion({
      ...newQuestion,
      choices: [...newQuestion.choices, { text: "", isCorrect: false }],
    });
  };

  const handleSubmit = () => {
    onAdd(newQuestion);
    onClose();
  };

  return (
    <div
      id="wd-add-question-dialog"
      className="modal fade show"
      data-bs-backdrop="static"
      style={{ display: "block" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content shadow-lg border-0">
          {/* Modal Header */}
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">{dialogTitle}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              onClick={onClose}
            ></button>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            {/* Question Points */}
            <div className="mb-3">
              <label className="form-label fw-bold">Points</label>
              <input
                type="number"
                min="1"
                className="form-control w-25"
                value={newQuestion.points}
                onChange={(e) =>
                  setNewQuestion({ ...newQuestion, points: e.target.value })
                }
              />
            </div>

            {/* Question Type */}
            <div className="mb-3">
              <label className="form-label fw-bold">Question Type</label>
              <select
                className="form-select w-50"
                value={newQuestion.questionType}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    questionType: e.target.value,
                  })
                }
              >
                <option value="Multiple Choice">Multiple Choice</option>
                <option value="Multiple Select">Multiple Select</option>
                <option value="True/False">True/False</option>
                <option value="Fill in the Blanks">Fill in the Blanks</option>
              </select>
            </div>

            {/* Question Text */}
            <div className="mb-3">
              <label className="form-label fw-bold">Question Text</label>
              <textarea
                className="form-control"
                rows={3}
                placeholder="Enter the question text..."
                value={newQuestion.questionText}
                onChange={(e) =>
                  setNewQuestion({
                    ...newQuestion,
                    questionText: e.target.value,
                  })
                }
              ></textarea>
            </div>

            {/* Options for Multiple Choice / Multiple Select */}
            {(newQuestion.questionType === "Multiple Choice" ||
              newQuestion.questionType === "Multiple Select") && (
              <div>
                <label className="form-label fw-bold">Options</label>
                {newQuestion.choices.map((option: any, index: number) => (
                  <div
                    key={index}
                    className="d-flex align-items-center gap-2 mb-2"
                  >
                    <input
                      type="text"
                      className="form-control"
                      placeholder={`Option ${index + 1}`}
                      value={option.text}
                      onChange={(e) => {
                        const updatedChoices = [...newQuestion.choices];
                        updatedChoices[index].text = e.target.value;
                        setNewQuestion({
                          ...newQuestion,
                          choices: updatedChoices,
                        });
                      }}
                    />
                    <input
                      type="checkbox"
                      checked={option.isCorrect}
                      onChange={(e) => {
                        const updatedChoices = [...newQuestion.choices];
                        updatedChoices[index].isCorrect = e.target.checked;
                        setNewQuestion({
                          ...newQuestion,
                          choices: updatedChoices,
                        });
                      }}
                    />
                    <label className="form-check-label">Correct</label>
                    <FaTrash
                      className="text-danger fs-5"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        const updatedChoices = [...newQuestion.choices];
                        updatedChoices.splice(index, 1);
                        setNewQuestion({
                          ...newQuestion,
                          choices: updatedChoices,
                        });
                      }}
                    />
                  </div>
                ))}
                <button className="btn btn-outline-primary btn-sm" onClick={addOption}>
                  Add Option
                </button>
              </div>
            )}

            {/* Fill in the Blanks */}
            {newQuestion.questionType === "Fill in the Blanks" && (
              <div className="mb-3">
                <label className="form-label fw-bold">Answer</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the correct answer..."
                  value={newQuestion.blanks[0]?.answer}
                  onChange={(e) => {
                    const updatedBlanks = [...newQuestion.blanks];
                    updatedBlanks[0].answer = e.target.value;
                    setNewQuestion({
                      ...newQuestion,
                      blanks: updatedBlanks,
                    });
                  }}
                />
              </div>
            )}

            {/* True/False */}
            {newQuestion.questionType === "True/False" && (
              <div className="mb-3">
                <label className="form-label fw-bold">Answer</label>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="true-option"
                    name="true-false"
                    checked={newQuestion.choices[0]?.isCorrect}
                    onChange={() =>
                      setNewQuestion({
                        ...newQuestion,
                        choices: [
                          { text: "True", isCorrect: true },
                          { text: "False", isCorrect: false },
                        ],
                      })
                    }
                  />
                  <label htmlFor="true-option" className="form-check-label">
                    True
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    className="form-check-input"
                    id="false-option"
                    name="true-false"
                    checked={newQuestion.choices[1]?.isCorrect}
                    onChange={() =>
                      setNewQuestion({
                        ...newQuestion,
                        choices: [
                          { text: "True", isCorrect: false },
                          { text: "False", isCorrect: true },
                        ],
                      })
                    }
                  />
                  <label htmlFor="false-option" className="form-check-label">
                    False
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Add Question
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
