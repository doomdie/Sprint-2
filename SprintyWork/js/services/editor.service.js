const gImages = [
    { id: 'i101', name: 'Funny Ball', url: 'img/ball.png' },
    { id: 'i102', name: 'Crying Man', url: 'img/dedge.png' },
    { id: 'i103', name: 'Laughing Man', url: 'img/hedge.png' },
    { id: 'i104', name: 'I Like!', url: 'img/wedge.png' },
    { id: 'i105', name: '???', url: 'img/my-img.jpg' }
]
function getImageById(id) {
    
    return gImages.find(img => img.id === id)
}



function getImages() {
    return gImages
}

function getImgById(imgId) {
    return gImages.find(img => img.id === imgId)
}