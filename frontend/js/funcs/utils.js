  export async function showSwal(title, icon, confirmButtonText) {
    const result = await Swal.fire({
      title,
      icon,
      confirmButtonText,
    });

    return result;
  }

  const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getFromLocalStorage = (key) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  const getToken = () => {
    const user = getFromLocalStorage("user");
    return user ? user.token : null;
  };

  const isLogin = () => {
    const userInfos = localStorage.getItem("user");
    return userInfos ? true : false;
  };

  const getUrlParam = key => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
  };

  export { saveLocalStorage, getFromLocalStorage, getToken, isLogin, getUrlParam };
