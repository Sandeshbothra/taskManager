import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  getFirestore,
  doc,
} from "firebase/firestore";

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
    reset: (state, action) => {
      state = initialState;
    },
  },
});

export const { getTasks, updateTasks, addTask, reset } = taskSlice.actions;

export const fetchTask = (user_id) => (dispatch, getState) => {
  const db = getFirestore();
  getDocs(collection(db, "task")).then((docs) => {
    let tasks = {};
    docs.forEach((doc) => {
      if (doc.data().user_id == user_id) {
        tasks[doc.id] = { ...doc.data(), id: doc.id };
      }
    });
    dispatch(getTasks(tasks));
  });
};

export const postTask = (data) => (dispatch, getState) => {
  const db = getFirestore();
  data["created_on"] = new Date().getTime();
  addDoc(collection(db, "task"), {
    ...data,
  }).then((response) => {
    dispatch(addTask({ [response.id]: { ...data, id: response.id } }));
  });
};

export const updateStatus = (task_id) => (dispatch, getState) => {
  const db = getFirestore();
  let taskStatus =
    getState().task.tasks[task_id].status == "Complete"
      ? "Pending"
      : "Complete";
  setDoc(
    doc(db, "task", task_id),
    {
      status: taskStatus,
    },
    { merge: true }
  ).then((response) => {
    dispatch(updateTasks({ id: task_id, status: taskStatus }));
  });
};

export default taskSlice.reducer;
