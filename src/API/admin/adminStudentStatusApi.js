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
  deleteStudentStatus: async (id) => {
    const url = `/admin/student-status/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  importStudentStatus: async (value) => {
    const url = `/admin/student-status/import`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  exportStudentStatus: async (value) => {
    const url = `/admin/student-status/export`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
