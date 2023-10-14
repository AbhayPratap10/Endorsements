// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://axial-edition-371811-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database,"endorsementList")



const endorsementInputFieldEl = document.getElementById("endorsement-field")
const fromInputFieldEl = document.getElementById("from-el")
const toInputFieldEl = document.getElementById("to-el")
const btnEl = document.getElementById("btn")
const endorsementListEl = document.getElementById("endorsement-list")
 


btnEl.addEventListener("click",function(){
   let inputValue=endorsementInputFieldEl.value
   push( endorsementListInDB, inputValue)
   endorsementListEl.innerHTML+=`<li>${inputValue}</li>`
})

endorsementListEl.addEventListener("click", function(){
    clearField()
})
function clearField(){
    endorsementListEl.innerHTML=""
}