import React, { useState } from "react";
import { useAuth } from "./../../../hooks/useAuth";
import { postTask } from './../../../store/slice/TaskSlice';
import { useDispatch } from 'react-redux';
import "./TaskForm.css";

export const TaskForm = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");

  const addTask = (e) => {
    e.preventDefault();
    let data = {
      user_id: user.id,
      title,
      due_date: new Date(dueDate).getTime(),
      status,
    };
    dispatch(postTask(data));
  };
  return (
    <div className="TaskForm">
      <h3>Create Task</h3>
      <form onSubmit={addTask}>
        <div className="formFields">
          <label htmlFor="title">Title</label><br/>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="formFields">
          <label htmlFor="dueDate">Due Date</label><br/>
          <input
            type="date"
            name="dueDate"
            placeholder="Due Date"
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="formFields">
          <button type="submit" value="submit">
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
};
