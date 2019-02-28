let images = document.querySelectorAll('.lazy-load')

const IsInViewport = element =>{
    let dimensions = element.getBoundingClientRect()
    return (
        dimensions.top >= 0 &&
        dimensions.left >= 0 &&
        dimensions.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        dimensions.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
}

const AddCaption = (image, text) =>{
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
    const textRef = {
        beach : 'A lifeguard station on a deserted beach',
        canoe : 'A dog getting chaffuered across a foggy lake by his best friend',
        crab : 'A defensive crab protecting its territory',
        doors : 'Two sets of two blue doors with anchors painted on them',
        jellyfish: 'Does a jellyfish have a brain?',
        lighthouse: 'A lighthouse against the night sky',
        sail : 'I hope I don\'t capsize...',
        'sea-dog': 'A dog on the beach',
        whale: 'A whale breaching'
    }

    if (!text || !image) return
    let caption = document.getElementById('image-caption'), 
        title = document.getElementById('image-title'),
        content = text.split('.')[0]

    title.innerText = content.endsWith('s') ? `This is a picture of ${TitleCase(content)}` : `This is a picture of a ${TitleCase(content)}`
    caption.innerText = textRef[content]

    image.alt = textRef[content]
}

const LoadImages = () =>{
    for (let image of images){
        if(IsInViewport(image)){
            while(image.firstChild){
                image.removeChild(image.firstChild)
            }
            let file = image.getAttribute('data-image'),
                img = document.createElement('img')
            
            img.src = `./img/${file}`
            image.appendChild(img)
            AddCaption(img, file)
        }
    }
}

LoadImages()

document.getElementById('image-container').addEventListener('scroll', LoadImages, false)