import { getMe } from "./auth.js";
import { isLogin, getUrlParam, getToken } from "./utils.js";

const showUserNameInNavbar = async () => {
  const navBarProfileBox = document.querySelector(".main-header__profile");
  const isUserLogin = isLogin();
  if (isUserLogin) {
    const userInfos = await getMe();
    navBarProfileBox.setAttribute("href", "login.html");
    navBarProfileBox.innerHTML = `<span class="main-header__profile-text">  ${userInfos.name}  </span>`;
  } else {
    navBarProfileBox.setAttribute("href", "login.html");
    navBarProfileBox.innerHTML = `<span class="main-header__profile-text"> ثبت نام / ورود </span>`;
  }
};

const renderTopbarMenus = async () => {
  const topBar = document.querySelector(".top-bar__menu");
  topBar.innerHTML = "";
  const res = await fetch("http://localhost:4000/v1/menus/topbar");
  const topbarMenus = await res.json();
  const shuffeldItems = topbarMenus.sort(() => Math.random() - 0.5);
  shuffeldItems.slice(0, 6).forEach((menu) => {
    topBar.innerHTML += `<li class="top-bar__item">
        <a href = '#' class= "top-bar__link"> ${menu.title} </a> </li>`;
  });
};

const getAndShowAllCourses = async () => {
  const coursesContainer = document.querySelector("#courses-container");
  const res = await fetch("http://localhost:4000/v1/courses");
  const courses = await res.json();
  coursesContainer.innerHTML = courses
    .slice(0, 6)
    .map((course) => {
      let stars = "";
      const score = course.courseAverageScore;
      for (let i = 0; i < 5; i++) {
        if (i < score) {
          stars += ` <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`;
        } else {
          stars += `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`;
        }
      }
      return `
          <div class="col-4">
                    <div class="course-box">
                      <a href="#">
                        <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" class="course-box__img" />
                      </a>
                      <div class="course-box__main">
                        <a href="#" class="course-box__title">${course.name}</a>

                        <div class="course-box__rating-teacher">
                          <div class="course-box__teacher">
                            <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                            <a href="#" class="course-box__teacher-link">${course.creator}</a>
                          </div>
                          <div class="course-box__rating">
                          ${stars}


                          </div>
                        </div>

                        <div class="course-box__status">
                          <div class="course-box__users">
                            <i class="fas fa-users course-box__users-icon"></i>
                            <span class="course-box__users-text">${course.registers}</span>
                          </div>
                          <span class="course-box__price">${course.price == 0 ? "رایگان" : course.price.toLocaleString()}</span>
                        </div>
                      </div>

                      <div class="course-box__footer">
                        <a href="#" class="course-box__footer-link">
                          مشاهده اطلاعات
                          <i class="fas fa-arrow-left course-box__footer-icon"></i>
                        </a>
                      </div>

                    </div>
                  </div>
          `;
    })
    .join("");
  return courses;
};

const getAndShowPopularCourses = async () => {
  const popularCoursesElem = document.querySelector(".popular .swiper-wrapper");
  const res = await fetch("http://localhost:4000/v1/courses/popular");
  const popularCourses = await res.json();
  popularCoursesElem.innerHTML = popularCourses
    .map((course) => {
      let stars = "";
      const score = course.courseAverageScore;
      for (let i = 0; i < 5; i++) {
        if (i < score) {
          stars += ` <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`;
        } else {
          stars += `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`;
        }
      }
      return `
        <div class="swiper-slide">
                  <div class="course-box">
                    <a href="#">
                      <img src=http://localhost:4000/courses/covers/${course.cover}  alt="Course img" class="course-box__img" />
                    </a>
                    <div class="course-box__main">
                      <a href="#" class="course-box__title">${course.name}</a>

                      <div class="course-box__rating-teacher">
                        <div class="course-box__teacher">
                          <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                          <a href="#" class="course-box__teacher-link"> ${course.creator}</a>
                        </div>
                        <div class="course-box__rating">
                         ${stars}
                        </div>
                      </div>

                      <div class="course-box__status">
                        <div class="course-box__users">
                          <i class="fas fa-users course-box__users-icon"></i>
                          <span class="course-box__users-text">${course.registers}</span>
                        </div>
                        <span class="course-box__price">${
                          course.price > 0
                            ? course.price.toLocaleString()
                            : "رایگان"
                        }</span>
                      </div>
                    </div>

                    <div class="course-box__footer">
                      <a href="#" class="course-box__footer-link">
                        مشاهده اطلاعات
                        <i class="fas fa-arrow-left course-box__footer-icon"></i>
                      </a>
                    </div>

                  </div>
                  </div>

      `;
    })
    .join("");
  return popularCourses;
};

const getAndShowPresellCourses = async () => {
  const swiperWrapperId = document.querySelector("#swiper-wrapper-id");
  const res = await fetch("http://localhost:4000/v1/courses/presell");
  const presellcourses = await res.json();
  swiperWrapperId.innerHTML = presellcourses
    .map((course) => {
      let stars = "";
      for (let i = 0; i < 5; i++) {
        if (course.courseAverageScore > i) {
          stars += ` <img src="images/svgs/star_fill.svg" alt="rating" class="course-box__star">`;
        } else {
          stars += `<img src="images/svgs/star.svg" alt="rating" class="course-box__star">`;
        }
      }
      return `
    <div class="swiper-slide">
                <div class="course-box">
                  <a href="#">
                    <img src=http://localhost:4000/courses/covers/${course.cover} alt="Course img" class="course-box__img" />
                  </a>
                  <div class="course-box__main">
                    <a href="#" class="course-box__title"> ${course.name}</a>

                    <div class="course-box__rating-teacher">
                      <div class="course-box__teacher">
                        <i class="fas fa-chalkboard-teacher course-box__teacher-icon"></i>
                        <a href="#" class="course-box__teacher-link">${course.creator} </a>
                      </div>
                      <div class="course-box__rating">
                        ${stars}
                      </div>
                    </div>

                    <div class="course-box__status">
                      <div class="course-box__users">
                        <i class="fas fa-users course-box__users-icon"></i>
                        <span class="course-box__users-text">${course.registers}</span>
                      </div>
                      <span class="course-box__price">${
                        course.price > 0
                          ? course.price.toLocaleString()
                          : "رایگان"
                      }</span>
                    </div>
                  </div>

                  <div class="course-box__footer">
                    <a href="#" class="course-box__footer-link">
                      مشاهده اطلاعات
                      <i class="fas fa-arrow-left course-box__footer-icon"></i>
                    </a>
                  </div>

                </div>
              </div>
    `;
    })
    .join("");
  return presellcourses;
};

const getAndShowArticles = async () => {
  const articlesElem = document.querySelector("#article-id");
  const res = await fetch("http://localhost:4000/v1/articles");
  const articles = await res.json();

  articlesElem.innerHTML = articles
    .slice(0, 6)
    .map((article) => {
      return `

    <div class="col-4">
              <div class="article-card">
                <div class="article-card__header">
                  <a href="#" class="article-card__link-img">
                    <img src=http://localhost:4000/courses/covers/${article.cover} class="article-card__img" alt="Article Cover" />
                  </a>
                </div>
                <div class="article-card__content">
                  <a href="#" class="article-card__link">
                   ${article.title}
                  </a>
                  <p class="article-card__text">
                      ${article.description}
                  </p>
                  <a href="#" class="article-card__btn">بیشتر بخوانید</a>
                </div>
              </div>
            </div>

    `;
    })
    .join("");

  return articles;
};

const getAndShowNavbarMenus = async () => {
  const res = await fetch("http://localhost:4000/v1/menus");
  const menus = await res.json();
  console.log("MENUS:", menus);
  menus.forEach((menu) => {
    console.log("MENU:", menu.title);

    menu.submenus.forEach((sub) => {
      console.log("  SUBMENU:", sub.title);
    });
  });
  const menusWrapper = document.querySelector("#menus-wrapper");
  menusWrapper.innerHTML = menus
    .map((menu) => {
      let submenusHtml = "";
      submenusHtml = menu.submenus

        .map((submenu) => {
          return `
            <li class="main-header__dropdown-item">
              <a href="category.html?cat=${submenu.href.split("/").pop()}" class="main-header__dropdown-link">${submenu.title}</a>
            </li>
            `;
        })
        .join("");

      return `
      <li class="main-header__item">
          <a href=category.html?cat=${menu.href.split("/").pop()} class="main-header__link">${menu.title}

        ${
          menu.submenus.length !== 0
            ? `
          <i class="fas fa-angle-down main-header__link-icon"></i>
            <ul class="main-header__dropdown">
              ${submenusHtml}
            </ul>`
            : ""
        }
        </a>
      </li>
      `;
    })
    .join("");

  return menus;
};

const getAndShowCategoryCourses = async () => {
  const categoryName = getUrlParam("cat");
  const token = getToken();

  const res = await fetch(
    `http://localhost:4000/v1/courses/category/${categoryName}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const courses = await res.json();

  return courses;
};

const insertHtmlTemplate = (showType, courses, parentElement) => {
  if (!courses.length) {
    parentElement.innerHTML = `<div class='alert alert-danger'>هیچ دوره‌ای وجود ندارد</div>`;
    return;
  }

  parentElement.innerHTML = courses
    .map((course) => {
      let stars = "";
      const score = course.courseAverageScore;

      for (let i = 0; i < 5; i++) {
        stars +=
          i < score
            ? `<img src="images/svgs/star_fill.svg" class="course-box__star">`
            : `<img src="images/svgs/star.svg" class="course-box__star">`;
      }

      // 🔹 ROW
      if (showType === "row") {
        return `
        <div class="col-4">
          <div class="course-box">
            <a href="#">
              <img src="images/courses/jango.png" class="course-box__img" />
            </a>

            <div class="course-box__main">
              <a href="#" class="course-box__title">${course.name}</a>

              <div class="course-box__rating-teacher">
                <div class="course-box__teacher">
                  <i class="fas fa-chalkboard-teacher"></i>
                  <a href="#">${course.creator}</a>
                </div>

                <div class="course-box__rating">
                  ${stars}
                </div>
              </div>

              <div class="course-box__status">
                <span>${course.registers}</span>
                <span>
                  ${
                    course.price == 0 ? "رایگان" : course.price.toLocaleString()
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
        `;
      }

      // 🔹 COLUMN
      return `
      <div class="col-12">
        <div class="course-box d-flex align-items-center p-3">

          <div class="ms-3">
            <img src="http://localhost:4000/courses/covers/${course.cover}" style="width: 180px;" />
          </div>

          <div class="flex-grow-1">
            <h5>${course.name}</h5>

            <div>
              <span>${course.creator}</span>
              ${stars}
            </div>

            <p>${course.description}</p>

            <div class="d-flex justify-content-between">
              <span>${course.registers}</span>
              <span>
                ${course.price == 0 ? "رایگان" : course.price.toLocaleString()}
              </span>
            </div>
          </div>

        </div>
      </div>
      `;
    })
    .join("");
};

export {
  showUserNameInNavbar,
  getAndShowAllCourses,
  renderTopbarMenus,
  getAndShowPopularCourses,
  getAndShowPresellCourses,
  getAndShowArticles,
  getAndShowNavbarMenus,
  getAndShowCategoryCourses,
  insertHtmlTemplate,
};
