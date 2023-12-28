import instane from '../instane';

export const adminSemesterApi = {
  getAllTermSelection: async () => {
    const url = `/admin/term/selection`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllSemester: async (values) => {
    const url = `/admin/term/list`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createSemester: async (values) => {
    const url = `/admin/term/create`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteSemester: async (id) => {
    const url = `/admin/term/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
