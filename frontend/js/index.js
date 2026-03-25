import { getAndShowAllCourses } from "./funcs/shared.js";
import { getAndShowPopularCourses } from "./funcs/shared.js";
import { getAndShowPresellCourses } from "./funcs/shared.js";
import { getAndShowArticles } from "./funcs/shared.js";
import { getAndShowNavbarMenus } from "./funcs/shared.js";

const $ = document;
const landingTitle = $.querySelector(".landing__title");
const landingCoursesCount = $.querySelector("#courses-count");
const landingMinutesCount = $.querySelector("#minutes-counter");
const landingUsersCount = $.querySelector("#users-counter");

window.addEventListener("load", async () => {
  let landingText = "ما به هر قیمتی دوره آموزشی تولید نمی کنیم !";
  let typeIndex = 0;

  //start showing latest courses

  const courses = await getAndShowAllCourses();
  console.log(courses);

  //end showing latest courses

  //start showing popular courses

  const pplCourses = await getAndShowPopularCourses();
  console.log(pplCourses);

  //end showing popular courses

  //start showing presell courses

  const pslCourses = await getAndShowPresellCourses();
  console.log(pslCourses);
  //end showing presell courses

  //start showing articles
  const allArtciles = await getAndShowArticles();
  console.log(allArtciles);

  //end showing articles

  //start showing menus

  const showingMenus = await getAndShowNavbarMenus();
  console.log(showingMenus);
  //end showing menus

  typeWriter(landingText, typeIndex);
  makeCounter(40, landingCoursesCount);
  makeCounter(3_320, landingMinutesCount);
  makeCounter(3_071, landingUsersCount);
});

function typeWriter(text, index) {
  if (index < text.length) {
    landingTitle.innerHTML += text[index];
    index++;
  }

  setTimeout(() => {
    typeWriter(text, index);
  }, 100);
}

function makeCounter(max, elem) {
  let counter = 0;
  const interval = setInterval(() => {
    if (counter === max) {
      clearInterval(interval);
    }

    elem.innerHTML = counter;
    counter++;
  }, 0.5);
}
