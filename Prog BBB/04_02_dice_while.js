// 04_02_dice_while.js

function throwDice() {
    var r = Math.random() * 6;
    r = Math.floor(r) + 1;
    return r;
}

var x = throwDice();
var y = throwDice();
console.log("Throw: " + x + ", " + y);
while ((x != 6) || (y != 6)) {
    x = throwDice();
    y = throwDice();
    console.log("Throw: " + x + ", " + y);
}