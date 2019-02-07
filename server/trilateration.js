const trilateration = require('./trilateration-lib');

p1 = { x: 0, y: 0, z: 0, r: 2*Math.sqrt(2) };
p2 = { x: 2, y: 0, z: 0, r: 2 };
p3 = { x: 0, y: 2, z: 0, r: 2 };

p4 = trilateration(p1, p2, p3);
console.log(p4);
