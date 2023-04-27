"use strict";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;
canvas.style.border = "1px solid #000";
let offsetX;
let offsetY;
let getOffSet = () => {
    let offsets = canvas.getBoundingClientRect();
    offsetX = offsets.left;
    offsetY = offsets.top;
};
getOffSet();
window.onscroll = function () { getOffSet(); };
window.onresize = function () { getOffSet(); };
window.onresize = function () { getOffSet(); };
let shapes = [];
let currentIndex = null;
let isDragging = false;
let startX;
let startY;
shapes.push({ x: 200, y: 70, width: 200, height: 200, color: "red" });
shapes.push({ x: 10, y: 10, width: 100, height: 100, color: "blue" });
function isMouseInShape(x, y, shape) {
    let shapeLeft = shape.x;
    let shapeRight = shape.x + shape.width;
    let shapeTop = shape.y;
    let shapeBottom = shape.y + shape.height;
    if (x > shapeLeft && x < shapeRight && y > shapeTop && y < shapeBottom) {
        return true;
    }
    else {
        return false;
    }
}
function mouseDown(e) {
    e.preventDefault();
    startX = e.clientX - offsetX;
    startY = e.clientY - offsetY;
    let index = 0;
    for (let shape of shapes) {
        if (isMouseInShape(startX, startY, shape)) {
            currentIndex = index;
            isDragging = true;
            return;
        }
        index++;
    }
}
function mouseUp(e) {
    e.preventDefault();
    if (!isDragging) {
        return;
    }
    isDragging = false;
}
function mouseOut(e) {
    e.preventDefault();
    isDragging = false;
}
function mouseMove(e) {
    if (!isDragging) {
        return;
    }
    else {
        e.preventDefault();
        let mouseX = e.clientX - offsetX;
        let mouseY = e.clientY - offsetY;
        let dx = mouseX - startX;
        let dy = mouseY - startY;
        let currentShape = shapes[currentIndex];
        currentShape.x += dx;
        currentShape.y += dy;
        drawShape();
        startX = mouseX;
        startY = mouseY;
    }
}
canvas.onmousedown = mouseDown;
canvas.onmouseup = mouseUp;
canvas.onmouseout = mouseOut;
canvas.onmousemove = mouseMove;
function drawShape() {
    ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let shape of shapes) {
        ctx.fillStyle = shape.color;
        ctx === null || ctx === void 0 ? void 0 : ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
    }
}
drawShape();
