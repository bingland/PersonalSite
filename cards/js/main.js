import { images } from './images.js'

let objects = []
let outputArea = document.querySelector(".output")
var card = document.querySelector('.card')

card.addEventListener( 'click', function() {
  card.classList.toggle('is-flipped')
});

fetch('https://ghibliapi.herokuapp.com/people', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach((element, index) => {
            console.log(element)
            var output = document.createElement('div')
            output.className = 'person'

            //create element
            output.innerHTML = `
                <img src="${images[index]}">
                <p class="personName">${element.name}</p>
                <p class="personGender">${element.gender}</p>
                <p class="personAge">${element.age}</p>
            `

            objects.push(output)
        });

        objects.forEach(element => {
            outputArea.appendChild(element)
        })

    })
    .catch(error => console.log(error))

