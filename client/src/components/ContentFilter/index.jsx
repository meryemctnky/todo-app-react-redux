import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeActiveFilter} from "../../redux/todos/todosSlice";
import { removeCompletedTodosAsync } from "../../redux/todos/services";

const ContentFilter = () => {
    const activeFilter = useSelector(state => state.todos.activeFilter)
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const selectedFilter = e.target.value;
        dispatch(changeActiveFilter(selectedFilter));
    }

  return (
    <div className="row justify-content-start">
      <div className="col-4 d-flex align-items-start">
        <select className="form-select form-select-sm my-2"  value={activeFilter} onChange={handleChange}>
          <option value={"all"}>
            All
          </option>
          <option value={"completed"}>Completed</option>
          <option value={"active"}>Active</option>
        </select>
      </div>
      <div className="col-8 d-flex align-items-center justify-content-end">
        <button type="button" className="btn btn-link" onClick={() => dispatch(removeCompletedTodosAsync())}>Clear completed</button>
      </div>
    </div>
  );
};

export default ContentFilter;
