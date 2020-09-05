import Edge from './Edge.js';
import { rand, randomColorExceptWhite } from './Helpers.js';
import { verticesCount, positionRange, radiusRange } from './Constants.js';
import Vertex from './Vertex.js';
import Vector2 from './Vector2.js';

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
    hasDisconnectedVertices() {
        return this.vertices.findIndex(vertex =>
            this.edges.findIndex(({ vertex1, vertex2 }) =>
                vertex === vertex1 || vertex === vertex2) === -1
        ) !== -1;
    }
    generateAdditionalVertices() {
        let newVerticesCount = verticesCount - this.vertices.length;
        if (newVerticesCount <= 0) {
            return;
        }
        while (newVerticesCount-- > 0) {
            const radius = rand(...radiusRange);
            const position = new Vector2(rand(...positionRange), rand(...positionRange));
            const color = randomColorExceptWhite();
            const vertex = new Vertex(radius, position, color);
            const lastIndex = this.vertices.push(vertex) - 1;
            let connectedVertexIndex = rand(0, this.vertices.length);
            while (connectedVertexIndex === lastIndex) {
                connectedVertexIndex = rand(0, this.vertices.length);
            };
            this.edges.push(new Edge(this.vertices[lastIndex], this.vertices[connectedVertexIndex]));
        }
    }
    replaceDisconnectedVertices() {
        while (this.hasDisconnectedVertices()) {
            this.removeDisconnectedVertices();
            this.generateAdditionalVertices();
        }
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