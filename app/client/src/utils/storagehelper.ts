export enum StorageType {
  local = 0,
  session = 1,
}

export default class StorageHelper {
  public static set = (
    key: string,
    data: any,
    type: StorageType = StorageType.local
  ) => {
    if (type === StorageType.local) {
      localStorage.setItem(key, data);
    }
  };

  public static get = (key: string, type: StorageType = StorageType.local) => {
    if (type === StorageType.local) {
      return localStorage.getItem(key);
    }

    return null;
  };

  public static remove = (
    key: string,
    type: StorageType = StorageType.local
  ) => {
    if (type === StorageType.local) {
      localStorage.removeItem(key);
    }
  };
}
