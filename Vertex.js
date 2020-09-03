export default class Vertex {
    constructor(radius, position, color) {
        this.radius = radius;
        this.position = position;
        this.color = color;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 360);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
}