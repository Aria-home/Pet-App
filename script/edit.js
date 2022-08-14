"use strict";
//declaring variables to get element
const submitBtn = document.getElementById("submit-btn");
const tableBodyEl = document.getElementById("tbody");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
//load petArr data from local storage if any
const petArr = getFromStorage("petArr") ?? [];
//Array to store breed type
const breedArr = getFromStorage("breedArr") ?? [];
//variable to save id of editing pet
let petId;
//variable to save index of editing pet in petArr
let objectIndex;
//variable check condition can submit form
let submitOk;
//Declaring an object with keys are required fields when input form
const validateInitData = {
  name: "",
  age: "",
  type: "Select Type",
  weight: "",
  length: "",
  breed: "Select Breed",
};

//sidebar effect
sidebar.addEventListener("click", function (e) {
  //excluding if click to links (icons and texts have href attr)
  !e.target.hasAttribute("href") &&
    e.target.parentNode.nodeName !== "A" &&
    sidebar.classList.toggle("active");
});

//Reset to initial value when click submit button
function init() {
  idInput.placeholder = "Input ID";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

//function to reset breed list
function resetBreedList() {
  //delete previous showed option
  breedInput.innerHTML = "";
  const initOption = document.createElement("option");
  initOption.innerHTML = "Select Breed";
  breedInput.appendChild(initOption);
}

//Declaring a function to display pet on table with parameter checkArr
function renderTableData(checkArr) {
  //delete table default rows's content
  tableBodyEl.innerHTML = "";
  for (let i in checkArr) {
    //add a row for each pet submitted successfully
    const row = document.createElement("tr");
    row.innerHTML =
      //<HTML code>
      `<th scope="row">${checkArr[i].id}</th>
  <td>${checkArr[i].name}</td>
  <td>${checkArr[i].age}</td>
  <td>${checkArr[i].type}</td>
  <td>${checkArr[i].weight} kg</td>
  <td>${checkArr[i].length} cm</td>
  <td>${checkArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${checkArr[i].color}"></i>
  </td>
  <td><i class="bi ${
    checkArr[i].vaccinated === true
      ? `bi-check-circle-fill`
      : `bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    checkArr[i].dewormed === true ? `bi-check-circle-fill` : `bi-x-circle-fill`
  }"></i></td>
  <td><i class="bi ${
    checkArr[i].sterilized === true
      ? `bi-check-circle-fill`
      : `bi-x-circle-fill`
  }"></i></td>
  <td>${checkArr[i].date}</td>
  <td>
    <button type="button" class="btn btn-warning">Edit</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}
//Display all pet on page
renderTableData(petArr);

//event click edit button
function startEditPet(e) {
  //get whole row element containing edit button that user clicked
  const targetRowEdit = e.target.closest("tr");
  //if only user click on edit button, display edit form
  if (e.target.classList.contains("btn-warning")) {
    document.getElementById("container-form").classList.remove("hide");
    //get id of pet
    petId = targetRowEdit.firstChild.innerText;
    //find index of the pet data in petArr
    objectIndex = petArr.findIndex((arr) => arr.id === petId);
    //assign editing pet array to a variable
    const edittingItem = petArr[objectIndex];
    //load data of editing pet to each field of the form
    idInput.placeholder = petId;
    nameInput.value = edittingItem.name;
    ageInput.value = edittingItem.age;
    typeInput.value = edittingItem.type;
    renderBreed();
    weightInput.value = edittingItem.weight;
    lengthInput.value = edittingItem.length;
    colorInput.value = edittingItem.color;
    breedInput.value = edittingItem.breed;
    vaccinatedInput.checked = edittingItem.vaccinated;
    dewormedInput.checked = edittingItem.dewormed;
    sterilizedInput.checked = edittingItem.sterilized;
  }
}
tableBodyEl.addEventListener("click", startEditPet);

//Function to display breed option
function renderBreed() {
  //delete previous showed option
  resetBreedList();
  //filter breed list match with type (cat or dog)
  const breedList = breedArr.filter(function (arr) {
    return arr.type === typeInput.value;
  });
  //render list option for choosen type (cat or dog)
  if (breedList.length > 0) {
    breedList.forEach(function (arr) {
      const option = document.createElement("option");
      option.innerHTML = arr.name;
      breedInput.appendChild(option);
    });
  }
}

//event onchange when select/change type
typeInput.addEventListener("change", renderBreed);
//.addEventListener("click", renderBreed);

//function to check required fields is ok to submit
//Check name
function checkName() {
  if (nameInput.value === "") {
    alert("Please input for Name");
    return (submitOk = false);
  }
}
//Check age
function checkAge() {
  const age = ageInput.value;
  if (age > 15 || age < 1) {
    alert("Age must be between 1 and 15!");
    return (submitOk = false);
  }
}
//Check Type
function checkType() {
  if (typeInput.value === "Select Type") {
    alert("Please choose for Type");
    return (submitOk = false);
  }
}
//Check weight
function checkWeight() {
  const weight = weightInput.value;
  if (weight > 15 || weight < 1) {
    alert("Weight must be between 1 and 15!");
    return (submitOk = false);
  }
}
//Check length
function checkLenght() {
  const length = lengthInput.value;
  if (length > 100 || length < 1) {
    alert("Length must be between 1 and 100!");
    return (submitOk = false);
  }
}

//Check breed
function checkBreed() {
  if (breedInput.value === "Select Breed" || breedInput.value === "") {
    alert("Please choose for Breed");
    return (submitOk = false);
  }
}

//Creating a function to validate form when user clicks submit button
function formValidation() {
  submitOk = true;
  //Check if required fields are inputted and valid through object keys
  for (let key in validateInitData) {
    if (key === "name") checkName();
    else if (key === "age") checkAge();
    else if (key === "type") checkType();
    else if (key === "weight") checkWeight();
    else if (key === "length") checkLenght();
    else if (key === "breed") checkBreed();
  }
}

//Event click submit button
submitBtn.addEventListener("click", function () {
  //when user click submit, get value from inputted fields and store it to an object
  const edit = {
    id: petId, //display id of editing pet, cannot change
    name: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    breed: breedInput.value,
    color: colorInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    displaybmi: "?", //BMI may change, reset after edit
    healthyValue: false, //pet healthy value may change, reset after edit
    date: petArr[objectIndex].date, //date unchange
    //function to indicate pet is healthy store in pet data
    isHealthy: function () {
      const check = [this.vaccinated, this.dewormed, this.sterilized];
      for (let x in check) {
        if (check[x] === false) return false;
      }
      return true;
    },
  };
  //Call function to validate just inputted data
  formValidation();
  //If all fields OK
  if (submitOk) {
    if (edit.isHealthy()) edit.healthyValue = true;
    //replace data of edited pet in petarr
    petArr.splice(objectIndex, 1, edit);
    //display again all pet included edited pet
    renderTableData(petArr);
    //reset data inputted
    init();
    resetBreedList();
    //hide form
    document.getElementById("container-form").classList.add("hide");
    console.log("Updated array OK");
    //save updated pet to local storage
    saveToStorage("petArr", petArr);
  }
});
