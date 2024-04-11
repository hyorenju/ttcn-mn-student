import instane from '../instane';

export const studentApi = {
  changePassword: async (values) => {
    const url = `/student/change-password`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  statistic: async () => {
    const url = `/student/statistic`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  status: async () => {
    const url = `/student/status`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateAvatar: async (data) => {
    const url = `/student/avatar`;
    try {
      const res = await instane.post(url, data);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateEmail: async (values) => {
    const url = `/student/email`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProfile: async (values) => {
    const url = `/student/update`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  statusList: async (values) => {
    const url = `/student/status`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
