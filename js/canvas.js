import { randomIntFromRange, randomColor, distance, rotate, resolveCollision } from './utils.js'

const canvasContainer = document.querySelector('.canvasDiv')
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

let balls = 100
adjustBalls()
adjustHeight()

const mouse = {
    x: innerWidth / 2,
    y: innerHeight / 2
}

const color = 'white'

// Event Listeners
addEventListener('mousemove', event => {
    mouse.x = event.clientX
    mouse.y = event.clientY
})

addEventListener('resize', () => {
    canvas.width = innerWidth
    canvas.height = innerHeight

    adjustBalls()
    adjustHeight()

    init()
})

function adjustBalls(factor) {
    balls = canvas.width / 10
}
function adjustHeight() {
    if (innerWidth < 650) {
        console.log(canvasContainer.offsetHeight)
        //canvasContainer.style.height = '50%'
        canvas.height = innerHeight/3
        balls = canvas.width / 20
    } else {
        //canvasContainer.style.height = '100%'
        canvas.height = innerHeight
    }
}

// Particles
function Particle(x, y, radius, color) {
    this.x = x
    this.y = y
    this.velocity = {
        x: (Math.random() - 0.5) * 2,
        y: (Math.random() - 0.5) * 2
    }
    this.radius = radius
    this.color = color
    this.opacity = 1


    this.draw = function() {
        c.beginPath()
        c.save()
        c.globalAlpha = this.opacity
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.restore()
        c.closePath()
    }

    this.update = particles => {
        // velocity / border collision
        if(this.x - radius < 0 || this.x > canvas.width - radius) {
            this.velocity.x = -this.velocity.x
        }
        if(this.y - radius < 0 || this.y > canvas.height - radius) {
            this.velocity.y = -this.velocity.y
        }
        this.x += this.velocity.x
        this.y += this.velocity.y

        //draw lines on points within radius
        for(let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue
            if (distance(this.x, this.y, particles[i].x, particles[i].y) < 100) {
                c.save()
                c.globalAlpha = this.opacity
                c.beginPath()
                c.moveTo(this.x, this.y)
                c.lineTo(particles[i].x, particles[i].y)
                c.strokeStyle = color;
                c.stroke()
                c.restore()
            }
        }
        this.draw()
    }
    
}

// Implementation
let particles
function init() {
    particles = []

    for (let i = 0; i < balls; i++) {
        const radius = 4.5
        let x = randomIntFromRange(radius, canvas.width - radius)
        let y = randomIntFromRange(radius, canvas.height - radius)

        particles.push(new Particle(x, y, radius, color))
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    //c.fillStyle = '#9CE4FF'
    //c.fillRect(0,0,canvas.width,canvas.height)

    particles.forEach(object => {
     object.update(particles)
    })
}

init()
animate()