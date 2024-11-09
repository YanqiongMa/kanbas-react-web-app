import { FaTrash } from "react-icons/fa";

export default function DeleteButton({ onClick }: { onClick: (e: React.MouseEvent) => void }) {
  return (
    <FaTrash
      data-bs-toggle="modal"
      data-bs-target="#wd-add-module-dialog"
      className="text-danger position-relative me-4 ms-2 fs-4"
      onClick={onClick}
    />
  );
}
