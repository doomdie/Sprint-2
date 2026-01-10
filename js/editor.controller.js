let gCanvas
let gCtx
let gCurrTextIdx = 0
let gUserImg = null
let isDragging = false
let startPos = null
var gStickersOnCanvas = []
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']

function onInit() {
    const elCanvas = document.getElementById('meme-canvas')
    if (!elCanvas) return

    gCanvas = elCanvas
    gCtx = gCanvas.getContext('2d')

    const urlParams = new URLSearchParams(window.location.search)
    const imageId = urlParams.get('id')

    if (imageId) {
        setImg(imageId)
    }

    addListeners()
    renderMeme()
    renderStickers()
    prepareStickers()
}

function onSwitchText() {
    const meme = getMeme()
    if (!meme.lines.length) return
    const nextIdx = (meme.selectedLineIdx + 1) % meme.lines.length
    setSelectedLine(nextIdx)

    const currLine = meme.lines[nextIdx]
    const elInput = document.querySelector('.control-input')
    elInput.value = currLine.txt
    elInput.focus()

    const elColorPicker = document.querySelector('#colorPicker')
    if (elColorPicker) elColorPicker.value = currLine.color
    renderMeme()
}

function onSelectTopText() {
    setSelectedLine(0)
    const meme = getMeme()
    document.querySelector('.control-input').value = meme.lines[0].txt
    renderMeme()
}

function onSelectBottomText() {
    const meme = getMeme()
    const lastIdx = meme.lines.length - 1
    setSelectedLine(lastIdx)
    document.querySelector('.control-input').value = meme.lines[lastIdx].txt
    renderMeme()
}

function onSetFontSize(diff) {
    const meme = getMeme()
    const line = meme.lines[meme.selectedLineIdx]
    if (!line) return
    line.size += diff
    if (line.size < 10) line.size = 10
    if (line.size > 100) line.size = 100
    renderMeme()
}

function renderMeme() {
    console.log(gMeme)
    if (!gCtx) return
    const meme = getMeme()

    if (gUserImg) {
        drawMemeContent(gUserImg, meme)
    } else {
        const imgData = getImageById(meme.selectedImgId)
        if (!imgData) return
        const img = new Image()
        img.src = imgData.url
        img.onload = () => drawMemeContent(img, meme)
    }
    console.log(gMeme)
}

function drawMemeContent(img, meme) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height)
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)

    gStickers.forEach(sticker => {
        gCtx.drawImage(sticker.img, sticker.pos.x, sticker.pos.y, sticker.size, sticker.size)
    })

    meme.lines.forEach((line, idx) => {
        const { txt, size, color, pos } = line
        gCtx.fillStyle = color
        gCtx.lineWidth = 2
        gCtx.strokeStyle = 'black'
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

function downloadCanvas() {
    setSelectedLine(null)
    renderMeme()
    setTimeout(() => {
        const dataUrl = gCanvas.toDataURL('image/png')
        const link = document.createElement('a')
        link.href = dataUrl
        link.download = 'my-meme.png'
        link.click()
    }, 50)
}

function onAddLine() {
    addLine()
    renderMeme()
    const elInput = document.querySelector('.control-input')
    elInput.value = ''
    elInput.focus()
}

function onDeleteLine() {
    const meme = getMeme()
    meme.lines.splice(meme.selectedLineIdx, 1)
    meme.selectedLineIdx = 0
    renderMeme()
}

function addListeners() {
    gCanvas.addEventListener('mousedown', onDown)
    gCanvas.addEventListener('mousemove', onMove)
    gCanvas.addEventListener('mouseup', onUp)
    window.addEventListener('keydown', onMoveLine)
}

onDown
JavaScript

function onDown(ev) {
    const pos = getEvPos(ev)
    const meme = getMeme()

    const lineIdx = meme.lines.findIndex(line => {
        const textWidth = gCtx.measureText(line.txt).width
        return pos.x >= line.pos.x - textWidth / 2 &&
               pos.x <= line.pos.x + textWidth / 2 &&
               pos.y >= line.pos.y - line.size / 2 &&
               pos.y <= line.pos.y + line.size / 2
    })

    if (lineIdx !== -1) {
        setSelectedLine(lineIdx)
        gSelectedSticker = null
        isDragging = true
        startPos = pos
        document.body.style.cursor = 'grabbing'
        renderMeme()
        return
    }

    const clickedSticker = gStickers.findLast(sticker => {
        return pos.x >= sticker.pos.x &&
               pos.x <= sticker.pos.x + sticker.size &&
               pos.y >= sticker.pos.y &&
               pos.y <= sticker.pos.y + sticker.size
    })

    if (clickedSticker) {
        gSelectedSticker = clickedSticker
        setSelectedLine(-1)
        isDragging = true
        startPos = pos
        document.body.style.cursor = 'grabbing'
        renderMeme()
    }
}
// function onMove(ev) {
//     if (!isDragging) return
//     const pos = getEvPos(ev)
//     const dx = pos.x - startPos.x
//     const dy = pos.y - startPos.y

//     moveLine(dx, dy)
//     startPos = pos
//     renderMeme()
// }
function onMove(ev) {
    if (!isDragging) return
    const pos = getEvPos(ev)
    const dx = pos.x - startPos.x
    const dy = pos.y - startPos.y

    if (gSelectedSticker) {
        gSelectedSticker.pos.x += dx
        gSelectedSticker.pos.y += dy
    } else {
        const meme = getMeme()
        const line = meme.lines[meme.selectedLineIdx]
        if (line) {
            line.pos.x += dx
            line.pos.y += dy
        }
    }

    startPos = pos
    renderMeme()
}
function onUp() {
    isDragging = false
    document.body.style.cursor = 'default'
}

function getEvPos(ev) {
    return { x: ev.offsetX, y: ev.offsetY }
}

function onMoveLine(ev) {
    const STEP = 10
    if (ev.key === 'ArrowDown') {
        ev.preventDefault()
        moveLine(0, STEP)
        renderMeme()
    } else if (ev.key === 'ArrowUp') {
        ev.preventDefault()
        moveLine(0, -STEP)
        renderMeme()
    }
}

function onImgInput(ev) {
    loadImageFromInput(ev, (img) => {
        gUserImg = img
        renderMeme()
    })
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()
    reader.onload = (event) => {
        const img = new Image()
        img.onload = () => onImageReady(img)
        img.src = event.target.result
    }
    reader.readAsDataURL(ev.target.files[0])
}
function onSaveMeme() {
    setSelectedLine(null)
    renderMeme()

    setTimeout(() => {
        const imgDataUrl = gCanvas.toDataURL('image/png')
        
       
        saveMeme(imgDataUrl) 
        
        alert('Saved to LocalStorage!')
    }, 50)
}
function renderStickers() {
    const elGrid = document.getElementById('previews')

    const strHtmls = gStickers.map((sticker, idx) => `
        <article class="carousel-item">
            <button class="sticker-btn" onclick="onSelectSticker(${idx})">
                <img src="${sticker.url}" alt="${sticker.name}">
            </button>
            <h3>${sticker.name}</h3>
        </article>
    `).join('')

    elGrid.innerHTML = strHtmls
}
function onSelectSticker(idx) {
    const stickerData = gStickers[idx]
    const img = new Image() 
    img.src = stickerData.url

    img.onload = () => {
        const stickerInstance = {
            img: img, 
            pos: { x: 50, y: 50 },
            size: 80
        }
        
        gStickersOnCanvas.push(stickerInstance)
        renderMeme() 
    }
}
function addStickerToCanvas(sSticker) {
    const elCanvas = document.querySelector('canvas');
    const ctx = elCanvas.getContext('2d')
    const img = new Image();
    
    
    img.src = sSticker.url;

    
    img.onload = () => {
        ctx.drawImage(img, 50, 50, 100, 100);
        console.log(`Sticker ${sSticker.name} added to canvas!`);
    };
}