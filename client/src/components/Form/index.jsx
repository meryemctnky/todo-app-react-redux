import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodoAsync } from "../../redux/todos/services";
import Error from "../Error/index";
import Loading from "../Loading/index";
import { Modal } from 'antd';

const Form = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.todos.addNewTodo.isLoading);
  const error = useSelector((state) => state.todos.addNewTodo.error);


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title) {
      Modal.error({
        title: 'Error!',
        content: "Please enter data",
      });
      return;
    }

    await dispatch(addTodoAsync({ title }));
    setTitle("");
  };

  return (
    <>
      <form className="form mb-3" onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="d-block d-sm-flex gap-1">
            <div className="col-12 col-sm-10">
              <input
                type="text"
                className="form-control"
                placeholder="What do you need to do today?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={isLoading}
              />
              {isLoading && <Loading />}
              {error && <Error message={error} />}
            </div>
            <div className="col-12 col-sm-2">
              <button
                className="btn btn-primary w-100 mt-2 mt-sm-0"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
