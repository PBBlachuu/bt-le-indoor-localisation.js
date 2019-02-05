const THREE = require('three')
const Room = require('./room')
const mouseHandler = require('./mouse')

const App = class App {

    constructor(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        document.body.appendChild(this.renderer.domElement)

        this.group = new THREE.Group()

        this.room = new Room(1, 1, 1)
        this.room.setTHREE(THREE)
        this.group.add(this.room.getDisplayObject())

        this.loop = () => {
            requestAnimationFrame(this.loop)
            this.update()
            this.renderer.render(this.scene, this.camera)
        }
    }

    init(){
        this.scene.add(this.group)
        this.scene.background = new THREE.Color(0x272822)
        this.camera.position.z = 5
    }

    update(){
        this.group.rotation.y += (mouseHandler.getTargetLocationX() * 0.5 - this.group.rotation.y ) * 0.1
        this.group.rotation.x += (mouseHandler.getTargetLocationY() * 0.5 - this.group.rotation.x ) * 0.1
        this.camera.position.z += mouseHandler.getMouseDeltaX() * 0.05
    }

    run(){
        this.loop()
    }

}

module.exports = App