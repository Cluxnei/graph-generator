import { initialZoom, backgroundColor } from './Constants.js';

export const rand = (min, max) => Math.floor(min + max * Math.random());

export const diffFromArrow = (vertex1, vertex2, size) =>
    vertex2.position.copy().sub(vertex1.position).normalize().scale(vertex2.radius + size);

export const initCanvas = (canvas) => {
    canvas.zoom = initialZoom;
    canvas.positionX = 0;
    canvas.positionY = 0;
    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas, false);
    canvas.addEventListener('mousemove', function(event) {
        if (!canvas.dragging) {
            return;
        }
        canvas.positionX = (canvas.positionX || 0) + event.movementX;
        canvas.positionY = (canvas.positionY || 0) + event.movementY;
    });
    canvas.addEventListener('mousedown', function drag() {
        canvas.dragging = true;
    });
    canvas.addEventListener('mouseup', function() {
        canvas.dragging = false;
    });
    canvas.addEventListener('wheel', function(event) {
        canvas.zoom -= event.deltaY / 1000 * canvas.zoom;
    });
    resizeCanvas();
    return canvas;
}

export const updateCanvas = (canvas, ctx) => {
    const zoom = canvas.zoom;
    const x = canvas.positionX || 0;
    const y = canvas.positionY || 0;
    ctx.resetTransform();
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    ctx.translate(canvas.clientWidth / 2 + x, canvas.clientHeight / 2 + y);
    ctx.scale(zoom, zoom);
}

export const renderArrow = (ctx, fromX, fromY, toX, toY, size) => {
    let x_center = toX;
    let y_center = toY;
    ctx.beginPath();
    let angle = Math.atan2(toY - fromY, toX - fromX)
    let x = size * Math.cos(angle) + x_center;
    let y = size * Math.sin(angle) + y_center;
    ctx.moveTo(x, y);
    angle += (1 / 3) * (2 * Math.PI)
    x = size * Math.cos(angle) + x_center;
    y = size * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
    angle += (1 / 3) * (2 * Math.PI)
    x = size * Math.cos(angle) + x_center;
    y = size * Math.sin(angle) + y_center;
    ctx.lineTo(x, y);
    ctx.closePath();
    ctx.fill();
}

export const randomColorExceptWhite = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
};