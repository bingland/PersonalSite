const url = "https://api.spacexdata.com/v3/"
const app = document.querySelector('.app')

console.log('running....')

function Card (mission_name, details, rocket, launch_date_unix, links, video_link, launch_success) {
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
        console.log(data[1].launch_date_unix)
        console.log(data[1].links)
        console.log(data[1].links.video_link)
        console.log(data[1].launch_success)

        data.forEach((element) => {
            cards.push(new Card(element.mission_name, element.details, element.rocket, element.launch_date_unix, element.links, element.links.video_link, element.launch_success))
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
}

const convertToHtml = (obj) => {
    let temp = 
    "<div class='card'>Sup</div>";

    return temp
}

getData()