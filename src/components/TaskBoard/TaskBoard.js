import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask, updateStatus } from "./../../store/slice/TaskSlice";
import { useAuth } from "./../../hooks/useAuth";
import "./TaskBoard.css";

export const TaskBoard = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const tasks = useSelector((state) => Object.values(state.task.tasks || {}));
  useEffect(() => {
    dispatch(fetchTask(user.id));
  }, []);

  const updateTaskStatus = (task_id) => {
    dispatch(updateStatus(task_id))
  }

  return (
    <div className="TaskBoard">
      <h2>Tasks</h2>
      <hr />
      <ul className="TableHeader">
        <li>Sr.no</li>
        <li>Title</li>
        <li>Due Date</li>
        <li>Status</li>
      </ul>
      <div className="TableBody">
        {tasks.map((task, index) => {
          return (
            <ul className="TableDataRow" key={Math.random()}>
              <li>{index}</li>
              <li>{task.title}</li>
              <li>{!isNaN(task.due_date) ? new Date(task.due_date).toLocaleDateString() : 'NA'}</li>
              <li>
                <input
                  type="checkbox"
                  name="status"
                  checked={task.status == "Complete" ? true : false}
                  onChange={() => updateTaskStatus(task.id)}
                />
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
