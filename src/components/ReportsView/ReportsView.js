import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTask } from "./../../store/slice/TaskSlice";
import { useAuth } from "../../hooks/useAuth";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import "./ReportsView.css";

export const ReportsView = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const tasks = useSelector((state) => Object.values(state.task.tasks || {}));
  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState({ key: "title", value: "asc" });

  useEffect(() => {
    if (!tasks || tasks.length == 0) {
      dispatch(fetchTask(user.id));
    }
  }, [tasks]);

  const updateFilterConditions = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const filterTask = (tasks) => {
    if (Object.keys(filters).length == 0) {
      return tasks;
    }
    return tasks
      .filter((t) => {
        if (filters.title && filters.title !== "") {
          return t.title.startsWith(filters.title);
        } else {
          return true;
        }
      })
      .filter((t) => {
        if (filters.due_date && filters.due_date != "") {
          return (
            new Date(t.due_date).toLocaleString() ==
            new Date(filters.due_date).toLocaleString()
          );
        } else {
          return true;
        }
      })
      .filter((t) => {
        if (filters.status && filters.status != "") {
          return t.status == filters.status || filters.status == "All";
        } else {
          return true;
        }
      });
  };

  const sortTask = (tasks = []) => {
    if (!sortBy.key) {
      return tasks.sort((a, b) => {
        return a.title > b.title ? 1 : -1;
      });
    }
    return tasks.sort((a, b) => {
      if (sortBy.value == "asc") {
        return a[sortBy.key] > b[sortBy.key] ? 1 : -1;
      } else {
        return a[sortBy.key] > b[sortBy.key] ? -1 : 1;
      }
    });
  };

  const getSortButton = (field) => {
    if (sortBy.key == field) {
      return sortBy.value == "asc" ? (
        <BsCaretDownFill
          onClick={() => setSortBy({ key: field, value: "des" })}
        />
      ) : (
        <BsCaretUpFill
          onClick={() => setSortBy({ key: field, value: "asc" })}
        />
      );
    } else {
      return (
        <BsCaretUpFill
          onClick={() => setSortBy({ key: field, value: "asc" })}
        />
      );
    }
  };

  return (
    <div className="ReportsView">
      <h2>Business Reports</h2>
      <hr />
      <ul className="TableHeader">
        <li>Sr.no</li>
        <li>
          Title
          <div className="filterOptions">
            <input
              name="title"
              placeholder="Search Title"
              onChange={updateFilterConditions}
            />
            {getSortButton("title")}
          </div>
        </li>
        <li>
          Due Date
          <div className="filterOptions">
            <input
              name="due_date"
              type="date"
              placeholder="Filter By"
              onChange={updateFilterConditions}
            />
            {getSortButton("due_date")}
          </div>
        </li>
        <li>
          Status
          <div className="filterOptions">
            <select
              name="status"
              placeholder="Search Status"
              onChange={updateFilterConditions}
              defaultValue={"All"}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Complete">Complete</option>
            </select>
            {getSortButton("status")}
          </div>
        </li>
      </ul>
      <div className="TableBody">
        {sortTask(filterTask(tasks)).map((task, index) => {
          return (
            <ul className="TableDataRow" key={Math.random()}>
              <li>{index}</li>
              <li>{task.title}</li>
              <li>
                {!isNaN(task.due_date)
                  ? new Date(task.due_date).toLocaleDateString()
                  : "NA"}
              </li>
              <li>{task.status}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};
