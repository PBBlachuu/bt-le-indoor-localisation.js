let targetRotationX = 0, targetRotationY = 0
let targetRotationXOnMouseDown = 0, targetRotationYOnMouseDown = 0
let mouseX = 0, mouseY = 0
let mouseXOnMouseDown = 0, mouseYOnMouseDown = 0
let windowHalfX = window.innerWidth / 2, windowHalfY = window.innerHeight / 2
let mouseDeltaX = 0
let mouseHandler = {}

const onDocumentMouseDown = (e) => {
    e.preventDefault()
    document.addEventListener('mousemove', onDocumentMouseMove, false)
    document.addEventListener('mouseup', onDocumentMouseUp, false)
    document.addEventListener('mouseout', onDocumentMouseOut, false)
    
    mouseXOnMouseDown = e.clientX - windowHalfX
    mouseYOnMouseDown = e.clientY - windowHalfY
    targetRotationXOnMouseDown = targetRotationX
    targetRotationYOnMouseDown = targetRotationY
}

const onDocumentMouseMove = (e) => {
    mouseX = e.clientX - windowHalfX
    mouseY = e.clientY - windowHalfY
    targetRotationX = targetRotationXOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.01
    targetRotationY = targetRotationYOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.01
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

const onDocumentWheel = (e) => {
    mouseDeltaX = e.deltaX
}

document.addEventListener('mousedown', onDocumentMouseDown, false)
document.addEventListener('wheel', onDocumentWheel, false)

mouseHandler.getTargetLocationX = () => {
    return targetRotationX
}

mouseHandler.getTargetLocationY = () => {
    return targetRotationY
}

mouseHandler.getMouseDeltaX = () => {
    return mouseDeltaX
}

module.exports = mouseHandler