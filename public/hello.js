const canvas = document.querySelector(".draft-field");
const context = canvas.getContext("2d");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };

let width = 0;
let height = 0;
let pixelRatio = 1;
let animationFrame;

function resize() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function drawLine(x1, y1, x2, y2, opacity = 0.12) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = `rgba(185, 108, 255, ${opacity})`;
    context.stroke();
}

function drawRibbon(centerX, centerY, ribbonWidth, ribbonHeight, time) {
    context.save();
    context.translate(centerX, centerY);
    context.rotate(-0.06);

    for (let index = -3; index <= 3; index++) {
        const drift = reducedMotion.matches ? 0 : Math.sin(time * 0.0004 + index) * 8;
        const offset = index * ribbonHeight * 0.075 + drift;

        context.beginPath();
        context.moveTo(-ribbonWidth * 0.54, ribbonHeight * 0.28 + offset);
        context.bezierCurveTo(
            -ribbonWidth * 0.24, -ribbonHeight * 0.72 + offset,
            ribbonWidth * 0.18, ribbonHeight * 0.66 + offset,
            ribbonWidth * 0.54, -ribbonHeight * 0.3 + offset
        );

        context.strokeStyle = index === 0
            ? "rgba(185, 108, 255, 0.2)"
            : `rgba(243, 239, 246, ${0.075 - Math.abs(index) * 0.008})`;
        context.setLineDash(index === -2 ? [5, 11] : []);
        context.stroke();
    }

    context.setLineDash([]);
    context.restore();
}

function draw(time = 0) {
    context.clearRect(0, 0, width, height);
    pointer.x += (pointer.targetX - pointer.x) * 0.035;
    pointer.y += (pointer.targetY - pointer.y) * 0.035;

    const spacing = Math.max(48, Math.min(width, height) / 10);
    const drift = reducedMotion.matches ? 0 : (time * 0.012) % spacing;
    const offsetX = pointer.x * 16;
    const offsetY = pointer.y * 10;

    context.lineWidth = 1;
    for (let x = -spacing + drift; x < width + spacing; x += spacing) {
        drawLine(x + offsetX, 0, x - width * 0.18 + offsetX, height, 0.075);
    }
    for (let y = -spacing + drift; y < height + spacing; y += spacing) {
        drawLine(0, y + offsetY, width, y + height * 0.08 + offsetY, 0.055);
    }

    const centerX = width * 0.5 + pointer.x * 28;
    const centerY = height * 0.48 + pointer.y * 20;
    const ribbonWidth = Math.min(width * 0.78, 1080);
    const ribbonHeight = Math.min(height * 0.58, 580);
    drawRibbon(centerX, centerY, ribbonWidth, ribbonHeight, time);

    if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(draw);
    }
}

function start() {
    cancelAnimationFrame(animationFrame);
    draw();
}

window.addEventListener("resize", () => {
    resize();
    if (reducedMotion.matches) draw();
});

window.addEventListener("pointermove", (event) => {
    pointer.targetX = event.clientX / width - 0.5;
    pointer.targetY = event.clientY / height - 0.5;
});

reducedMotion.addEventListener("change", start);
document.querySelector("#year").textContent = new Date().getFullYear();
resize();
start();