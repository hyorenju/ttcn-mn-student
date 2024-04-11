import instane from '../instane';

export const adminClassApi = {
  getClassSelection: async () => {
    const url = '/admin/class/selection';
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getAllClass: async (values) => {
    const url = '/admin/class/list';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createClass: async (values) => {
    const url = '/admin/class/create';
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateClass: async (values) => {
    const url = `/admin/class/update`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteClass: async (id) => {
    const url = `/admin/class/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  importClass: async (value) => {
    const url = `/admin/class/import`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  exportClass: async (value) => {
    const url = `/admin/class/export`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
