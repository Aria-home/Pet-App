"use strict";
//declare variables
const expBtn = document.getElementById("export-btn");
const impBtn = document.getElementById("import-btn");
const inputFileEl = document.getElementById("input-file");
//Array to store date of all inputted pet + get data from Local storage
const petArr = JSON.parse(localStorage.getItem("petArr")) ?? [];
const breedArr = getFromStorage("breedArr") ?? [];
//variable check if file choosen or not
let inputFile;

//access input file
inputFileEl.addEventListener("change", () => {
  inputFile = inputFileEl.files[0];
});

//sidebar effect
sidebar.addEventListener("click", function (e) {
  //excluding if click to links (icons and texts have href attr)
  !e.target.hasAttribute("href") &&
    e.target.parentNode.nodeName !== "A" &&
    sidebar.classList.toggle("active");
});

//export file
function saveStaticDataToFile() {
  const blob = new Blob([JSON.stringify(petArr)], {
    type: "application/json",
  });
  saveAs(blob, "static.json");
}
expBtn.addEventListener("click", saveStaticDataToFile);

//import file
impBtn.addEventListener("click", function () {
  if (inputFile) {
    const reader = new FileReader();
    reader.readAsBinaryString(inputFile);
    reader.onload = function (evt) {
      //variable to store pet data from imported file
      const addArr = JSON.parse(evt.target.result);
      //variable to store breed list from imported file
      const addBreedArr = [];

      if (addArr.length > 0) {
        //get breed list arr from imported data
        addArr.forEach(function (arr) {
          const importBreed = {
            name: arr.breed,
            type: arr.type,
          };
          addBreedArr.push(importBreed);
          //merge data in petArr
          const index = petArr.findIndex((arr2) => arr2.id === arr.id);
          if (index === -1) petArr.push(arr);
          else petArr.splice(index, 1, arr);
        });

        //merge data in breedArr
        addBreedArr.forEach(function (arr) {
          const index = breedArr.findIndex(
            (arr2) => arr.name === arr2.name && arr.type === arr2.type
          );
          if (index === -1) breedArr.push(arr);
        });

        //save update to local storage
        saveToStorage("petArr", petArr);
        saveToStorage("breedArr", breedArr);
        alert("Imported successfully!");
      }
    };
    reader.onerror = function (evt) {
      console.log("error reading file");
    };
  } else alert("Please choose a file!");
});
