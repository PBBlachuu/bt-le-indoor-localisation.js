const room = {
    x: 5,
    y: 2,
    z: 4,
}

const beacons = [
    {
        x: 0,
        y: 0,
        z: 0,
        name: 'iBeacon 5000',
        rssi: -90
    },
    {
        x: 5,
        y: 2,
        z: 4,
        name: 'iBeacon 1000',
        rssi: -90
    }
];

const func = {
    getRoomXHalf: () => room.x / 2,
    getRoomYHalf: () => room.y / 2,
    getRoomZHalf: () => room.z / 2
}

module.exports = {
    room: room,
    beacons: beacons,
    func: func
}