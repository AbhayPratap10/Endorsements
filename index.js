// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://axial-edition-371811-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementListInDB = ref(database,"endorsementList")


const inputEndorsementEl = document.getElementById("input-Endorsement-el")
const btnEl = document.getElementById("btn-el")
const endorsementListEl = document.getElementById("endorsements-list")


//Handle real time updates from firebase
onValue(endorsementListInDB,function(snapshot){
    if(snapshot.exists()){
        let endorsementArray = Object.entries(snapshot.val())

        clearEndorsementListEl()
     
         for(let i=0 ; i < endorsementArray.length ; i++ ){
             let currentEndorsement = endorsementArray[i]
             displayEndorsements(currentEndorsement)
         }
    }else{
        endorsementListEl.innerHTML = "<p>No Endorsement here.. yet<p>"
    }

})

//publish button
btnEl.addEventListener("click", function(){
    let inputvalue = inputEndorsementEl.value
    if(inputvalue === ''){
        return 
    }else{
    push(endorsementListInDB, inputvalue)
    clearInputField()
    }
 
  
})

//function to display endorsements 
function displayEndorsements(endorsement){
    let endorsementId = endorsement[0]
    let endorsementValue = endorsement[1]

    let newEl= document.createElement("li")
    newEl.textContent = endorsementValue

    endorsementListEl.append(newEl)

    newEl.addEventListener("dblclick", function(){
        let exactLocationOfEndorsementInDb = ref(database, `endorsementList/${endorsementId}`)
        remove(exactLocationOfEndorsementInDb)
    })

}



//function to clear the input field
function clearInputField(){
    inputEndorsementEl.value=""
}

//function to clear the list of endorsements
function clearEndorsementListEl(){
    endorsementListEl.innerHTML = ""
}

