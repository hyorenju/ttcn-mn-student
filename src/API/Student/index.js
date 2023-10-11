import instane from '../request';

export const studentApi = {
  getInfo: async (id) => {
    const url = `/student/detail/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStudentPoint10: async (id) => {
    const url = `/student/study-process-10/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStudentPoint4: async (id) => {
    const url = `/student/study-process-4/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStudentTraningPoint: async (id) => {
    const url = `/student/training-process/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStudentAccumulation: async (id) => {
    const url = `/student/accumulation/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateInfo: async (id, values) => {
    const url = `/student/update/${id}`;
    try {
      const res = await instane.put(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  changePassword: async (values) => {
    const url = `/student/change-password`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
