import instane from '../instane';

export const adminClassficationApi = {
  getAllClass: async (values) => {
    const url = '/admin/class-classified/list';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createClass: async (values) => {
    const url = '/admin/class-classified/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteClass: async (values) => {
    const url = `/admin/class-classified/delete`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
