const gImages = [
    { id: 'i101', name: 'Funny Ball', url: 'img/ball.png' },
    { id: 'i102', name: 'Crying Man', url: 'img/dedge.png' },
    { id: 'i103', name: 'Laughing Man', url: 'img/hedge.png' },
    { id: 'i104', name: 'I Like!', url: 'img/wedge.png' },
    { id: 'i105', name: '???', url: 'img/my-img.jpg' }
]

var gMeme = {
    selectedImgId: 'i101',
    selectedLineIdx: 0, 
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            color: 'white',
            pos: { x: 250, y: 50 }
        },
        {
            txt: 'But only on Tuesdays',
            size: 40,
            color: 'white',
            pos: { x: 250, y: 450 } 
        }
    ]
}
var gKeywordSearchCountMap = {'funny': 12,'cat': 16, 'baby': 2}
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