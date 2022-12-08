import React from "react";
import { TaskBoard } from "./../components/TaskBoard/TaskBoard";
import { TaskForm } from "./../components/Forms/TaskForm/TaskForm";

export const Home = () => {
  return (
    <div className="Home">
      <TaskBoard />
      <hr />
      <TaskForm />
    </div>
  );
};
