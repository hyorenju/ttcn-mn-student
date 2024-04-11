import instane from '../instane';

export const adminSchoolYearApi = {
  getYear: async () => {
    const url = `/admin/school-year/selection`;
    try {
      const res = await instane.post(url);
      if (res) return res.data;
      return instane.post(url);
    } catch (error) {
      throw new Error(error);
    }
  },
};
