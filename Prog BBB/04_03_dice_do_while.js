// 04_03_dice_do_while.js

function throwDice() {
    var r = Math.random() * 6;
    r = Math.floor(r) + 1;
    return r;
}

var count = 0;
do {
    var x = throwDice();
    var y = throwDice();
    console.log("Throw: " + x + ", " + y);
    count ++;
} while ((x != 6) || (y != 6));

console.log("Count=" + count);