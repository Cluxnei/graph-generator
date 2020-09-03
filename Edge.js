import { lineColor, arrowSize } from './Constants.js';
import { renderArrow, diffFromArrow } from './Helpers.js';

export default class Edge {
    constructor(vertex1, vertex2, biDirectional = false) {
        this.vertex1 = vertex1;
        this.vertex2 = vertex2;
        this.biDirectional = biDirectional;
    }
    render(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.fillStyle = lineColor;
        ctx.lineWidth = 1;
        ctx.lineJoin = 'butt';
        ctx.moveTo(this.vertex1.position.x, this.vertex1.position.y);
        ctx.lineTo(this.vertex2.position.x, this.vertex2.position.y);
        ctx.stroke();
        const size = this.vertex2.radius / 5;
        const diff = diffFromArrow(this.vertex1, this.vertex2, size);
        renderArrow(
            ctx,
            this.vertex1.position.x,
            this.vertex1.position.y,
            this.vertex2.position.x - diff.x,
            this.vertex2.position.y - diff.y,
            size
        );
        if (this.biDirectional) {
            renderArrow(
                ctx,
                this.vertex2.position.x,
                this.vertex2.position.y,
                this.vertex1.position.x - diff.x,
                this.vertex1.position.y - diff.y,
                size
            );
        }
    }
}