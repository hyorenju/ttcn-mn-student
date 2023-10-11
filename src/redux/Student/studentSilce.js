const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  studentList: [],
  studentId: 0,
  total: 0,
  pageCurrent: 1,
  pageSize: 10,
  filer: {},
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setFilter: (state, action) => {
      state.filer = action.payload;
    },
    setDataStudentList: (state, action) => {
      state.studentList = action.payload;
    },
    addStudent: (state, action) => {
      state.studentList.push(action.payload);
    },
    updateStudent: (state, action) => {
      state.studentList.some((item, index) => {
        if (item.id === action.payload.id) {
          state.studentList[index] = action.payload;
          return true;
        }
        return false;
      });
    },
    deleteStudent: (state, action) => {
      const studentIndex = state.studentList.findIndex((item) => item.id === action.payload.id);
      if (studentIndex !== -1) {
        state.studentList.splice(studentIndex, 1);
      }
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setPageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
  },
});

export const {
  addStudent,
  updateStudent,
  deleteStudent,
  setTotal,
  setPageCurrent,
  setPageSize,
  setDataStudentList,
  setStudentId,
  setFilter,
} = studentSlice.actions;
const studentReducer = studentSlice.reducer;
export default studentReducer;
