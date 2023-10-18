import instane from "../instane";

export const adminClassApi = {
  getAllClass: async (values) => {
    const url = "/admin/class/list";
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createClass: async (values) => {
    const url = "/admin/class/create";
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
};
