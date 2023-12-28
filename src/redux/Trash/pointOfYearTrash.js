const { createSlice } = require('@reduxjs/toolkit');

const initialState = [];

const pointOfYearTrash = createSlice({
  initialState,
  reducers: {},
});

const pointOfYearTrashReducer = pointOfYearTrash.reducer;
export default pointOfYearTrashReducer;
