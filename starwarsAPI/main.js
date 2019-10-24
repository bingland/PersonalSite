import { planets } from './assets/planets.js'

// my objects
const outArea = document.querySelector('.content')
const submitButton = document.querySelector('#submitButton')

//form values
var searchTerm, populationFrom, populationTo, climate, climateInit, orbitalPeriodFrom, orbitalPeriodTo, gravityFrom, gravityTo, rotationFrom, rotationTo, surfaceWaterFrom, surfaceWaterTo

submitButton.addEventListener('click', (e) => {
    e.preventDefault()

    // get form values
    searchTerm = document.querySelector('#mainSearch').value.toLowerCase()
    populationFrom = document.querySelector('#populationFrom').value.toLowerCase()
    populationTo = document.querySelector('#populationTo').value.toLowerCase()
    climateInit = document.querySelector('#climates')
    climate = climateInit.options[climateInit.selectedIndex].value.toLowerCase()
    orbitalPeriodFrom = document.querySelector('#orbitalPeriodFrom').value.toLowerCase()
    orbitalPeriodTo = document.querySelector('#orbitalPeriodTo').value.toLowerCase()
    gravityFrom = document.querySelector('#gravityFrom').value.toLowerCase()
    gravityTo = document.querySelector('#gravityTo').value.toLowerCase()
    rotationFrom = document.querySelector('#rotationFrom').value.toLowerCase()
    rotationTo = document.querySelector('#rotationTo').value.toLowerCase()
    surfaceWaterFrom = document.querySelector('#surfaceWaterFrom').value.toLowerCase()
    surfaceWaterTo = document.querySelector('#surfaceWaterTo').value.toLowerCase()
    init()
})

// create array of HTML nodes via the filtered array
var cards = []
function init () {
    outArea.innerHTML = ''
    planets.forEach( (planet, i) => {
        cards[i] = document.createElement('div')
        cards[i].className = 'infoCard'
        cards[i].innerHTML = `<h1 class='planetHeader'>${planet.name}</h1>
        <h2 class='planetText'>Population: ${planet.population}</h2>
        <h2 class='planetText'>Climate: ${planet.climate}</h2>
        <h2 class='planetText'>Orbital Period: ${planet.orbital_period}</h2>
        <h2 class='planetText'>Gravity: ${planet.gravity}</h2>
        <h2 class='planetText'>Rotation Period: ${planet.rotation_period}</h2>
        <h2 class='planetText'>Surface Water: ${planet.surface_water}</h2>`
    })

    ///remove planets based on users parameters
    //name
    if (searchTerm != undefined) {
        if(searchTerm !== ''){
            cards = cards.filter((card, index) => {
                var lowerName = planets[index].name.toLowerCase()
                if (lowerName.includes(searchTerm)) {
                    return true 
                } else { return false }
            })
        }
    }
    //population
    if (populationFrom != undefined && populationTo != undefined) {
        if(populationFrom != '' && populationTo != ''){
            cards = cards.filter((card, index) => {
                if ((Number(planets[index].population) >= Number(populationFrom)) && (Number(planets[index].population) <= Number(populationTo))) {
                    return true
                } else { return false }
            })
        }
    }
    //climate
    if (climate != undefined) {
        if (climate !== '') {
            cards = cards.filter((card, index) => {
                console.log(planets[index].climate)
                if (planets[index].climate.toLowerCase().includes(climate)) {
                    return true
                } else {
                    return false
                }
            })
        }
    }
        
    //orbital period
    if (orbitalPeriodFrom != undefined && orbitalPeriodTo != undefined) {
        if(orbitalPeriodFrom != '' && orbitalPeriodTo != ''){
            cards = cards.filter((card, index) => {
                if ((Number(planets[index].orbital_period) >= Number(orbitalPeriodFrom)) && (Number(planets[index].orbital_period) <= Number(orbitalPeriodTo))) {
                    return true
                } else { return false }
            })
        }
    }
    //gravity
    if (gravityFrom != undefined && gravityTo != undefined) {
        if(gravityFrom != '' && gravityTo != ''){
            cards = cards.filter((card, index) => {
                if ((Number(planets[index].gravity) >= Number(gravityFrom)) && (Number(planets[index].gravity) <= Number(gravityTo))) {
                    return true
                } else { return false }
            })
        }
    }
    //rotation period
    if (rotationFrom != undefined && rotationTo != undefined) {
        if(rotationFrom != '' && rotationTo != ''){
            cards = cards.filter((card, index) => {
                if ((Number(planets[index].rotation_period) >= Number(rotationFrom)) && (Number(planets[index].rotation_period) <= Number(rotationTo))) {
                    return true
                } else { return false }
            })
        }
    }
    //surface water
    if (surfaceWaterFrom != undefined && surfaceWaterTo != undefined) {
        if(surfaceWaterFrom != '' && surfaceWaterTo != ''){
            cards = cards.filter((card, index) => {
                if ((Number(planets[index].surface_water) >= Number(surfaceWaterFrom)) && (Number(planets[index].surface_water) <= Number(surfaceWaterTo))) {
                    return true
                } else { return false }
            })
        }
    }
    // output cards array to outArea
    for (var i in cards) {
        outArea.appendChild(cards[i])
    }
    // display a "no results found" message when nothing shows up
}

init()