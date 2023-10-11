import instane from '../instane';

export const adminStudentApi = {
  getAllStudent: async (values) => {
    const url = '/admin/student/list';
    try {
      const res = await instane.post(url, values);
      return res.data || [];
    } catch (error) {
      throw new Error(error);
    }
  },
  createStudent: async (values) => {
    const url = '/admin/student/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateStudent: async (values) => {
    const url = `/admin/student/update`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteStudent: async (id) => {
    const url = `/admin/student/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteListStudent: async (values) => {
    const url = '/admin/student/delete';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  exportStudentList: async (values) => {
    const url = '/admin/student/export';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
