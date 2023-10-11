import instane from '../instane';

export const adminStudentStatusApi = {
  getAllStudentStatus: async (values) => {
    const url = '/admin/student-status/list';
    try {
      const res = await instane.post(url, values);
      return res.data || [];
    } catch (error) {
      throw new Error(error);
    }
  },
  createStudentStatus: async (values) => {
    const url = '/admin/student-status/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateStudentStatus: async (id, values) => {
    const url = `/admin/student-status/update/${id}`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteStudentStatus: async (id, values) => {
    const url = `/admin/student-status/delete/${id}`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
