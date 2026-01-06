let gCanvas;
let gCtx;
let gCurrTextIdx = 0;

function onInit() {
    const elCanvas = document.getElementById('meme-canvas')
    if (!elCanvas) {
        console.error('I DONT GET IT')
        return;
    }


    gCanvas = elCanvas;
    gCtx = gCanvas.getContext('2d')

    const urlParams = new URLSearchParams(window.location.search)
    const imageId = urlParams.get('id')

    if (imageId) {
        setImg(imageId);
        const imgData = getImageById(imageId);
        if (imgData) {
        }
    }

    renderMeme();
}

function onSwitchText() {
    const meme = getMeme()
    const nextIdx = (meme.selectedLineIdx === 0) ? 1 : 0
    setSelectedLine(nextIdx) 
    const elInput = document.querySelector('.control-input')
    elInput.value = meme.lines[nextIdx].txt
    elInput.focus()
    renderMeme()
}
function onSelectTopText() {
    setSelectedLine(0);
    const meme = getMeme();
    document.querySelector('.control-input').value = meme.lines[0].txt;
    renderMeme();
}
function onSelectBottomText() {
    setSelectedLine(1);
    const meme = getMeme();
    document.querySelector('.control-input').value = meme.lines[0].txt;
    renderMeme();
}
function onSetLineText(txt) {
    setLineText(txt)
    const elTexts = document.querySelectorAll('.meme-text')
    const elActive = elTexts[gCurrTextIdx]
    elActive.value = txt
}
function colorPicker(color) {
    const root = document.documentElement;
    root.style.setProperty('--clr-primary--1', color);
    console.log(`Theme updated to: ${color}`);


}
function renderMeme() {
    if (!gCtx) return
    const meme = getMeme()
    const imgData = getImageById(meme.selectedImgId)
    if (!imgData) return
    const img = new Image()
    img.src = imgData.url 
    img.onload = () => {
        gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        meme.lines.forEach((line, idx) => {
            console.log('Drawing line index:', idx, line.txt) 
            const { txt, size, color, pos } = line
            gCtx.lineWidth = 2
            gCtx.strokeStyle = 'black'
            gCtx.fillStyle = color
            gCtx.font = `${size}px Impact`
            gCtx.textAlign = 'center'
            gCtx.textBaseline = 'middle'

            gCtx.fillText(txt, pos.x, pos.y)
            gCtx.strokeText(txt, pos.x, pos.y)

            if (idx === meme.selectedLineIdx) {
                drawTextFrame(line)
            }
        })
    }
}
function drawTextFrame(line) {
    const textWidth = gCtx.measureText(line.txt).width
    const padding = 15
    
    gCtx.strokeStyle = 'yellow'
    gCtx.strokeRect(
        line.pos.x - (textWidth / 2) - padding, 
        line.pos.y - (line.size / 2) - padding, 
        textWidth + (padding * 2), 
        line.size + (padding * 2)
    )
}


function onSetColor(color) {
    setLineColor(color)
    renderMeme()
}

function onSetLineText(txt) {
    setLineText(txt)
    renderMeme()
}

function onSelectLine(idx) {
    setSelectedLine(idx)
    renderMeme()
}
renderMeme()