const Room = class Room {

    constructor(width, height, depth){
        this.width = width
        this.height = height
        this.depth = depth
    }

    setTHREE(Three){
        this.THREE = Three
    }

    getDisplayObject(){
        const material = new this.THREE.LineBasicMaterial({color: 0xffffff})
        const geometry = new this.THREE.BoxGeometry(this.width, this.height, this.depth)
        const wireframe = new this.THREE.EdgesGeometry(geometry)
        return new this.THREE.LineSegments(wireframe, material)
    }

}

module.exports = Room;