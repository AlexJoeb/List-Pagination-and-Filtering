"use strict"; 

// ******************************************
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
var pageDiv = document.querySelector(".page"); 
// Returns NodeList(44) [li.student-item.cf, li.student-item.cf, li.student-item.cf, etc...]
var students = document.querySelectorAll('.student-item'); 
// Returns <ul class="student-list">...</ul>
var studentList = document.querySelector(".student-list"); 
// Returns <ul class="pagination">...</ul>
var pagination = document.querySelector('.pagination'); 
// Returns <ul class="search-pagination">...</ul>
var searchPagination = document.querySelector('.search-pagination'); 
// Array of all students
var allStudents = []; 
// Array of students currently showing
var studentsShowing = []; 
// All search results
var searchResults = []; 
// Array used to setup pagination
var studentArray = []; 
// Array used to contain students being shown while searching
var searchArray = []; 
// Return <input placeholder="Search for students" />
var searchInput = document.querySelector(".student-search input"); 
// Current page being shown | Default: 1
var currentPage = 1; 
// Current page being shown | Default: 1
var currentSearchPage = 1; 
// Number of pages needed for pagination | Default: 1
var numOfPagesNeeded = 1; 
// Number of search pages needed for pagination among search | Default: 1
var numOfSearchPagesNeeded = 1; 

var initApp = function initApp() {
  students.forEach(function (e) {
    allStudents.push(liToObject(e));
  });
};

var initSearch = function initSearch(text) {
  pagination.style.visibility = "hidden";
  searchPagination.style.visibility = "visible";
  searchArray = [];
  hideStudents(studentsShowing);
  searchResults = allStudents.filter(function (e) {
    var obj = liToObject(e);

    if (obj.name.toLowerCase().includes(text) || obj.email.split("@")[0].toLowerCase().includes(text) || obj.joinDate.split(" ")[1].toLowerCase().includes(text) || obj.joinDate.split(" ")[1].split("/").join("").toLowerCase().includes(text)) {
      return obj;
    }
  });

  numOfSearchPagesNeeded = Math.ceil(searchResults.length / 10);

  for (var _i2 = 0; _i2 < numOfSearchPagesNeeded; _i2++) {
    var a = [];
    searchArray.push(a);
  }
  
  // These numbers will tell the code when to wrap the person to the next page.
  // Output: [11, 21, 31, 41, 51, etc...]
  var indexOnNumbers = [];
  for (var i = 1, counter = 1; i <= numOfSearchPagesNeeded; i++, counter += 10) {
    if (i == 1) continue;
    indexOnNumbers.push(counter);
  }

  var pageIndex = 0;

  for (var personIndex = 0; personIndex < searchResults.length; personIndex++) {
    // personNumer is used to tell when to wrap to the next page
    var personNumber = personIndex + 1;

    if (indexOnNumbers.includes(personNumber)) {
      pageIndex++;
    }

    var studentObject = liToObject(searchResults[personIndex]);
    searchArray[pageIndex].push(studentObject);
  }

  initSearchPaginationBar();
  addListOfStudentsToPage(searchArray[0]);
  setSearchPaginationBarPage(1);
};

var initPagination = function initPagination() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentPage;
  // Length tells us how many students are accounted for.
  // numOfPages tells us how many pages we need to create based on the amount of students.
  var length = students.length;
  numOfPagesNeeded = Math.ceil(length / 10); // These numbers will tell the code when to wrap the person to the next page.
 
  // Output: [11, 21, 31, 41, 51, etc...]
  var indexOnNumbers = [];
  for (var i = 1, counter = 1; i <= numOfPagesNeeded; i++, counter += 10) {
    if (i == 1) continue;
    indexOnNumbers.push(counter);
  } 
  
  // The for-loop pushes empty arrays into the student array, therefore creating the pages.
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

  hideStudents();
  initPage(page);
};

var initPage = function initPage() {
  var page = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : currentPage;
  searchPagination.style.visibility = "hidden";
  pagination.style.visibility = "visible";
  hideStudents(studentsShowing); 

  // Get an array of students that are on page x.
  var list = getStudentArrayByPage(page); // Update current page

  currentPage = page;
  addListOfStudentsToPage(list); 
  
  // Remove .active from all pagination.
  document.querySelectorAll(".pagination a").forEach(function (e) {
    e.classList.remove("active");
  }); 
  
  // Re-add .active to current page
  document.querySelectorAll(".pagination a[data-page]").forEach(function (e) {
    if (parseInt(e.getAttribute('data-page')) == page) {
      e.classList.add('active');
    }
  });
};

var addListOfStudentsToPage = function addListOfStudentsToPage(list) {
  //Remove All Students
  hideStudents(studentsShowing); 
  
  // Add all students from list to the page.
  studentsShowing = [];

  for (var i = 0; i < list.length; i++) {
    var li = objToLi(list[i]);
    studentsShowing.push(li);
    studentList.appendChild(li);
  }
};

var liToObject = function liToObject(li) {
  // Check if li is already an object, if so return it. No need to convert to object.
  if (li.name) return li;
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
  var template = "\n    <div class=\"student-details\">\n      <img class=\"avatar\" src=\"".concat(obj.avatar, "\">\n      <h3>").concat(obj.name, "</h3>\n      <span class=\"email\">").concat(obj.email, "</span>\n    </div>\n    <div class=\"joined-details\">\n      <span class=\"date\">").concat(obj.joinDate, "</span>\n    </div>\n  ");
  li.classList.add("student-item");
  li.classList.add("cf");
  li.innerHTML = template;
  return li;
};

var hideStudents = function hideStudents() {
  var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : students;

  for (var i = 0; i < list.length; i++) {
    var e = list[i];
    if (!e.parentNode) return;
    e.parentNode.removeChild(e);
  }

  list.forEach(function (e) {});
};

var getStudentArrayByPage = function getStudentArrayByPage(page) {
  return studentArray[page - 1];
};

var initPaginationBar = function initPaginationBar() {
  // Create the number bar at the botto for pagination
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
    pagination.appendChild(li);
  }
};

var initSearchPaginationBar = function initSearchPaginationBar() {
  searchPagination.innerHTML = ''; 
  
  // Create the number bar at the botto for pagination
  for (var _i = 1; _i <= numOfSearchPagesNeeded; _i++) {
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("data-page", _i);
    a.innerText = _i;

    if (_i == currentPage) {
      a.className += "active";
    }

    li.appendChild(a);
    searchPagination.appendChild(li);
  }
};

var setSearchPaginationBarPage = function setSearchPaginationBarPage(page) {
  document.querySelectorAll(".search-pagination a").forEach(function (e) {
    e.classList.remove("active");
  }); 
  
  // Re-add .active to current page
  document.querySelectorAll(".search-pagination a[data-page]").forEach(function (e) {
    if (parseInt(e.getAttribute('data-page')) == page) {
      e.classList.add('active');
    }
  });
}; 

//  
// Event Listeners
//
pagination.addEventListener('click', function (e) {
  e.preventDefault();
  var target = e.target;
  if (!target.hasAttribute('data-page')) return;
  var pageNumber = parseInt(e.target.getAttribute('data-page'));
  initPage(pageNumber);
});
searchPagination.addEventListener('click', function (e) {
  e.preventDefault();
  var target = e.target;
  if (!target.hasAttribute('data-page')) return;
  var pageNumber = parseInt(e.target.getAttribute('data-page'));
  addListOfStudentsToPage(searchArray[pageNumber - 1]);
  setSearchPaginationBarPage(pageNumber);
});
searchInput.addEventListener('keyup', function (e) {
  var value = e.target.value.trim();

  if (value == "") {
    initPage();
  } else {
    initSearch(value);
  }
});
initApp();
initPagination();
initPaginationBar();