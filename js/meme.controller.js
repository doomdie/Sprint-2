
onInit()

function onInit() {
    renderGrid()
}


function renderGrid() {
    const elGrid = document.getElementById('imageGrid')
    
    const strHtmls = gImages.map(img => `
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