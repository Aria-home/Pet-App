"use strict";
//declaring variables to get element
const submitBtn = document.getElementById("submit-btn");
const healthyBtn = document.getElementById("healthy-btn");
const calcBMIBtn = document.getElementById("calcbmi-btn");
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
const sidebar = document.getElementById("sidebar");
//Array to store data of all pet
const petArr = getFromStorage("petArr") ?? [];
let petArrLength = petArr.length;
//Array to store breed type
const breedArr = getFromStorage("breedArr") ?? [];
//Creating a variabe to set condition to submit form
let submitOk;
//Condition to show healthy pet (Show all pet when healthyCheck variable is false)
let healthyCheck = false;

//render data to table if any
renderTableData(petArr);

//sidebar effect
sidebar.addEventListener("click", function (e) {
  //excluding if click to links (icons and texts have href attr)
  !e.target.hasAttribute("href") &&
    e.target.parentNode.nodeName !== "A" &&
    sidebar.classList.toggle("active");
});

//Declaring an object with keys are required fields when input form
const validateInitData = {
  id: "",
  name: "",
  age: "",
  type: "Select Type",
  weight: "",
  length: "",
  breed: "Select Breed",
};

//Check Id
function checkId() {
  if (idInput.value === "") {
    alert("Please input for Id");
    return (submitOk = false);
  } else {
    //Check if Id is unique
    for (let i = 0; i < petArrLength; i++) {
      if (idInput.value === petArr[i].id) {
        alert("ID must unique!");
        return (submitOk = false);
      }
    }
  }
}
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
  if (breedInput.value === "Select Breed") {
    alert("Please choose for Breed");
    return (submitOk = false);
  }
}

//Creating a function to validate form everytime user clicks submit button
function formValidation() {
  submitOk = true;
  //Check if required fields are inputted and valid through object keys
  for (let key in validateInitData) {
    if (key === "id") checkId();
    else if (key === "name") checkName();
    else if (key === "age") checkAge();
    else if (key === "type") checkType();
    else if (key === "weight") checkWeight();
    else if (key === "length") checkLenght();
    else if (key === "breed") checkBreed();
  }
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
  <td>${checkArr[i].displaybmi}</td>
  <td>${checkArr[i].date}</td>
  <td>
    <button type="button" class="btn btn-danger">Delete</button>
  </td>`;
    tableBodyEl.appendChild(row);
  }
}

//Reset to initial value when click submit button
function setInit() {
  colorInput.value = "#000000";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
  for (let key in validateInitData) {
    document.getElementById(`input-${key}`).value = validateInitData[key];
  }
}

//function to reset breed list
function resetBreedList() {
  //delete previous showed option
  breedInput.innerHTML = "";
  const initOption = document.createElement("option");
  initOption.innerHTML = "Select Breed";
  breedInput.appendChild(initOption);
}

//Currents time in format day/month/year
function now() {
  const fullDate = new Date();
  const d = fullDate.getDate();
  const m = fullDate.getMonth() + 1;
  const y = fullDate.getFullYear();
  const addDate = `${d}/${m}/${y}`;
  return addDate;
}

//Event click submit button
submitBtn.addEventListener("click", function () {
  //when user click submit, get value from inputted fields and store it to an object
  const data = {
    id: idInput.value,
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
    displaybmi: "?",
    healthyValue: false,
    date: now(),
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
    //add data of inputted pet to array
    if (data.isHealthy()) data.healthyValue = true;
    petArr.push(data);
    petArrLength = petArr.length;
    console.log(petArr);
    //display inputed pet
    if (healthyCheck === false) renderTableData(petArr);
    else {
      const healthyPetArr = petArr.filter((arr) => arr.healthyValue);
      renderTableData(healthyPetArr);
    }
    //reset data inputted
    setInit();
    console.log("push array OK");
    //save updated pet to local storage
    saveToStorage("petArr", petArr);
    //delete previous showed option
    resetBreedList();
  }
});

//Declaring a function to delete pet
function deletePet(e) {
  //get whole row element containing delete button that user clicked
  const targetRowDelete = e.target.closest("tr");
  //if only user click on Delete button, appear a message to confirm
  if (e.target.classList.contains("btn-danger")) {
    const del = confirm("Are you sure?");
    //user confirmed 'OK'
    if (del) {
      function deleteObjectInArr(checkArr) {
        //get target pet id from the row user want to delete
        const getRowId = targetRowDelete.firstChild.innerHTML;
        //find index of object contain the id in the checking array
        const objectIndex = checkArr.findIndex(
          (checkArr) => checkArr.id === getRowId
        );
        checkArr.splice(objectIndex, 1);
        //always return the current lenght of petArr
        petArrLength = petArr.length;
      }
      //delete data in pet array
      deleteObjectInArr(petArr);
      //remove the row from user display table
      targetRowDelete.remove();
      //Save change to Local storage
      saveToStorage("petArr", petArr);
    }
  }
}

//Event click delete button
tableBodyEl.addEventListener("click", deletePet);

//Declaring a function to show healthy pet
function showHealthyPet() {
  if (petArrLength === 0 || petArrLength === undefined)
    alert("No record for submitted pet data to check!");
  else {
    //Condition to show healthy pet on table
    if (healthyBtn.innerText === "Show Healthy Pet") {
      healthyCheck = true;
      //Change display text of button to revert show all pet
      healthyBtn.innerText = "Show All Pet";
      const healthyPetArr = petArr.filter((arr) => arr.healthyValue);
      renderTableData(healthyPetArr);
    } else {
      //Show All Pet if current is Show Healthy Pet
      healthyCheck = false;
      //revert button text content
      healthyBtn.innerText = "Show Healthy Pet";
      renderTableData(petArr);
    }
  }
}

//Event click show healthy pet button
healthyBtn.addEventListener("click", showHealthyPet);

//Calculate BMI function
function calcBMI(checkArr) {
  for (let i in checkArr) {
    checkArr[i].displaybmi = (
      (checkArr[i].weight * (checkArr[i].type === "Dog" ? 703 : 886)) /
      checkArr[i].length ** 2
    ).toFixed(2);
  }
}

//Event click calculate BMI button
calcBMIBtn.addEventListener("click", function () {
  //store each caculated pet BMI to data object on petArr
  calcBMI(petArr);
  for (let i in petArr) {
    tableBodyEl.children[i].children[11].innerText = petArr[i].displaybmi;
  }
  //Save change to Local storage
  saveToStorage("petArr", petArr);
});

//Function to display breed option
function renderBreed(breedList) {
  breedList.forEach(function (arr) {
    const option = document.createElement("option");
    option.innerHTML = arr.name;
    breedInput.appendChild(option);
  });
}

//event onchange when select/change type
typeInput.addEventListener("change", function () {
  resetBreedList();
  //filter breed list match with type (cat or dog)
  const breedList = breedArr.filter(function (arr) {
    return arr.type === typeInput.value;
  });
  //render list option for choosen type (cat or dog)
  if (breedList.length > 0) renderBreed(breedList);
});
