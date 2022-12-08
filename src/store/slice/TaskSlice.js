import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { getDatabase, ref, onValue, set, push } from "firebase/database";

const initialState = {
  tasks: {},
  fetchingTask: false,
  updatingTask: false,
};

export const incrementAsync = createAsyncThunk(
  "task/fetchTask",
  async (amount) => {
    const response = await fetchCount(amount);
    return response.data;
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTasks: (state, action) => {
      state.tasks = action.payload;
    },
    updateTasks: (state, action) => {
      let task = current(state).tasks[action.payload.id];
      state.tasks = {
        ...state.tasks,
        [action.payload.id]: {
          ...task,
          ...action.payload,
        },
      };
    },
    addTask: (state, action) => {
      state.tasks = { ...state.tasks, ...action.payload };
    },
  },
});

export const { getTasks, updateTasks, addTask } = taskSlice.actions;

export const fetchTask = (user_id) => (dispatch, getState) => {
  const db = getDatabase();
  const taskRef = ref(db, "/tasks");
  onValue(taskRef, (snapshot) => {
    const data = snapshot.val();
    let userTask = {};
    if (data) {
      Object.keys(data).forEach((key) => {
        if (data[key].user_id == user_id) {
          userTask[key] = { id: key, ...data[key] };
        }
      });
      dispatch(addTask(userTask || {}));
    }
  });
};

export const postTask = (data) => (dispatch, getState) => {
  const db = getDatabase();
  push(ref(db, "tasks"), {
    ...data,
    created_on: new Date().getTime(),
  }).then((response) => {
    dispatch(addTask(response.toJSON()));
  });
};

export const updateStatus = (task_id) => (dispatch, getState) => {
  const db = getDatabase();
  let tasks = getState().task.tasks;
  let taskStatus =
    tasks[task_id].status == "Complete" ? "Pending" : "Complete";
  set(ref(db, `tasks/${task_id}`), {
    ...tasks[task_id],
    status: taskStatus,
  }).then((response) => {
    dispatch(updateTasks({ id: task_id, status: taskStatus }));
  });
};

export default taskSlice.reducer;
