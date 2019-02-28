import {dogData} from './data/dogData.js'

const toTitleCase = string =>{
    let split = string.split(' ')
    let newName = []
    split.map(name=>{
        if (name.length > 0){
            let trim = name.trim()
            let title = trim[0].toUpperCase() + trim.slice(1).toLowerCase()
            newName.push(title)
        }
    })
    return newName.join(' ')
}

const BuildDogNav = data =>{
    let nav = document.querySelector('nav')
    if (nav){
        for (let dog in dogData){
            let thisDog = dogData[dog],
                link = document.createElement('button'),
                name = toTitleCase(thisDog.name)
            
            link.classList.add('nav-link')

            link.innerText = name
            link.setAttribute('data-dog', dog)

            link.addEventListener('click', e=>{
                BuildDogInfo(e.target)
            })
            nav.appendChild(link)
            if (dog == 0) BuildDogInfo(link)
        }
    }
}

const BuildDogInfo = target =>{
    let id = target.getAttribute('data-dog'),
        thisDog = dogData[id],
        buttons = document.querySelectorAll('button')

    // set active button
    for(let node of buttons){
        console.log({node})
        node == target ? node.classList.add('active') : node.classList.remove('active')
    }

    // insert profile picture
    let img = document.getElementById('profile-picture')
    img.src = `./${thisDog.photo}`

    let name = document.getElementById('dog-name')
    name.innerText = toTitleCase(thisDog.name)

    // build other stuff
    let sections = document.querySelectorAll('section')
    for (let node of sections){
        for (let child of node.children){
            let dataKey = child.id.split('-')[1]
            let trim;
            switch(dataKey){
                case 'breeds':
                    let breeds = []
                    thisDog.breeds.map(breed=>{
                        breeds.push(toTitleCase(breed))
                    })
                    trim = breeds.join(', ')
                    break;
                case 'age':
                    trim = toTitleCase(thisDog.age)
                    break;
                default:
                    trim = thisDog[dataKey].trim()
                    break;
            }
            let label = toTitleCase(dataKey)
            child.innerHTML = `<span class="data-descriptor">${label}: </span>${trim}`
        }
    }

}



BuildDogNav()