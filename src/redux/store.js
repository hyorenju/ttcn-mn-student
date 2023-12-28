import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './Admin/adminSilce';
import modalLoginReducer from './Modal/modalLoginSlice';
import pointOfYearReducer from './Point/pointOfYear';
import pointReducer from './Point/pointSlice';
import studentReducer from './Student/studentSilce';
import adminTrashReducer from './Trash/adminTrashSlice';
import pointTrashReducer from './Trash/pointTrashSilce';
import studentTrashReducer from './Trash/studentTrashSlice';
import userReducer from './User/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pointList: pointReducer,
    pointTrash: pointTrashReducer,
    pointOfYear: pointOfYearReducer,
    adminList: adminReducer,
    studentList: studentReducer,
    modalLogin: modalLoginReducer,
    adminTrash: adminTrashReducer,
    studentTrash: studentTrashReducer,
  },
});
