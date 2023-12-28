import instane from '../instane';

export const adminMajorApi = {
  getMajorSelection: async () => {
    const url = '/admin/major/selection';
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
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
  updateMajor: async (values) => {
    const url = `/admin/major/update`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteMajor: async (id) => {
    const url = `/admin/major/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
