let gCurrTextIdx = 0;
function initEditor() {
    const urlParams = new URLSearchParams(window.location.search)
    const imageId = urlParams.get('id')
    const selectedImg = getImageById(imageId)
    if (selectedImg) {
        const elMeme = document.getElementById('display-meme')
        const elImg = elMeme.querySelector('img')
        elImg.src = selectedImg.url
        document.querySelector('h1').innerText = `Editing: ${selectedImg.name}`
    } else {
        window.location.href = 'index.html'
    }
}

initEditor()


function onSwitchText() {
    const elTexts = document.querySelectorAll('.meme-text')
    elTexts.forEach(el => el.classList.remove('selected'))
    gCurrTextIdx = (gCurrTextIdx === 0) ? 1 : 0
    const elActive = elTexts[gCurrTextIdx]
    elActive.classList.add('selected')
    elActive.focus()
}
function onSelectTopText() {
    const elTexts = document.querySelectorAll('.meme-text')
    elTexts.forEach(el => el.classList.remove('selected'))
    gCurrTextIdx = 0
    const elTop = elTexts[gCurrTextIdx]
    elTop.classList.add('selected')
    elTop.focus()
}
function onSelectBottomText() {
    const elTexts = document.querySelectorAll('.meme-text')
    elTexts.forEach(el => el.classList.remove('selected'))
    gCurrTextIdx = 1
    const elTop = elTexts[gCurrTextIdx]
    elTop.classList.add('selected')
    elTop.focus()
}
function onSetLineText(txt) {
    setLineText(txt)
    const elTexts = document.querySelectorAll('.meme-text')
    const elActive = elTexts[gCurrTextIdx]
    elActive.value = txt
}