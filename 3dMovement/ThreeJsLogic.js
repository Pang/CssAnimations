const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const gltfLoader = new THREE.GLTFLoader();

// set camera, screen size & append to webpage
camera.position.z = 5;
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth, window.innerHeight);
scene.background = new THREE.Color(0xc6cfd7);
document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

// load the model
var mesh;
gltfLoader.load('./CapsuleEnemy.glb', (gltf) => {
    mesh = gltf.scene;
    scene.add(mesh);
});

// set lighting
const light = new THREE.PointLight(0xffffff, 5, 1000);
light.position.set(10, 0, 100);
scene.add(light);

// event listeners for rotation interaction
var mouseDown;
window.addEventListener('mousedown', () => mouseDown = true);
window.addEventListener('mouseup', () => mouseDown = false);
window.addEventListener('mousemove', dragObjectAround);

var lastMouseX;
var lastMouseY;
function dragObjectAround(event) {
    if (mouseDown) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        // For rotating along the mesh X axis
        var Ydiff = Math.abs(lastMouseY - mouse.y);
        if (Ydiff > 0.001 || Ydiff < -0.001) {
            if (lastMouseY < mouse.y) mesh.rotation.x += 0.1;
            else mesh.rotation.x -= 0.1;
        }

        // For rotating along the mesh Y axis
        var Xdiff = Math.abs(lastMouseX - mouse.x);
        if (Xdiff > 0.001 || Xdiff < -0.001) {
            if (lastMouseX < mouse.x) mesh.rotation.y += 0.1;
            else mesh.rotation.y -= 0.1;
        }

        lastMouseY = mouse.y;
        lastMouseX = mouse.x;
    }
}

// zooms camera in and out slowly
var zoomInCam;
function cameraSceneZooming() {
    if (camera.position.z <= 5 && camera.position.z < 6) zoomInCam = true; 
    else if (camera.position.z > 6) zoomInCam = false;

    if (zoomInCam)camera.position.z += 0.005;
    else camera.position.z -= 0.005;
}

// render frames
var render = function () {
    cameraSceneZooming();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render();

// btn logic for mobile view
function rotateDir(dir) {
    switch (dir) {
        case 'right':
            mesh.rotation.y += 0.2;
            break;
        case 'left':
            mesh.rotation.y -= 0.2;
            break;
        case 'up':
            mesh.rotation.x -= 0.2;
            break;
        case 'down':
            mesh.rotation.x += 0.2;
            break;
        default:
            break;
    }
}