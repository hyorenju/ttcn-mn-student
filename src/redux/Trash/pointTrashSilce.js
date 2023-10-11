import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pointList: [],
  total: 0,
  pageCurrent: 1,
  pageSize: 10,
};

const pointTrashSilce = createSlice({
  name: 'pointTrash',
  initialState,
  reducers: {
    getPointList: (state, action) => {
      state.pointList = action.payload;
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
    addPoint: (state, action) => {
      state.pointList.push(action.payload);
    },
    restorePoint: (state, action) => {
      const pointIndex = state.pointList.findIndex((item) => item.id === action.payload.id);
      if (pointIndex !== -1) {
        state.pointList.splice(pointIndex, 1);
      }
    },
  },
});

export const { getPointList, setPageCurrent, setPageSize, setTotal, addPoint, restorePoint } = pointTrashSilce.actions;
const pointTrashReducer = pointTrashSilce.reducer;
export default pointTrashReducer;
