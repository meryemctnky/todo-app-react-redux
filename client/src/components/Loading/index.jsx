import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center py-2">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
