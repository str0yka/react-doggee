import { setCookie } from '.';

export const deleteCookie = (name: string) => {
  setCookie(name, 0, { expires: -1 });
};
