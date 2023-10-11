import instane from '../instane';

export const adminMajorfication = {
  getAllMajor: async (values) => {
    const url = '/admin/course-classified/list';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createMajor: async (values) => {
    const url = '/admin/course-classified/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteMajor: async (values) => {
    const url = `/admin/course-classified/delete`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
