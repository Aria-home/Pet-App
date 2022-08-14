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
const findBtn = document.getElementById("find-btn");
//load petArr data from local storage if any
const petArr = getFromStorage("petArr") ?? [];
//Array to store breed type
const breedArr = getFromStorage("breedArr") ?? [];

//sidebar effect
sidebar.addEventListener("click", function (e) {
  //excluding if click to links (icons and texts have href attr)
  !e.target.hasAttribute("href") &&
    e.target.parentNode.nodeName !== "A" &&
    sidebar.classList.toggle("active");
});

//Display all breed option
breedArr.forEach(function (arr) {
  const option = document.createElement("option");
  option.innerHTML = arr.name;
  breedInput.appendChild(option);
});

//Declaring a function to display pet on table
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
  <td>${checkArr[i].date}</td>`;
    tableBodyEl.appendChild(row);
  }
}
//Display all pet on page
renderTableData(petArr);

//event find button
findBtn.addEventListener("click", function () {
  const filteredPet = petArr.filter((arr) => {
    return (
      (!idInput.value || arr.id.includes(`${idInput.value}`)) &&
      (!nameInput.value || arr.name.includes(`${nameInput.value}`)) &&
      (typeInput.value === "Select Type" ||
        arr.type.includes(`${typeInput.value}`)) &&
      (breedInput.value === "Select Breed" ||
        arr.breed.includes(`${breedInput.value}`)) &&
      arr.vaccinated === vaccinatedInput.checked &&
      arr.dewormed === dewormedInput.checked &&
      arr.sterilized === sterilizedInput.checked
    );
  });
  renderTableData(filteredPet);
  console.log("filtered");
});
