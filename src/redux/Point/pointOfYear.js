const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  pointOfYearList: [],
  pageCurrent: 1,
  total: 0,
  pageSize: 10,
  studentId: null,
  year: null,
  classId: null,
  filter: {},
  sort: {
    sortColumn: null,
    sortType: null,
  },
};

const pointOfYear = createSlice({
  name: 'pointOfYear',
  initialState,
  reducers: {
    createPointOfYear: (state, action) => {
      state.pointOfYearList.push(action.payload);
    },
    updatePointOfYear: (state, action) => {
      state.pointOfYearList.some((item, index) => {
        if (item.id === action.payload.id) {
          state.pointOfYearList[index] = action.payload;
          return true;
        }
        return false;
      });
    },
    deletePointOfYear: (state, action) => {
      const index = state.pointOfYearList.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.pointOfYearList.splice(index, 1);
      }
    },
    setDataPointOfYear: (state, action) => {
      state.pointOfYearList = action.payload;
    },
    setPageCurrent: (state, action) => {
      state.pageCurrent = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setClassId: (state, action) => {
      state.classId = action.payload;
    },
    setYear: (state, action) => {
      state.year = action.payload;
    },
    setTotal: (state, action) => {
      state.total = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setSortType: (state, action) => {
      state.sort.sortType = action.payload;
    },
    setSortColumn: (state, action) => {
      state.sort.sortColumn = action.payload;
    },
  },
});
export const {
  createPointOfYear,
  deletePointOfYear,
  setClassId,
  setDataPointOfYear,
  setFilter,
  setPageCurrent,
  setPageSize,
  setSort,
  setStudentId,
  setYear,
  updatePointOfYear,
  setTotal,
  setSortColumn,
  setSortType,
} = pointOfYear.actions;
const pointOfYearReducer = pointOfYear.reducer;
export default pointOfYearReducer;
