import * as THREE from '.././lib/three.module.js';
import { OrbitControls } from '.././lib/OrbitControls.js'

export const scene = new THREE.Scene();
export const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000);
export const renderer = new THREE.WebGLRenderer();
export const light = new THREE.AmbientLight( 0x404040 ); // soft white light
export const directionalLight = new THREE.DirectionalLight( 0xffffff, 1.5 );
export const controls = new OrbitControls(camera, renderer.domElement);
export let container
export function setupScene() {
	//camera
	camera.position.z = 45
	camera.position.x = 0
	camera.position.y = 0

	//controls	
	/*
	controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
	controls.dampingFactor = 0.06;
	
	controls.minDistance = 37;
	controls.maxDistance = 37;
	
	controls.maxAzimuthAngle = -.01;	
    controls.minAzimuthAngle = .01;	
	controls.maxPolarAngle = 0
	controls.staticMoving  = false;
	controls.autoRotate = false;
	

	controls.screenSpacePanning = false;
	controls.maxPolarAngle = Math.PI * 2;
	controls.minPolarAngle = -Math.PI * 2;
	controls.screenSpacePanning = true;
	controls.enablePan = false
		*/
	controls.enabled = false

	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.outputEncoding = THREE.sRGBEncoding;
	
	//renderer
	renderer.setSize( window.innerWidth, window.innerHeight );
	// scene
	scene.background = new THREE.Color( 0x000 );
	//light
	directionalLight.position.x = 0;
	directionalLight.position.y = 50;
	directionalLight.position.z = 50;
	scene.add( light );
	scene.add( directionalLight );
	//document.getElementById( 'container' ).appendChild( renderer.domElement );
	container = document.getElementById('container');
	container.appendChild(renderer.domElement);

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );
}

export function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

// export {setupScene}; 
