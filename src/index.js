//fetch pup data
const pupsUrl = 'http://localhost:3000/pups'
function getAllPups () {
    fetch(pupsUrl)
    .then(response => response.json())
    .then(data => data.forEach(pup => renderPupToDogBar(pup)))
    }

function getGoodPups () {
    fetch(pupsUrl)
    .then(response => response.json())
    .then(data => {
        const goodPups = data.filter(pup => pup.isGoodDog === true)
        goodPups.forEach(pup => renderPupToDogBar(pup))
    })
}

document.addEventListener("DOMContentLoaded", () => {
        getAllPups()
        filterGoodDogs()
})

//create span with pup's name inside of the dog-bar
function renderPupToDogBar(pupObj) {
    const span = document.createElement('span')
    span.id = pupObj.id
    span.innerText = pupObj.name
    const dogBar = document.querySelector('#dog-bar')
    dogBar.appendChild(span)
    const thisSpan = document.getElementById(pupObj.id)

    thisSpan.addEventListener('click', (event) => {
        const id = event.target.id
        const img = document.createElement('img')
        const h2 = document.createElement('h2')
        const button = document.createElement('button')
        const div = document.querySelector('#dog-info')
        div.innerHTML = ''

        img.src = pupObj.image
        h2.innerText = pupObj.name
        dogButton(pupObj, button, id)
        div.appendChild(img)
        div.appendChild(h2)
        div.appendChild(button)
        
    })
}

function dogButton (obj, button, id) {
    if (obj.isGoodDog === true) {
        button.innerText = 'Good Dog!'
    }else{
        button.innerText = 'Bad Dog!'
    }
    button.addEventListener('click', event => {
        
        if (event.target.innerText === "Bad Dog!") {
            event.target.innerText = 'Good Dog!'
            //patch
            pupObjUpdate = {isGoodDog: true}
            fetch(pupsUrl + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (pupObjUpdate)
        })
        .then(res => res.json())
        .then(pup => console.log(pup))
        }else if (event.target.innerText === "Good Dog!"){
            event.target.innerText = 'Bad Dog!'
            //patch
            pupObjUpdate = {isGoodDog: false}
            fetch(pupsUrl + '/' + id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify (pupObjUpdate)
        })
        .then(res => res.json())
        .then(pup => console.log(pup))
        }
    })
}

function filterGoodDogs() {
    filterBtn = document.getElementById('good-dog-filter')
    filterBtn.addEventListener('click', event => {
        document.querySelector('#dog-bar').innerHTML = ''
        document.querySelector('#dog-info').innerHTML = ''
        if( event.target.innerText === 'Filter good dogs: OFF') {
            event.target.innerText = 'Filter good dogs: ON'
            getGoodPups()
        }else if (event.target.innerText === 'Filter good dogs: ON') {
            event.target.innerText = 'Filter good dogs: OFF'
            getAllPups()
        }
    })
}