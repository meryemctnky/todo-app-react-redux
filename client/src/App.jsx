import React from "react";
import ContentFilter from "./components/ContentFilter";
import Header from "./components/Header";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div className="container-sm todo-container h-100 w-100 m-auto py-4">
      <div className="card shadow rounded border-0">
        <div className="card-body">
          <Header />
          <ContentFilter />
          <TodoList />
        </div>
      </div>
    </div>
  );
};

export default App;
