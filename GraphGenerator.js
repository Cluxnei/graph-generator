import Graph from './Graph.js';
import Vertex from './Vertex.js';
import Vector2 from './Vector2.js';
import { verticesCount, radiusRange, positionRange, allowDisconnectedVertices } from './Constants.js';
import { rand, initCanvas, updateCanvas, randomColorExceptWhite } from './Helpers.js';

const vertices = [];
const edges = [];

for (let i = 0; i < verticesCount; i++) {
    const position = new Vector2(rand(...positionRange), rand(...positionRange));
    const radius = rand(...radiusRange);
    const color = randomColorExceptWhite();
    const vertex = new Vertex(radius, position, color);
    vertices.push(vertex);
}

const graph = new Graph(vertices, edges);

graph.generateRandomEdges(vertices.length - 1);
if (!allowDisconnectedVertices) {
    graph.removeDisconnectedVertices();
}

window.onload = () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    initCanvas(canvas);
    const loop = () => {
        updateCanvas(canvas, ctx);
        graph.render(ctx);
        requestAnimationFrame(loop);
    };
    loop();
    const controlButton = document.getElementById('controls-button');
    const controlsContainer = document.getElementById('controls');
    const toggleControlsContainer = open => {
        if (open) {
            controlsContainer.style.display = '';
            return;
        }
        controlsContainer.style.display = 'none';
    };
    const handleControlButtonClick = () => {
        const opened = controlButton.getAttribute('data-opened') === 'true';
        if (opened) {
            toggleControlsContainer(false);
            controlButton.setAttribute('data-opened', 'false');
            return;
        }
        toggleControlsContainer(true);
        controlButton.setAttribute('data-opened', 'true');
        return;
    };
    controlButton.addEventListener('click', handleControlButtonClick);
    const fillSettingsValues = () => {
        document.getElementById('allowDisconnectedVertices').checked = allowDisconnectedVertices;
        document.getElementById('minRadius').value = radiusRange[0];
        document.getElementById('maxRadius').value = radiusRange[1];
        document.getElementById('minPosition').value = positionRange[0];
        document.getElementById('maxPosition').value = positionRange[1];
    };
    fillSettingsValues();
};

console.log(graph);