let gCurrentColor = 'white'
let gNextColor = 'white'
let isDragging = false
let startPos

const gImages = [
    { id: 'i101', name: 'Funny Ball', url: 'img/ball.png', tags: ['Shapes','Abstract','New'] },
    { id: 'i102', name: 'Crying Man', url: 'img/dedge.png', tags: ['Rage Comic', 'Cartoon','Sad'] },
    { id: 'i103', name: 'Laughing Man', url: 'img/hedge.png', tags: ['Rage Comic', 'Cartoon', 'Happy'] },
    { id: 'i104', name: 'I Like!', url: 'img/wedge.png', tags: ['Rage Comic', "Carttoon", "Really Happy"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown","Mystery","Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown","Mystery","Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown","Mystery","Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown","Mystery","Huh"] },
    { id: 'i105', name: '???', url: 'img/test.png', tags: ["Unknown","Mystery","Huh"] }
]

var gMeme = {
    selectedImgId: 'i101',
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
function getMemes(options = {}) {
    const filterBy = options.filterBy
    // const sortBy = options.sortBy
    // const page = options.page

    var memesToDisplay = _filterMemes(filterBy)
    return memesToDisplay
}
// var gKeywordSearchCountMap = { 'funny': 12, 'cat': 16, 'baby': 2 }
function getImageById(id) {

    return gImages.find(img => img.id === id)
}



function getImages() {
    return gImages
}

function getImgById(imgId) {
    return gImages.find(img => img.id === imgId)
}
function setLineText(txt) {
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}
function setSelectedLine(idx) {
    gMeme.selectedLineIdx = idx
}
function getMeme() {
    return gMeme
}
const canvas = document.getElementById('meme-canvas')
const ctx = canvas.getContext('2d')
const img = new Image()
img.src = 'img/ball.png'
img.onload = () => {
    drawMeme()
}

function drawMeme() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 4
    ctx.font = 'bold 40px Impact'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'top'

}

function setImg(imgId) {
    console.log('Setting image ID to:', imgId)
    gMeme.selectedImgId = imgId
}
function setLineColor(color) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    line.color = color
}
function addLine() {
    let yPos = 250
    if (gMeme.lines.length === 0) yPos = 50
    if (gMeme.lines.length === 1) yPos = 400

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
    
    const line = gMeme.lines[gMeme.selectedLineIdx];
    line.pos.x += dx;
    line.pos.y += dy;
}

function isTextHit(clickedPos, line) {
    const { pos, size, txt } = line
    const textWidth = gCtx.measureText(txt).width
    const boundaryLeft = pos.x - textWidth / 2
    const boundaryRight = pos.x + textWidth / 2
    const boundaryTop = pos.y - size / 2
    const boundaryBottom = pos.y + size / 2

    return (
        clickedPos.x >= boundaryLeft &&
        clickedPos.x <= boundaryRight &&
        clickedPos.y >= boundaryTop &&
        clickedPos.y <= boundaryBottom
    )
}
function _filterMemes(filterBy) {
    var memesToDisplay = gImages.slice()
    if (filterBy.txt) {
        const regexTxt = new RegExp(filterBy.txt, 'i')
        memesToDisplay = memesToDisplay.filter(meme => regexTxt.test(meme.name))
    }
    return memesToDisplay
}