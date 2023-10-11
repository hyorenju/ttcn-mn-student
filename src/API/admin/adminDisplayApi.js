import instane from '../instane';

export const adminDisplayApi = {
  getDisplayList: async (value) => {
    const url = `/admin/display/list`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDisplayErrorImport: async (id) => {
    const url = `/admin/display/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  uploadImgImport: async (values) => {
    const url = `/admin/display/upload`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateDisplayImport: async (id, value) => {
    const url = `/admin/display/update/${id}`;
    try {
      const res = await instane.post(url, value);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
