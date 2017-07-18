// global vaiables
var scene, controls, camera, renderer;

container = document.getElementById('configurator');
var WIDTH = $(container).width();
var HEIGHT = $(container).height();

var SPEED = 0.0005;
var MODELSCALE = 0.8;

var tearModel1 = tearModel2 = null;

var loader = new THREE.JSONLoader();

 /* =============================================================================================== 
    LAUCH
    =============================================================================================== */
$(document).ready(function() { 

    init();
    render();

});

/* =============================================================================================== 
   FUNCTION
   =============================================================================================== */

function init() {
    scene = new THREE.Scene();
    // init common element
    initCamera();
    initLights();
    initRenderer();
    // init mesh
    initGlassModel();
    // initTearsModel2();
    // render
    container.appendChild(renderer.domElement);
    // control
    initControl();
}

function initCamera() {
    camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 1, 10);
    camera.position.set(0, 3.5, 5);
    camera.lookAt(scene.position);
}

function initRenderer() {
    // renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(WIDTH, HEIGHT);
    // renderer.setClearColor(0xff0000, 1);
    renderer.setClearColor( 0xF4F4F4, 1);

}

function initControl() {
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.addEventListener('change', render); // use if thre is no animatio nloop
}

function initLights() {
    var light = new THREE.AmbientLight(0xffffff);
    scene.add(light);
}

function initGlassModel() {
    loader.load('js/Glasses3.json', function(geometry, materials) {
         glassModel = new THREE.Mesh(geometry, materials);
        glassModel.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
        glassModel.scale.set(MODELSCALE, MODELSCALE, MODELSCALE);
        scene.add(glassModel);
    });
}


function rotateMesh() {
    if (!glassModel) {
       return;
    }
     glassModel.rotation.y += SPEED * 2;
     glassModel.rotation.x += SPEED * 2;
}

function render() {
    requestAnimationFrame(render);
    rotateMesh();
    renderer.render(scene, camera);
}

