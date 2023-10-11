import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Admin/adminSilce';
import modalLoginReducer from './Modal/modalLoginSlice';
import pointReducer from './Point/pointSlice';
import popoverStudentFillerReducer from './Popover/popoverStudentFiller';
import studentReducer from './Student/studentSilce';
import adminTrashReducer from './Trash/adminTrashSlice';
import pointTrashReducer from './Trash/pointTrashSilce';
import studentTrashReducer from './Trash/studentTrashSlice';
import userReducer from './User/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    modalLogin: modalLoginReducer,
    studentList: studentReducer,
    pointList: pointReducer,
    adminList: adminReducer,
    studentTrash: studentTrashReducer,
    pointTrash: pointTrashReducer,
    adminTrash: adminTrashReducer,
    popoverStudentFiller: popoverStudentFillerReducer,
  },
});
