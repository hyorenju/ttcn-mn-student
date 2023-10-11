import instane from '../instane';

export const adminPointApi = {
  getDataMedCore10: async (id) => {
    const url = `/admin/student/study-process-10/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataMedCore4: async (id) => {
    const url = `/admin/student/study-process-4/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataTraningPoint: async (id) => {
    const url = `/admin/student/training-process/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataAccumulation: async (id) => {
    const url = `/admin/student/accumulation/${id}`;
    try {
      const res = await instane.get(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  // ========================================================

  getAllPoint: async (values) => {
    const url = `/admin/point/list`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  createPoint: async (values) => {
    const url = `/admin/point/create`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  updatePoint: async (id, values) => {
    const url = `/admin/point/update/${id}`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  deletePoint: async (id) => {
    const url = `/admin/point/delete/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  exportPointStudent: async (values) => {
    const url = `/admin/point/export`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
