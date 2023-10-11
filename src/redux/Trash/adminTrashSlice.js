import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  adminList: [],
  total: 0,
  pageCurrent: 1,
  pageSize: 10,
};

const adminTrashSlice = createSlice({
  name: 'adminTrash',
  initialState,
  reducers: {
    getAdminList: (state, action) => {
      state.adminList = action.payload;
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
    addAdmin: (state, action) => {
      state.adminList.push(action.payload);
    },
    restoreAdmin: (state, action) => {
      const studentIndex = state.adminList.findIndex((item) => item.id === action.payload.id);
      if (studentIndex !== -1) {
        state.adminList.splice(studentIndex, 1);
      }
    },
  },
});

export const { getAdminList, setPageCurrent, setPageSize, addAdmin, restoreAdmin, setTotal } =
  adminTrashSlice.actions;
const adminTrashReducer = adminTrashSlice.reducer;
export default adminTrashReducer;
