let objects = []
let images = {
    "ashitaka": "https://vignette.wikia.nocookie.net/disney/images/4/49/Ashitaka.jpg/revision/latest?cb=20140421213740"
}
let outputArea = document.querySelector(".output")

fetch('https://ghibliapi.herokuapp.com/people', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            var output = document.createElement('div')
            output.className = 'person'

            //create element
            output.innerHTML = `
                <img src="${images.ashitaka}">
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

