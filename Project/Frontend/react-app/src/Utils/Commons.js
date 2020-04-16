// export const getUser = () => {
//   const userStr = sessionStorage.getItem("user");
//   if (userStr) return JSON.parse(userStr);
//   else return null;
// };

export const getToken = () => {
  return sessionStorage.getItem("Token") || null;
};

export const removeUserSession = () => {
  sessionStorage.removeItem("Token");
  // sessionStorage.removeItem("user");
};

export const setUserSession = (token) => {
  sessionStorage.setItem("Token", token);
  // sessionStorage.setItem("user", JSON.stringify(user));
};
