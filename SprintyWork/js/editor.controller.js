function initEditor() {


    const urlParams = new URLSearchParams(window.location.search)
    const imageId = urlParams.get('id')


    const selectedImg = getImageById(imageId)


    if (selectedImg) {
        const elImg = document.getElementById('display-meme')
        elImg.src = selectedImg.url

        document.querySelector('h1').innerText = `Editing: ${selectedImg.name}`
    } else {

        window.location.href = 'index.html'
    }
}

initEditor()