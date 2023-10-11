import instane from '../instane';

export const visitor = {
  login: async (values) => {
    const url = '/visitor/login';
    try {
      const res = await instane.post(url, values, {
        headers: {
          Authorization: undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  changePassword: async (values) => {
    const url = '/visitor/change-password';
    try {
      const res = await instane.post(url, values, {
        headers: {
          Authorization: undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  confirmChagePassword: async (values) => {
    const url = '/visitor/send-request';
    try {
      const res = await instane.post(url, values, {
        headers: {
          Authorization: undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  download: async (values) => {
    const url = '/download-excel';
    try {
      const res = await instane.post(url, values, {
        headers: {
          Authorization: undefined,
        },
      });
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
