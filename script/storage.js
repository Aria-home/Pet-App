"use strict";
//save to storage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//get from storage
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
