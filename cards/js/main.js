import { images } from './images.js'
import { configImg } from './configImg.js'

let objects = []
let outputArea = document.querySelector(".output")

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
        configImg()

        //output to html page
        objects.forEach(element => {
            outputArea.appendChild(element)
        })

        //add animation listeners
        let cards = document.getElementsByClassName("card")
        for (let i in cards) {
            cards[i].addEventListener( 'click', function() {
                cards[i].classList.toggle('is-flipped')
            })
        }

    })
    .catch(error => console.log(error))