import Edge from './Edge.js';
import { rand } from './Helpers.js';

export default class Graph {
    constructor(vertices, edges) {
        this.vertices = vertices;
        this.edges = edges || [];
    }
    generateRandomEdges(maxEdges) {
        while (this.edges.length < maxEdges) {
            const vertex1 = this.vertices[rand(0, this.vertices.length)];
            const vertex2 = this.vertices[rand(0, this.vertices.length)];
            if (vertex1 === vertex2) {
                continue;
            }
            this.edges.push(new Edge(vertex1, vertex2));
        }
    }
    removeDisconnectedVertices() {
        this.vertices = this.vertices.filter(vertex =>
            this.edges.findIndex(({ vertex1, vertex2 }) =>
                vertex === vertex1 || vertex === vertex2) !== -1
        );
    }
    render(ctx) {
        this.renderEdges(ctx);
        this.renderVertices(ctx);
    }
    renderVertices(ctx) {
        this.vertices.forEach(vertex => vertex.render(ctx));
    }
    renderEdges(ctx) {
        this.edges.forEach(edge => edge.render(ctx));
    }
}