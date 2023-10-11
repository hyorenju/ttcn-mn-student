import instane from '../instane';

export const adminTrashApi = {
  getAllTrashAdmin: async (values) => {
    const url = '/admin/admin/trash';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restoreAdmin: async (id) => {
    const url = `/admin/admin/restore/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
