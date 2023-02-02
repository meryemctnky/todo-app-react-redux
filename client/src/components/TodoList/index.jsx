import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTodos} from "../../redux/todos/todosSlice";
import { getTodosAsync, toggleTodoAsync, removeTodoAsync } from "../../redux/todos/services";
import Loading from "../Loading";
import Error from "../Error";
import { FaRegSquare, FaRegCheckSquare, FaTrashAlt } from "react-icons/fa";
import { Modal} from 'antd';


const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const activeFilter = useSelector(state => state.todos.activeFilter)
  const isLoading = useSelector(state => state.todos.isLoading)
  const error = useSelector(state => state.todos.error)

  const { confirm } = Modal;
  
  const filteredTodos = todos.filter((todo) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed" && todo.completed) return true;
    if (activeFilter === "active" && !todo.completed) return true;
    return false;
  });

  useEffect(() => {
    dispatch(getTodosAsync())
  }, [dispatch])

  const handleDestroy = async (id) => {
    confirm({
      title: 'Are you sure delete this task?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      async onOk() {
        await dispatch(removeTodoAsync(id));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
    
  };

  const handlleToggle = async (id, completed) => {
    await dispatch(toggleTodoAsync({id, data: {completed}}))
  }

  if(isLoading) {
    return <Loading />
  }

  if(error) {
    return <Error message={error} />
  }


  return (
    <main>
      <div className="list-group">
        {filteredTodos.map((item) => (
          <button
            key={item._id}
            type="button"
            className={`list-group-item list-group-item-action ${
              item.completed ? "completed" : ""
            }`}
            onClick={() => handlleToggle(item._id, !item.completed)}
            data-bs-toggle="tooltip"
            data-bs-placement="top"
            title="Mark as completed"
          >
            {item.completed ? (
              <FaRegCheckSquare color="#6A82FB" />
            ) : (
              <FaRegSquare color="#6A82FB" />
            )}
            <span> {item.title}</span>
            <span className="float-end" onClick={() => handleDestroy(item._id)}>
              <FaTrashAlt color="#FC5C7D" />
            </span>
          </button>
        ))}
      </div>
    </main>
  );
};

export default TodoList;
