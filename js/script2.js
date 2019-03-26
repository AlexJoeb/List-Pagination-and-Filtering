"use strict"; // ******************************************
// Treehouse Techdegree:
// FSJS project 2 - List Filter and Pagination
// ******************************************
// // Study guide for this project - https://drive.google.com/file/d/1OD1diUsTMdpfMDv677TfL1xO2CEkykSz/view?usp=sharing
// /***
//    Add your global variables that store the DOM elements you will
//    need to reference and/or manipulate.
//    But be mindful of which variables should be global and which
//    should be locally scoped to one of the two main functions you're
//    going to create. A good general rule of thumb is if the variable
//    will only be used inside of a function, then it can be locally
//    scoped to that function.
// ***/
// Return the main .page div

var pageDiv = document.querySelector(".page"); // Returns NodeList(44) [li.student-item.cf, li.student-item.cf, li.student-item.cf, etc...]

var students = document.querySelectorAll(".student-item"); // Returns <ul class="student-list">...</ul>

var studentList = document.querySelector(".student-list"); // Returns <div class="pagination">...</div>

var pagination = document.querySelector(".pagination"); // Return <input placeholder="Search for students" />

var searchInput = document.querySelector(".student-search input"); // Array used to setup pagination

var studentArray = []; // Array used to contain students being shown while searching

var searchArray = []; // Current page being shown | Default: 1

var currentPage = 1; // Number of pages needed for pagination | Default: 1

var numOfPagesNeeded = 1; // /***
//    Create the `showPage` function to hide all of the items in the
//    list except for the ten you want to show.
//    Pro Tips:
//      - Keep in mind that with a list of 54 students, the last page
//        will only display four.
//      - Remember that the first student has an index of 0.
//      - Remember that a function `parameter` goes in the parens when
//        you initially define the function, and it acts as a variable
//        or a placeholder to represent the actual function `argument`
//        that will be passed into the parens later when you call or
//        "invoke" the function
// ***/

var initPagination = function initPagination() {
  // Length tells us how many students are accounted for.
  // numOfPages tells us how many pages we need to create based on the amount of students.
  var length = students.length;
  numOfPagesNeeded = Math.ceil(length / 10); // Create the number bar at the botto for pagination

  var ul = document.createElement("ul");
  ul.classList.add("pagination");

  for (var _i = 1; _i <= numOfPagesNeeded; _i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("data-page", _i);
    a.innerText = _i;

    if (_i == currentPage) {
      a.className += "active";
    }

    li.appendChild(a);
    ul.appendChild(li);
  }

  pageDiv.appendChild(ul); // These numbers will tell the code when to wrap the person to the next page.
  // Output: [11, 21, 31, 41, 51, etc...]

  var indexOnNumbers = [];

  for (var i = 1, counter = 1; i <= numOfPagesNeeded; i++, counter += 10) {
    if (i == 1) continue;
    indexOnNumbers.push(counter);
  } // The for-loop pushes empty arrays into the student array, therefore creating the pages.
  // Output: studentArray = [[], [], [], etc...]

  for (var i = 0; i < numOfPagesNeeded; i++) {
    var array = [];
    studentArray.push(array);
  }

  var pageIndex = 0;

  for (var personIndex = 0; personIndex < length; personIndex++) {
    // personNumer is used to tell when to wrap to the next page
    var personNumber = personIndex + 1;

    if (indexOnNumbers.includes(personNumber)) {
      pageIndex++;
    }

    var studentObject = liToObject(students[personIndex]);
    studentArray[pageIndex].push(studentObject);
  }
};

var initSearch = function initSearch() {
  pagination.style.visibility = "hidden";
};

var initPage = function initPage(page) {
  hideAllStudents(); // Get an array of students that are on page x.

  var list = getStudentArrayByPage(page);

  for (var i = 0; i < list.length; i++) {
    studentList.appendChild(list[i]);
  }

  currentPage = page; // Remove .active from all pagination.

  document.querySelectorAll(".pagination a").forEach(function (e) {
    e.classList.remove("active");
  }); // Re-add .active to current page

  if (
    document.querySelector(".pagination a[data-page]") &&
    document
    .querySelector(".pagination a[data-page]")
    .getAttribute("data-page") == page
  ) {
    document
      .querySelector(".pagination a[data-page='".concat(page, "]"))
      .classList.add("active");
  }
};

var liToObject = function liToObject(li) {
  var obj = {};
  var avatarPath = li.children[0].children[0];
  obj.avatar = avatarPath.src;
  var namePath = li.children[0].children[1].innerText;
  obj.name = namePath;
  var emailPath = li.children[0].children[2].innerText;
  obj.email = emailPath;
  var joinPath = li.children[1].children[0].innerText;
  obj.joinDate = joinPath;
  return obj;
};

var objToLi = function objToLi(obj) {
  var li = document.createElement("li");
  const template = `
    <div class="student-details">
      <img class="avatar" src="${obj.avatar}">
      <h3>${obj.name}</h3>
      <span class="email">${obj.email}</span>
    </div>
    <div class="joined-details">
      <span class="date">${obj.joinDate}</span>
    </div>
  `;
  li.classList.add("student-item");
  li.classList.add("cf");
  li.innerHTML = template;
  return li;
};

initPagination();