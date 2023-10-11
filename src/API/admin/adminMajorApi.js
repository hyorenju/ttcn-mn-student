import instane from '../instane';

export const adminMajorApi = {
  getAllMajor: async (values) => {
    const url = '/admin/major/list';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createMajor: async (values) => {
    const url = `/admin/major/create`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateMajor: async (id, values) => {
    const url = `/admin/major/update/${id}`;
    try {
      const res = await instane.put(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteMajor: async (id) => {
    const url = `/admin/major/delete/${id}`;
    try {
      const res = await instane.delete(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
