import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todoReducer";

export default function TodoForm() {
    const { todo } = useSelector((state: any) => state.todosReducer);
    const dispatch = useDispatch();

    const handleAddOrUpdate = () => {
        if (todo.id) {
            dispatch(updateTodo(todo));
        } else {
            dispatch(addTodo(todo));
        }

        dispatch(setTodo({ id: "", title: "" }));
    };

    return (
        <li className="d-flex align-items-center list-group-item">
            <input
                className="form-control me-2"
                value={todo.title}
                onChange={(e) => dispatch(setTodo({ ...todo, title: e.target.value }))}
                placeholder="Enter todo"
            />
            <button className="btn btn-success me-2 float-end" onClick={handleAddOrUpdate} id="wd-add-update-todo-click">
                Add
            </button>
            <button className="btn btn-warning me-3 float-end" onClick={handleAddOrUpdate} id="wd-add-update-todo-click">
                Update
            </button>
        </li>
    );
}
