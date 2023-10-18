import instane from "../instane";

export const trashStudentApi = {
  getTrashAll: async (values) => {
    const url = `/admin/student/trash`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restoreStudent: async (id) => {
    const url = `/admin/student/restore/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  restoreStudentList: async (values) => {
    const url = `/admin/student/restore`;
    try {
      const res = await instane.post(url, values);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  permanentlyDeletedStudent: async (id) => {
    const url = `/admin/student/delete-permanently/${id}`;
    try {
      const res = await instane.post(url);
      return res.data;
    } catch (error) {
      throw new Error(error);
    }
  },
};
