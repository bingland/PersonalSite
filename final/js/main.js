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
        console.log(data)
        console.log(data[1].mission_name)
        console.log(data[1].details)
        console.log(data[1].rocket)
        console.log(data[1].rocket.rocket_name)
        console.log(data[1].launch_date_unix)
        console.log(data[1].links)
        console.log(data[1].links.video_link)
        console.log(data[1].launch_success)

        data.forEach((element) => {
            cards.push(new Card(element.flight_number, element.mission_name, element.details, element.rocket, element.launch_date_unix, element.links, element.links.video_link, element.launch_success))
        });

        console.log(cards)
        update()

    })
    .catch((error) => console.log(error))
}

const update = () => {
    const output = convertToHtml(cards)
    console.log(output)
    app.innerHTML = output
    addAnimation()
}

const convertToHtml = (obj) => {
    // flight_number, mission_name, details, rocket, launch_date_unix, links, video_link, launch_success
    let temp = `
    <div class="scene">
        <div class="card">
            <div class="card__face card__face--front">
                <h1>${obj[0].mission_name}</h1>
                <h2>${obj[0].rocket.rocket_name}</h2>
                <h2>${obj[0].launch_date_unix}</h2>
                <h2>Flight Number: ${obj[0].flight_number}</h2>
                <p>${obj[1].details}</p>
                <h3>Launch success: ${obj[0].launch_success}</h3>
            </div>
            <div class="card__face card__face--back">
                <h1>Video Link</h1>
                <iframe width="100%" height="100%" src="${obj[0].video_link}&output=embed" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </div>
    </div>
    `;

    return temp
}

const addAnimation = () => {
    let card = document.querySelector('.card');
    console.log(card)
    card.addEventListener('click', function() {
        card.classList.toggle('is-flipped');
    })
}

getData()