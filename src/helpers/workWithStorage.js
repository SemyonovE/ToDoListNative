import localStorage from "react-native-local-storage";

export const saveToLocalStorage = (data, name) => localStorage.save(name, data);

export const loadFromLocalStorage = (defaultValue, name) => {
  return localStorage.get(name).then(res => {
    if (!res)
      return saveToLocalStorage(defaultValue, name).then(() =>
        localStorage.get(name)
      );
    else return localStorage.get(name);
  });
};
