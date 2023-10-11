import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  open: false,
};

const popoverStudentFiller = createSlice({
  name: 'popoverStudentFiller',
  initialState,
  reducers: {
    setOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setOpen } = popoverStudentFiller.actions;
const popoverStudentFillerReducer = popoverStudentFiller.reducer;
export default popoverStudentFillerReducer;
