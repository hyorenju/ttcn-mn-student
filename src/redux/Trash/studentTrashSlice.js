import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentList: [],
  total: 0,
  pageCurrent: 1,
  pageSize: 10,
};

const studentTrashSlice = createSlice({
  name: 'studentTrash',
  initialState,
  reducers: {
    getStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    setPageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    addStudent: (state, action) => {
      state.studentList.push(action.payload);
    },
    restoreStudent: (state, action) => {
      const studentIndex = state.studentList.findIndex((item) => item.id === action.payload.id);
      if (studentIndex !== -1) {
        state.studentList.splice(studentIndex, 1);
      }
    },
  },
});

export const { getStudentList, setPageCurrent, setPageSize, addStudent, restoreStudent, setTotal } =
  studentTrashSlice.actions;
const studentTrashReducer = studentTrashSlice.reducer;
export default studentTrashReducer;
