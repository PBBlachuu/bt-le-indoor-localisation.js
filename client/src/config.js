const beaconData = require('../../data/beacons');
const roomData = require('../../data/room');

const func = {
    getRoomXHalf: () => roomData.room.x / 2,
    getRoomYHalf: () => roomData.room.y / 2,
    getRoomZHalf: () => roomData.room.z / 2
}

module.exports = {
    room: roomData.room,
    beacons: beaconData.beacons,
    func: func
}