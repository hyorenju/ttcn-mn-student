import instane from '../instane';

export const adminAdminApi = {
  getAllAdmin: async (values) => {
    try {
      const url = '/admin/admin/list';
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createAdmin: async (values) => {
    try {
      const url = '/admin/admin/create';
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateAdmin: async (values) => {
    try {
      const url = '/admin/admin/update';
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  editProfile: async (values) => {
    try {
      const url = '/admin/admin/edit';
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deleteAdmin: async (id) => {
    try {
      const url = `/admin/admin/delete/${id}`;
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restoreAdmin: async (id) => {
    try {
      const url = `/admin/admin/restore/${id}`;
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  trashAdmin: async (values) => {
    try {
      const url = `/admin/admin/trash`;
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
