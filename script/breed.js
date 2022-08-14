"use strict";
//declaring variables
const inputType = document.getElementById("input-type");
const inputBreed = document.getElementById("input-breed");
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const breedArr = getFromStorage("breedArr") ?? [];
let submitOk;

//sidebar effect
sidebar.addEventListener("click", function (e) {
  //excluding if click to links (icons and texts have href attr)
  !e.target.hasAttribute("href") &&
    e.target.parentNode.nodeName !== "A" &&
    sidebar.classList.toggle("active");
});

//load existing data
if (breedArr.length > 0) {
  renderBreedTable(breedArr);
}

//Check breed
function checkBreed() {
  if (inputBreed.value === "") {
    alert("Please choose for Breed");
    return (submitOk = false);
  }
}
//Check Type
function checkType() {
  if (inputType.value === "Select Type") {
    alert("Please choose for Type");
    return (submitOk = false);
  }
}

//function to render breed in table
function renderBreedTable(breedArr) {
  //delete previous row(s)s's content
  tableBodyEl.innerHTML = "";
  //add row for each breed recorded in breedArr
  breedArr.forEach(function (arr, i) {
    const row = document.createElement("tr");
    row.innerHTML =
      //<HTML code>
      `<th scope="row">${i + 1}</th>
  <td>${arr.name}</td>
  <td>${arr.type}</td>
  <td><button type="button" class="btn btn-danger" id="${i}">Delete</button></td>`;
    tableBodyEl.appendChild(row);
  });
}

//event on submit button
submitBtn.addEventListener("click", function () {
  const data = {
    name: inputBreed.value,
    type: inputType.value,
  };
  //validate 2 input fields
  submitOk = true;
  checkBreed();
  checkType();
  //if validated Ok
  if (submitOk) {
    breedArr.push(data);
    //update local storage and display table
    saveToStorage("breedArr", breedArr);
    renderBreedTable(breedArr);
    //reset previous input values
    inputBreed.value = "";
    inputType.value = "Select Type";
  }
});

//function to detelte breed
function deleteItem(e) {
  //get whole row element containing delete button that user clicked
  const targetRowDelete = e.target.closest("tr");
  //if only user click on Delete button, appear a message to confirm
  if (e.target.classList.contains("btn-danger")) {
    const del = confirm("Are you sure?");
    if (del) {
      const index = +targetRowDelete.getElementsByTagName("button")[0].id;
      breedArr.splice(index, 1);
      //update local storage and display table
      saveToStorage("breedArr", breedArr);
      renderBreedTable(breedArr);
    }
  }
}
//event on delete button
tableBodyEl.addEventListener("click", deleteItem);
