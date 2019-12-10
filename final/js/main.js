const url = "https://api.spacexdata.com/v3/"
const app = document.querySelector('.app')

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

// global variables
let cards = []
let links = []
let descriptions = []
let successes = []
let dates = []

// initiate API search
const getData = () => {
    fetch(url + 'launches/past')
    .then((res) => res.json())
    .then((data) => {

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
    styleElements()
}

const convertToHtml = (obj) => {
    // flight_number, mission_name, details, rocket, launch_date_unix, links, video_link, launch_success
    let temp = ''

    // convert from unix timecode to english
    dates = obj.map(element => {
        let unixDate = new Date(element.launch_date_unix * 1000)
        let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
        let year = unixDate.getFullYear()
        let month = months[unixDate.getMonth()]
        let date = unixDate.getDate()
        let hour = unixDate.getHours()
        let min = unixDate.getMinutes()
        let time = date + ' ' + month + ' ' + year
        return time
    })
    
    //modify links to work in the iframe
    links = obj.map(element => {
        let url;
        if (element.links.video_link.includes('youtube.com')) {
            url = element.links.video_link.replace("watch?v=", "embed/")
        } else if (element.links.video_link.includes('youtu.be')) {
            url = element.links.video_link.replace('youtu.be/', 'youtube.com/embed/')
        }
        

        return url
    })

    //modify launch success values
    successes = obj.map(element => {
        if (element.launch_success) {
            return 'Successful Launch'
        } else {
            return 'Failed Launch'
        }
    })

    //catch null values 
    descriptions = obj.map(element => {
        if (element.details == null) {
            return "No description of this launch available."
        }
        return element.details
    })

    //main loop
    for (let i = 0; i < obj.length; i++) {
        temp += `
        <div class="scene">
            <div class="card">
                <div class="card__face card__face--front">
                    <h1>${obj[i].mission_name}</h1>
                    <p class="desc">${descriptions[i]}</p>
                    <h3>Flight Number: ${obj[i].flight_number}<br/>${successes[i]}</h3>
                    <h2>${obj[i].rocket.rocket_name} &bull; ${dates[i]}</h2>
                </div>
                <div class="card__face card__face--back">
                    <h1>Video</h1>
                    <div class="iframe">Loading video...</div>
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

    //for inserting iframes
    let htmlCollection2 = document.getElementsByClassName('iframe')
    let iframePlaces = [...htmlCollection2]

    //add card flip animation
    myCards.forEach((element, index) => {
        element.addEventListener('click', function() {
            element.classList.toggle('is-flipped');
            
            //insert iframes
            setTimeout(() => {
                if(!iframePlaces[index].innerHTML.includes('iframe')) {
                    iframePlaces[index].innerHTML = `<iframe src="${links[index]}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                }
            }, 1000)
        })
    })
}

const styleElements = () => {
    let htmlCollection = document.getElementsByClassName('desc')
    let curDesc = [...htmlCollection]
    curDesc.forEach((element) => {
        if(element.innerHTML.length > 150) {
            element.style = "font-size: 14px;"
        } 
        if(element.innerHTML.length > 300) {
            element.style = "font-size: 13px;"
        } 
        if(element.innerHTML.length > 350) {
            element.style = "font-size: 12px;"
        }
        if(element.innerHTML.length > 400) {
            element.style = "font-size: 11px;"
        }
        if(element.innerHTML.length > 500) {
            element.style = "font-size: 10px;"
        }
        if(element.innerHTML.length > 550) {
            element.style = "font-size: 8px;"
        }
    })
}

//init application
getData()