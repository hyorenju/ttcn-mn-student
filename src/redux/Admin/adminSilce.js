const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  adminList: [],
  adminId: '',
  total: 0,
  pageCurrent: 1,
  pageSize: 10,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminId: (state, action) => {
      state.adminId = action.payload;
    },
    setDataAdminList: (state, action) => {
      state.adminList = action.payload;
    },
    addAdmin: (state, action) => {
      state.adminList.push(action.payload);
    },
    updateAdmin: (state, action) => {
      state.adminList.some((item, index) => {
        if (item.id === action.payload.id) {
          state.adminList[index] = action.payload;
          return true;
        }
        return false;
      });
    },
    deleteAdmin: (state, action) => {
      const adminIndex = state.adminList.findIndex((item) => item.id === action.payload.id);
      if (adminIndex !== -1) {
        state.adminList.splice(adminIndex, 1);
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
  addAdmin,
  updateAdmin,
  deleteAdmin,
  setTotal,
  setPageCurrent,
  setPageSize,
  setDataAdminList,
  setAdminId,
} = adminSlice.actions;
const adminReducer = adminSlice.reducer;
export default adminReducer;
