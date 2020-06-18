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

export const checkUserEBook = () => {
  var response = fetch("http://localhost:5000/api/EBook/CheckUserEBook", {
    headers: {
      authorization: "Bearer " + getToken()
    }
  })
    .then(response => response.json())
    .then(data => {
      return data;
    }).catch((err) => {
      return err;
    });
  return response;
};