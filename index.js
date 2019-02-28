let pages = ['accordion', 'dogs', 'lazy-load']


const TitleCase = string =>{
    let split = string.split(' ') || string.split('-')
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

const BuildLinks = pages =>{
    let main = document.querySelector('main')
    pages.map(page=>{
        let link = document.createElement('a')
        link.href = `./${page}/${page}.html`
        link.rel = 'noopener'
        link.innerText = TitleCase(page)
        main.appendChild(link)
    })
}

BuildLinks(pages)