const THREE = require('three')
const mouseHandler = require('./mouse')

var scene = new THREE.Scene()
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

var renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

let material = new THREE.LineBasicMaterial({color: 0xffffff});

var geometry = new THREE.BoxGeometry(2, 2, 2)
var wireframe = new THREE.EdgesGeometry( geometry );
var line = new THREE.LineSegments( wireframe, material);

var geometry1 = new THREE.BoxGeometry(0.5, 0.5, 0.5)
var wireframe1 = new THREE.EdgesGeometry( geometry1 );
var line1 = new THREE.LineSegments( wireframe1, material);
line1.position.set(0, 0, 0)

var group = new THREE.Group();
group.add( line1 );
group.add( line );

scene.add(group)

scene.background = new THREE.Color(0x272822)


camera.position.z = 5

var animate = () => {
    requestAnimationFrame(animate)
    //line.rotation.y += 0.01;
    //group.rotation.x += 0.01;

    group.rotation.y += (mouseHandler.getTargetLocationX() * 0.5 - group.rotation.y ) * 0.1
    group.rotation.x += (mouseHandler.getTargetLocationY() * 0.5 - group.rotation.x ) * 0.1

    camera.position.z += mouseHandler.getMouseDeltaX() * 0.1
    //let cameraDeltaX = 
    //camera.lookAt(0, 0, 0)

    //console.log()
    
    renderer.render(scene, camera)
}

const run = () => {
    animate()
}

module.exports = {render: run};