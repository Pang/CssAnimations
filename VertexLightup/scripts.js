const glowIntervalTime = 150;
const noOfVertices = 24; // multiple of 6

var verticesWrapper = document.getElementById('verticesWrapper');

for (var i = 0; i < noOfVertices; i++) {
    var vertexDiv = document.createElement('div');
    vertexDiv.className = 'vertexPoint';
    verticesWrapper.appendChild(vertexDiv);
}

var vertices = document.getElementsByClassName('vertexPoint');

for (var i = 0; i < vertices.length; i++) {
    AddVertexGlowClass(i);
}

function AddVertexGlowClass(i) {
    setTimeout(function() {
        vertices[i].classList.add("vertexGlow");
    }, glowIntervalTime * i);
  }