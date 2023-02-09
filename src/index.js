
document.addEventListener("DOMContentLoaded", () => {

const dogBar = document.querySelector('div#dog-bar')
const dogInfo = document.getElementById('dog-info')

fetch("http://localhost:3000/pups")
.then(resp => resp.json())
.then(arrayOfObjects => {
    arrayOfObjects.forEach(renderPup)
})

function renderPup(pupObject) {
   const pupCard = document.createElement('span'); 
    pupCard.innerText = pupObject.name
    dogBar.append(pupCard);
    
    pupCard.addEventListener('click', () => {
        
        const pupImg = document.createElement('img');
        pupImg.src = pupObject.image
        const pupH2 = document.createElement('h2');
        pupH2.innerText = pupObject.name;
        const pupButton = document.createElement('button');
    
        if (pupObject.isGoodDog === "true" ) {
            pupButton.textContent = "Good Dog!"
        }
        
        else {
            pupButton.textContent = "Bad Dog!"
        }

        pupButton.addEventListener('click', () => {
            if (pupButton.textContent === "Good Dog!") {
                pupButton.textContent = "Bad Dog!"
                pupObject.isGoodDog = false
            }
            
            else {
                pupButton.textContent = "Good Dog!"
                pupObject.isGoodDog = true
            }

            fetch(`http://localhost:3000/pups/${pupObject.id}`, {
                method: "PATCH",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({isGoodDog: pupObject.isGoodDog})
            })
        })

        dogInfo.append(pupImg, pupH2, pupButton)

    })



}



})

/////////////////STEP 3/////////////////////

