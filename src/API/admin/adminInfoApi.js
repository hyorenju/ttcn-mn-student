import instane from '../instane';
export const adminInfoApi = {
  updateAvatar: () => {
    try {
      const url = '';
      return instane.post(url);
    } catch (error) {
      throw new Error(error);
    }
  },
};
