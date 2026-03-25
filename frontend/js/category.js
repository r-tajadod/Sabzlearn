import {
  getAndShowCategoryCourses,
  insertHtmlTemplate,
} from "./funcs/shared.js";

window.addEventListener("load", async () => {
  const categoryCoursesWrapper = document.querySelector(
    "#category-courses-wrapper",
  );

  const responseCourses = await getAndShowCategoryCourses();
  let courses = [...responseCourses];

  insertHtmlTemplate("row", courses, categoryCoursesWrapper);

  const coursesShowTypeIcons = document.querySelectorAll(
    ".courses-top-bar__icon-parent",
  );

  coursesShowTypeIcons.forEach((icon) => {
    icon.addEventListener("click", () => {
      // remove active from all
      coursesShowTypeIcons.forEach((i) => {
        i.classList.remove("courses-top-bar__icon--active");
      });

      // add active to clicked one
      icon.classList.add("courses-top-bar__icon--active");

      if (icon.classList.contains("courses-top-bar__row-btn")) {
        insertHtmlTemplate("row", courses, categoryCoursesWrapper);
      } else {
        insertHtmlTemplate("column", courses, categoryCoursesWrapper);
      }
    });
  });
});
