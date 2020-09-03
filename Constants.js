const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let minRadius = urlParams.has('minRadius') ? parseInt(urlParams.get('minRadius'), 10) : 10;
let maxRadius = urlParams.has('maxRadius') ? parseInt(urlParams.get('maxRadius')) : 50;

if (minRadius < 1) {
    minRadius = 1;
}
if (maxRadius < 1) {
    maxRadius = 1;
}

export const radiusRange = [minRadius, maxRadius];

export const positionRange = urlParams.has('minPosition') && urlParams.has('maxPosition') ? [
    parseInt(urlParams.get('minPosition'), 10),
    parseInt(urlParams.get('maxPosition'), 10)
] : [-3000, 6000];

export const verticesCount = urlParams.has('verticesCount') ? parseInt(urlParams.get('verticesCount'), 10) : 200;

export const allowDisconnectedVertices = urlParams.has('allowDisconnectedVertices') ?
    urlParams.get('allowDisconnectedVertices') === 'on' : false;

export const initialZoom = 0.4;

export const backgroundColor = '#000';

export const lineColor = '#fff';

export const arrowSize = 10;