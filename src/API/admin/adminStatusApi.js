import instane from '../instane';

export const adminStatusApi = {
  getAllStatus: async (values) => {
    const url = '/admin/status/list';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createStatus: async (values) => {
    const url = '/admin/status/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateStatus: async (id, values) => {
    const url = `/admin/status/update/${id}`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteStatus: async (id) => {
    const url = `/admin/status/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
