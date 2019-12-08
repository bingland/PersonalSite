const url = "https://api.spacexdata.com/v3/"
const app = document.querySelector('.app')

console.log('running....')

function Card (flight_number, mission_name, details, rocket, launch_date_unix, links, video_link, launch_success) {
    this.flight_number = flight_number
    this.mission_name = mission_name
    this.details = details
    this.rocket = rocket
    this.launch_date_unix = launch_date_unix
    this.links = links
    this.video_link = video_link
    this.launch_success = launch_success
}

let cards = []

const getData = () => {
    fetch(url + 'launches/past')
    .then((res) => res.json())
    .then((data) => {
        /*
        console.log(data)
        console.log(data[1].mission_name)
        console.log(data[1].details)
        console.log(data[1].rocket)
        console.log(data[1].rocket.rocket_name)
        console.log(data[1].launch_date_unix)
        console.log(data[1].links)
        console.log(data[1].links.video_link)
        console.log(data[1].launch_success)
        */

        data.forEach((element) => {
            cards.push(new Card(element.flight_number, element.mission_name, element.details, element.rocket, element.launch_date_unix, element.links, element.links.video_link, element.launch_success))
        })

        update()

    })
    .catch((error) => console.log(error))
}

const update = () => {
    const output = convertToHtml(cards)
    app.innerHTML = output
    addAnimation()
}

const convertToHtml = (obj) => {
    // flight_number, mission_name, details, rocket, launch_date_unix, links, video_link, launch_success
    let temp = ''

    // convert from unix timecode to english
    let dates = obj.map(element => {
        let unixDate = new Date(element.launch_date_unix * 1000)
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let year = unixDate.getFullYear()
        let month = months[unixDate.getMonth()]
        let date = unixDate.getDate()
        let hour = unixDate.getHours()
        let min = unixDate.getMinutes()
        let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min
        return time
    })
    
    //modify links to work in the iframe
    let links = obj.map(element => {
        let url = element.links.video_link.replace("watch?v=", "embed/")
        return url
    })

    //modify launch success values
    let successes = obj.map(element => {
        if (element.launch_success) {
            return 'Successful Launch'
        } else {
            return 'Failed Launch'
        }
    })

    //main loop
    for (let i = 0; i < obj.length; i++) {
        temp += `
        <div class="scene">
            <div class="card">
                <div class="card__face card__face--front">
                    <h1>${obj[i].mission_name}</h1>
                    <h2>${obj[i].rocket.rocket_name}</h2>
                    <h2>${dates[i]}</h2>
                    <h2>Flight Number: ${obj[i].flight_number}</h2>
                    <p>${obj[i].details}</p>
                    <h3>${successes[i]}</h3>
                </div>
                <div class="card__face card__face--back">
                    <h1>Video Link</h1>
                    <iframe src="${links[i]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
            </div>
        </div>
        `
    }

    return temp
}

const addAnimation = () => {
    let htmlCollection = document.getElementsByClassName('card')
    let myCards = [...htmlCollection]
    myCards.forEach((element) => {
        element.addEventListener('click', function() {
            console.log('hello')
            element.classList.toggle('is-flipped');
        })
    })
}

getData()