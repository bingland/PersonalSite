const hamburger = document.getElementById('hamburger')
const popupBar = document.querySelector('.popupBar')

let buttonsGet = document.getElementsByClassName('popupButton')
const buttons = [...buttonsGet]



const toggleBar = () => {
    if (popupBar.style.display == 'block') {
        popupBar.style.display = 'none'
    } else {
        popupBar.style.display = 'block'
    }

    
}
hamburger.onclick = toggleBar

window.addEventListener('resize', function () {
    if (window.innerWidth > 900) {
        popupBar.style.display = 'none'
    } else if (window.innerWidth >= 650) {
        popupBar.style.display = 'block'
    } else if (window.innerWidth < 650) {
        popupBar.style.display = 'none'
    }
})

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        popupBar.style.display = 'none'
    })
}