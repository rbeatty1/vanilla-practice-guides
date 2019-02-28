// check to see if clicked element is an accordion link
const CheckAccordion = target => {
    if (target.classList.contains('accordion-link')){
        return true
    }
}

// toggle content of the clicked accordion
const ToggleClickedAccordion = target =>{
    let content = target.nextElementSibling
    if (content.classList.contains('active')){
        content.classList.remove('active')
        AriaHide(target)
    }
    else{
        content.classList.add('active')
        AriaShow(target)
    }
}

// make sure only one accordion content is visible at a time
const CollapseOtherAccordions = (target) =>{
    let links = document.querySelectorAll('.accordion-link')
    links.forEach(value=>{
        let content = value.nextElementSibling
        if (value != target)
            if (content.classList.contains('active')){
                content.classList.remove('active')
                AriaHide(target)
            }
    })
}

// manage web accessibility attributes
const AriaShow = target =>{
    let dependent = document.getElementById(target.getAttribute('aria-controls'))
    target.setAttribute('aria-expanded', 'true')
    dependent.setAttribute('aria-hidden', 'false')
}

const AriaHide = target =>{
    let dependent = document.getElementById(target.getAttribute('aria-controls'))
    target.setAttribute('aria-expanded', 'false')
    dependent.setAttribute('aria-hidden', 'true')
}


window.addEventListener('click', e=>{
    if (CheckAccordion(e.target)){
        e.preventDefault()
        let target = e.target

        ToggleClickedAccordion(target)
        CollapseOtherAccordions(target)
    }
})