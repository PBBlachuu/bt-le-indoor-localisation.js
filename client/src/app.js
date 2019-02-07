const THREE = require('three')
const Room = require('./room')
const mouseHandler = require('./mouse')
const config = require('./config')

const App = class App {

    constructor(){
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
        this.renderer = new THREE.WebGLRenderer({antialias: true})
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.group = new THREE.Group()
        document.body.appendChild(this.renderer.domElement)

        this.room = new Room(config.room.x, config.room.y, config.room.z)
        this.room.setTHREE(THREE)
        this.group.add(this.room.getDisplayObject())
        
        this.beacons = new Array()
        this.ranges = new Array()

        // Create beacon objects
        config.beacons.forEach((element) => {
            const material = new THREE.MeshBasicMaterial( {color: 0xff0000} )
            const geometry = new THREE.SphereGeometry(0.02, 15, 15)
            const beacon = new THREE.Mesh(geometry, material)
            beacon.position.set(element.x - config.func.getRoomXHalf(), element.y - config.func.getRoomYHalf(), element.z - config.func.getRoomZHalf())
            this.beacons.push(beacon)
            this.group.add(beacon)
        })

        // Create beacon range objects
        config.beacons.forEach((element) => {
            const material = new THREE.MeshBasicMaterial( {color: 0xffff00, transparent: true, opacity: 0.2} )
            const geometry = new THREE.SphereGeometry(2, 30, 30)
            const range = new THREE.Mesh(geometry, material)
            range.position.set(element.x - config.func.getRoomXHalf(), element.y - config.func.getRoomYHalf(), element.z - config.func.getRoomZHalf())
            this.ranges.push(range)
            this.group.add(range)
        })

        // Create user objects
        const material = new THREE.MeshBasicMaterial( {color: 0x0000ff} )
        const geometry = new THREE.SphereGeometry(0.05, 15, 15)
        this.user = new THREE.Mesh(geometry, material)
        this.user.visible = false
        this.group.add(this.user)

        // Create socket
        this.socket = io()
        this.socket.on('bt', data => {
            this.handleSocketData(data)
        })

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

    handleSocketData(data){
        data.beacons.map((element, index) => {
            this.ranges[index].scale.x = element.distance
            this.ranges[index].scale.y = element.distance
            this.ranges[index].scale.z = element.distance
        })
        if (data.user) {
            this.user.visible = true
            this.user.position.x = data.user.x - config.func.getRoomXHalf()
            this.user.position.y = data.user.y - config.func.getRoomYHalf()
            this.user.position.z = data.user.z - config.func.getRoomZHalf()
        } else {
            this.user.visible = false
        }
    }
}

module.exports = App