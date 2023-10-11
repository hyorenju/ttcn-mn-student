import instane from '../instane';

export const trashPointApi = {
  getTrashAll: async (values) => {
    const url = `/admin/point/trash`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restorePoint: async (id) => {
    const url = `/admin/point/restore/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restorePointList: async (values) => {
    const url = `/admin/point/restore`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
