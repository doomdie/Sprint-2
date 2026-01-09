function oninit() {
    renderSavedGrid()
}
function renderSavedGrid() {
    const elGrid = document.getElementById('imageGrid')
    
   
    const savedMemeStrings = getSavedMemes()

    
    if (!savedMemeStrings.length) {
        elGrid.innerHTML = '<h2>No saved memes yet!</h2>'
        return
    }

    
    const strHtmls = savedMemeStrings.map((imgDataUrl, idx) => `
        <article class="grid-item">
            <img src="${imgDataUrl}" alt="Saved Meme ${idx + 1}">
            <div class="card-actions">
                 <button onclick="onDeleteMeme(${idx})">Delete</button>
                 <a href="${imgDataUrl}" download="my-meme-${idx}.png">Download</a>
            </div>
        </article>
    `)
    

    elGrid.innerHTML = strHtmls.join('')
}