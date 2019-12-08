import { images } from './images.js'
import { configImg } from './configImg.js'

let objects = []
let outputArea = document.querySelector(".output")
let outputAmount = 25

var addButton = document.createElement('div')
addButton.className = 'add'

//create element
addButton.innerHTML = `
    <div class="add">
        <div class="addCircle">Add</div>
    </div>
    `


fetch('https://ghibliapi.herokuapp.com/people', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        data.forEach((element, index) => {
            var output = document.createElement('div')
            output.className = 'person'

            //create element
            output.innerHTML = `
                <div class="scene">
                    <div class="card">
                        <div class="card__face card__face--front">
                            <img src="${images[index]}">
                        </div>
                        <div class="card__face card__face--back">
                            <p class="personName">${element.name}</p>
                            <p class="personGender">${element.gender}</p>
                            <p class="personAge">Age: ${element.age}</p>
                        </div>
                    </div>
                </div>
            `

            objects.push(output)
        });

        //config img
        configImg() // doesnt work yet

        //output to html page
        //convert to a set amount with a for loop
        for(let i = 0; i < outputAmount; i++){
            outputArea.appendChild(objects[i])
        }
        //add the add button
        outputArea.appendChild(addButton)
        
        addTheAdd()

        //add animation listeners
        let cards = document.getElementsByClassName("card")
        for (let i in cards) {
            cards[i].addEventListener( 'click', function() {
                cards[i].classList.toggle('is-flipped')
            })
        }
        

    })
    .catch(error => console.log(error))

const addTheAdd = () => {
    if (document.querySelector(".add") == 0) {
        outputArea.appendChild(addButton)
        console.log('hi?')
    }

    //add event listener
    let button = document.querySelector('.add')
    console.log(button)

    button.addEventListener('click', function(){
        

        outputArea.appendChild(button)
        // add a card
        // get the amount of cards and update it
        let cards = document.getElementsByClassName("card")
        outputArea.appendChild(objects[cards.length])
        console.log(cards.length)
        
        let newbutton = document.querySelector('.add')
        newbutton.parentNode.removeChild(newbutton)
        addTheAdd()
    })

}
