// 04_01_dice_simple.js

function throwDice() {
    var r = Math.random() * 6;
    r = Math.floor(r) + 1;
    return r;
}

var x = throwDice();
var y = throwDice();
console.log("Throw: " + x + ", " + y);
