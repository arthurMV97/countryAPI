let arrayPays = [];
let arrayPaysMaj = []
let arrayInfos = []
let input = document.querySelector('input')
let datalist = document.querySelector('datalist')
let discoverInput = document.querySelector('#discover')
let section= document.querySelector('section')
let voyelleRgx = /A|E|I|O|U|Y/;
let borders = []

let request = new XMLHttpRequest();
request.open("GET", 'https://restcountries.eu/rest/v2/all')

request.onload = function () {
    let data = JSON.parse(request.response)
    for (element of data) {
        arrayPaysMaj.push(element.name)
        arrayPays.push(element.name.toLowerCase())
        arrayInfos.push(element)
    }
}
request.send()



input.addEventListener('input', () => {
    let options = document.querySelectorAll('option')
    for (element of options) {
        element.innerHTML = "";
    }
    for (let i=0; i < arrayPaysMaj.length; i++) {
        if (arrayPays[i].indexOf(input.value) === 0) {
            
            let option = document.createElement('option')
            option.innerHTML = arrayPaysMaj[i];
            datalist.appendChild(option)


        }
    }
})

discoverInput.addEventListener('click', () => {
    let object = arrayInfos.filter(element => element.name === input.value)
    console.log(object)
    let borderObject = object[0].borders
    let html = []
    

    for (element of arrayInfos) {
        for (let i = 0; i < borderObject.length; i++){
        if (element.cioc === borderObject[i]) {
            html.push(element.name)
            console.log(html)
        }
    }}


        let newDiv = document.createElement('div');
        newDiv.className = 'infos'
        newDiv.innerHTML = `<img src=${object[0].flag}> <p>La population de ${object[0].name} est de ${object[0].population} habitants</p><p>Sa capitale est ${object[0].capital}</p> <p>Sa monnaie est ${(voyelleRgx.test(object[0].currencies[0].name)? "l'" : "le ")}${object[0].currencies[0].name} ${object[0].currencies[0].symbol}</p> <p>Ce pays est situé en ${object[0].region}, plus précisement en ${object[0].subregion} `
        let newP = document.createElement('p');
        newP.innerHTML = `Les pays frontaliers sont: ${html.join(', ')}`
        newDiv.appendChild(newP)
        section.appendChild(newDiv)
})

