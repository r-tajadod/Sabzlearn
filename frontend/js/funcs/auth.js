const $ = document;
import {
  showSwal,
  saveLocalStorage,
  getToken,
} from "./utils.js";

const register = async () => {
  const nameInput = document.querySelector("#name");
  const usernameInput = document.querySelector("#username");
  const emailInput = document.querySelector("#email");
  const phoneInput = document.querySelector("#phone");
  const passwordInput = document.querySelector("#password");

  const newUserInfos = {
    name: nameInput.value.trim(),
    username: usernameInput.value.trim(),
    email: emailInput.value.trim(),
    phone: phoneInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const res = await fetch("http://localhost:4000/v1/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserInfos),
    });

    const data = await res.json();

    if (res.status === 201) {
      saveLocalStorage("user", {
        token: data.accessToken,
      });
      const result = await showSwal(
        "ثبت نام با موفقیت انجام شد",
        "success",
        "ورود به پنل",
      );

      if (result.isConfirmed) {
        location.href = "./index.html";
      }
    } else if (res.status === 409) {
      await showSwal(
        "نام کاربری یا ایمیل قبلا استفاده شده است",
        "error",
        "تصحیح اطلاعات",
      );
    }

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const login = async () => {
  const identifierInput = $.querySelector("#identifier");
  const passwordInput = $.querySelector("#password");

  const userInfos = {
    identifier: identifierInput.value.trim(),
    password: passwordInput.value.trim(),
  };

  try {
    const res = await fetch("http://localhost:4000/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfos),
    });

    const data = await res.json();

    if (res.status == 200) {
      saveLocalStorage("user", {
        token: data.accessToken,
      });

      const res = await showSwal(
        "با موفقیت وارد شدید",
        "success",
        "ورود به پنل",
      );

      if (res.isConfirmed) {
        location.href = "./index.html";
      }
    } else if (res.status === 401) {
      await showSwal(
        "کاربری با این اطلاعات یافت نشد",
        "error",
        "تصحیح اطلاعات",
      );
    }
  } catch (error) {
    console.log(error);
  }
};

const getMe = async () => {
  const token = getToken();

  if (!token) {
    return false;
  } else {
    const res = await fetch("http://localhost:4000/v1/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    return data;
  }
};

export { register, login, getMe };
