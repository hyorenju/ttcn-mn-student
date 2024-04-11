import instane from '../instane';

export const adminStatistic = {
  getDataPoint: async (id) => {
    const url = `/admin/statistic/student/${id}`;
    try {
      const res = await instane.post(url);
      if (res) return res.data;
      return instane.post(url);
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticClass: async (id, values) => {
    const url = `/admin/statistic/class/${id}`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticMajor: async (id, values) => {
    const url = `/admin/statistic/major/${id}`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticCourse: async (id, values) => {
    const url = `/admin/statistic/course/${id}`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticFacultyColumn1: async (values) => {
    const url = `/admin/statistic/faculty/column/interrupt`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticFacultyColumn2: async (values) => {
    const url = `/admin/statistic/faculty/column/io`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  getDataStatsticFacultyCircle: async (values) => {
    const url = `/admin/statistic/faculty/circle`;
    try {
      const res = await instane.post(url, values);
      if (res) return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
