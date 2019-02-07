const trilateration = require('./trilateration-lib');

const _calculatePositions = function(data) {
    const p1 = {x: data[0].x, y: data[0].y, z: data[0].z, r: data[0].distance};
    const p2 = {x: data[1].x, y: data[1].y, z: data[1].z, r: data[1].distance};
    const p3 = {x: data[2].x, y: data[2].y, z: data[2].z, r: data[2].distance};
    const positions = trilateration(p1, p2, p3, true);
    return positions;
}

const getPosition = function(data) {
    const pos = _calculatePositions(data);
    return pos;
}

module.exports = {getPosition: getPosition};