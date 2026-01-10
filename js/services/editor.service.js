const gImages = [
    { id: 'i101', name: 'Funny Ball', url: 'img/ball.png', tags: ['Shapes', 'Abstract', 'New'] },
    { id: 'i102', name: 'Crying Man', url: 'img/dedge.png', tags: ['Rage Comic', 'Cartoon', 'Sad'] },
    { id: 'i103', name: 'Laughing Man', url: 'img/hedge.png', tags: ['Rage Comic', 'Cartoon', 'Happy'] },
    { id: 'i104', name: 'I Like!', url: 'img/wedge.png', tags: ['Rage Comic', "Carttoon", "Really Happy"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown", "Mystery", "Huh"] },
    
]
const gStickers = [
    { id: "s1", name: 'doggy', url: 'image.jpeg', img: null, pos: { x: 250, y: 50 }, size: 100 },
    { id: "s2", name: 'tomato', url: 'tate.png', img: null, pos: { x: 250, y: 450 }, size: 100 },
    { id: "s3", name: 'tomato', url: 'tate.png', img: null, pos: { x: 250, y: 450 }, size: 100 },
    { id: "s4", name: 'tomato', url: 'tate.png', img: null, pos: { x: 250, y: 450 }, size: 100 }
]

var gMeme = {
    selectedImgId: 'i101',
    url: 'img/ball.png',
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            color: '#ffffff',
            pos: { x: 250, y: 50 }
        },
        {
            txt: 'But only on Tuesdays',
            size: 40,
            color: '#ffffff',
            pos: { x: 250, y: 450 }
        }
    ]
   

}
function prepareStickers() {
    gStickers.forEach(sticker => {
        const img = new Image()
        img.src = sticker.url
        sticker.img = img
    })
}

let gUserUploadedImg = null

function getMemes(options = {}) {
    const filterBy = options.filterBy
    var memesToDisplay = _filterMemes(filterBy)
    return memesToDisplay
}
function getMeme() {
    return gMeme
}

function getImages() {
    return gImages
}

function getImageById(id) {
    return gImages.find(img => img.id === id)
}

function setImg(imgId) {
    gUserUploadedImg = null
    gMeme.selectedImgId = imgId
}

function setMemeImg(img) {
    gUserUploadedImg = img
    gMeme.selectedImgId = null
}

function getUserImg() {
    return gUserUploadedImg
}

function setLineText(txt) {
    if (!gMeme.lines.length) return
    
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function setLineColor(color) {
    if (!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}

function addLine() {
    let yPos = 250
    if (gMeme.lines.length === 0) yPos = 50
    else if (gMeme.lines.length === 1) yPos = 400

    const newLine = {
        txt: 'Enter Text',
        size: 40,
        color: '#ffffff',
        pos: { x: 250, y: yPos }
    }

    gMeme.lines.push(newLine)
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function moveLine(dx, dy) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    if (!line) return
    line.pos.x += dx
    line.pos.y += dy
}

function _filterMemes(filterBy) {
    let memesToDisplay = gImages.slice()
    if (filterBy && filterBy.txt) {
        const regexTxt = new RegExp(filterBy.txt, 'i')
        memesToDisplay = memesToDisplay.filter(img => regexTxt.test(img.name))
    }
    return memesToDisplay
}
const STORAGE_KEY = 'memesDB'

function saveMeme(imgDataUrl) {
    const savedMemes = loadFromStorage(STORAGE_KEY) || []
    
    savedMemes.push(imgDataUrl)
    
    saveToStorage(STORAGE_KEY, savedMemes)
}

function getSavedMemes() {
    return loadFromStorage(STORAGE_KEY) || []
}