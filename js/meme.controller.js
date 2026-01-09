const gQueryOptions = {
    filterBy: { txt: '', minSpeed: 0 },
    sortBy: {},
    page: { idx: 0, size: 4 },
}
onInit()

function onInit() {
    renderGrid()
}


function renderGrid() {
    // var filtMeme = gImages
        var filtMeme = getMemes(gQueryOptions)

    const elGrid = document.getElementById('imageGrid')
    
    const strHtmls = filtMeme.map(img => `
       <article class="grid-item">
            <a href="memes.html?id=${img.id}">
                <img src="${img.url}" alt="${img.name}">
            </a>
            <h3>${img.name}</h3>
        </article>
    `)

    elGrid.innerHTML = strHtmls.join('')
}


function onImageClick(imageId) {
    console.log('YAIR OVER HERE! ID:', imageId)
   
}

function onSetFilterBy() {
    const elTxtInput = document.querySelector('.filter-by .txt')
    gQueryOptions.filterBy.txt = elTxtInput.value
    renderGrid()
}
function handleImageSignal(ev) {

    const file = ev.target.files[0]
    if (!file) return
    onSaveMeme()
}