import { IoEllipsisVertical } from "react-icons/io5";
import { FaCheck, FaBan, FaTrash } from "react-icons/fa6"; // ✅ 和 🚫 图标
import { BsGripVertical } from "react-icons/bs";
import { BiNotepad } from "react-icons/bi";
import QuizDeleteConfirmation from "./QuizDeleteConfirmation";

export default function QuizControlButtons({
  quizId,
  isPublished,
  togglePublishStatus,
  deleteQuiz,
}: {
  quizId: string;
  isPublished: boolean;
  togglePublishStatus: (quizId: string, isPublished: boolean) => void;
  deleteQuiz: (quizId: string) => void;
}) {
  const modalId = `wd-delete-assignment-dialog-${quizId}`;

  return (
    <div>
      {/* 右侧按钮 */}
      <div className="float-end">
        {/* Publish/Unpublish 状态切换 */}
        <span
          onClick={() => togglePublishStatus(quizId, isPublished)}
          style={{ cursor: "pointer", marginRight: "10px" }}
          title={isPublished ? "Unpublish" : "Publish"}
        >
          {isPublished ? (
            <FaCheck className="text-success fs-3" /> // 已发布状态 ✅
          ) : (
            <FaBan className="text-danger fs-3" /> // 未发布状态 🚫
          )}
        </span>
        {/* 其他操作按钮 */}
        <IoEllipsisVertical className="fs-3" />
        <FaTrash
          className="text-danger me-2 mb-1"
          type="button"
          data-bs-toggle="modal"
          data-bs-target={`#${modalId}`}
        />
      </div>

      {/* 左侧按钮 */}
      <div className="float-start">
        <BsGripVertical className="fs-3" />
        <BiNotepad style={{ color: "lightgreen" }} className="fs-3" />
      </div>

      {/* 删除确认模态框 */}
      <QuizDeleteConfirmation
        dialogTitle="Delete Quiz"
        quizId={quizId}
        deleteQuiz={deleteQuiz}
        modalId={modalId}
      />
    </div>
  );
}
