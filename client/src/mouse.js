let targetRotation = 0
let targetRotationOnMouseDown = 0
let mouseX = 0
let mouseXOnMouseDown = 0
let windowHalfX = window.innerWidth / 2
let mouseHandler = {}

const onDocumentMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('mouseup', onDocumentMouseUp, false)
    document.addEventListener('mouseout', onDocumentMouseOut, false)
    
    mouseXOnMouseDown = e.clientX - windowHalfX
    targetRotationOnMouseDown = targetRotation
}

const onDocumentMouseMove = (e) => {
    mouseX = e.clientX - windowHalfX
    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.01
}

const onDocumentMouseUp = () => {
    document.removeEventListener('mousemove', onDocumentMouseMove, false)
    document.removeEventListener('mouseup', onDocumentMouseUp, false)
    document.removeEventListener('mouseout', onDocumentMouseOut, false)
}

const onDocumentMouseOut = () => {
    document.removeEventListener('mousemove', onDocumentMouseMove, false)
    document.removeEventListener('mouseup', onDocumentMouseUp, false)
    document.removeEventListener('mouseout', onDocumentMouseOut, false)
}

document.addEventListener('mousedown', onDocumentMouseDown, false)

mouseHandler.getTargetLocation = () => {
    return targetRotation
}

module.exports = mouseHandler