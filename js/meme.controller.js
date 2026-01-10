const gQueryOptions = {
    filterBy: { txt: '', minSpeed: 0 },
    sortBy: {},
    page: { idx: 0, size: 4 },
}

let gIsExpanded = false
onInit()

function onInit() {
    renderGrid()
    renderTagCloud()
    
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
function renderTagCloud() {
    const filtMeme = getMemes(gQueryOptions);
    const elGrid = document.querySelector('.taggy');
    
    const allTags = filtMeme.flatMap(img => img.tags);
    const tagCounts = allTags.reduce((acc, tag) => {
        acc[tag] = (acc[tag] || 0) + 1;
        return acc;
    }, {});
    const keys = Object.keys(tagCounts);
    const displayKeys = gIsExpanded ? keys : keys.slice(0, 4); 
    console.log(displayKeys)
    let strHtmls = displayKeys.map(tag => {
        const count = tagCounts[tag];
        const fontSize = 24 + (count * 4); 
        
        return `
            <div class="tag-cell">
                <span class="tag-item" style="font-size: ${fontSize}px">
                    ${tag}
                </span>
            </div>
        `;
    }).join('');

    let buttonHtml = '';
    if (keys.length > 4) {
        buttonHtml = `<button class="btn-show-more" onclick="onShowMoreTags()">
            ${gIsExpanded ? 'Show Less' : 'More...'}
        </button>`;
    }

    elGrid.innerHTML = `
    <div class="tag-cloud-wrapper">
        <div class="tag-grid">
            ${strHtmls}
        </div>
        ${buttonHtml}
        </div>
    `;
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
function onShowMoreTags(){
    
    const elSmallHeader = document.querySelector('.ageheader')
    elSmallHeader.classList.toggle('activated')
    gIsExpanded = !gIsExpanded
    renderTagCloud()
    console.log(elSmallHeader)
}
