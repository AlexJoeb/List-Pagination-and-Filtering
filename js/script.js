// "use strict";

// /******************************************
// Treehouse Techdegree:
// FSJS project 2 - List Filter and Pagination
// ******************************************/
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
// var $students = document.querySelectorAll('.student-item');
// var $list = document.querySelector('.student-list');
// var $pagination = document.querySelector(`.pagination`);
// var $input = document.querySelector('.student-search input');

// var studentArray = [];
// var searchList = [];
// var currentPage = 1;
// var numOfPagesNeeded = 0;

// /*** 
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

// var getStudentArrayByPage = function getStudentArrayByPage(page) {
//     if (page <= 0 || page > numOfPagesNeeded) return null;
//     return studentArray[page - 1];
// };

// var hideAllStudents = function hideAllStudents() {
//    document.querySelectorAll(`.student-item`).forEach((item) => {
//       item.style.display = 'none';
//    });
// };

// var showList = function showList(list) {
//    for(let i = 0; i < list.length; i++){
//       $list.appendChild(objToLi(list[i]));
//    }
// }
// var showSearchList = function showList(list) {
//    for(let i = 0; i < list.length; i++){
//       $list.appendChild(list[i]);
//    }
// }

// var showPage = function showPage(page) {
//    hideAllStudents();
//    var list = getStudentArrayByPage(page);
//     showList(list);
//     currentPage = page;
//     document.querySelectorAll(`.pagination a`).forEach(e => {
//        e.removeClass(`active`);
//     });
//    //  document.querySelector(`.pagination a[data-page='${page}']`).addClass('active');
// };

// /*** 
//    Create the `appendPageLinks function` to generate, append, and add 
//    functionality to the pagination buttons.
// ***/

// document.addEventListener("DOMContentLoaded", function() {
//     initPages();
//     hideAllStudents();
//     showPage(1);
// }); 

// $pagination.addEventListener('click', (e) => {
//    e.preventDefault();

//    var p = parseInt(e.target.innerText);

//    showPage(p);
// });

// $input.addEventListener('keyup', (e) => {
//    var text = e.target.value;

//    if(text == ''){
//       // Return to Page View
//       showPage(currentPage);
//    }else{
      
//    }
// });

// const searchTerm = term => {
//    $pagination.style.visibility  = "hidden";
//    hideAllStudents();
//    searchList = $students.filter(person => {
//       var p = liToObject($students[person]);

//       return p.name.includes(term) || p.email.split('@')[0].includes(term) || p.joinDate.split(' ')[1].includes(term);
//    });

//    showSearchList(searchList);
// }








// // Remember to delete the comments that came with this file, and replace them with your own code comments.
