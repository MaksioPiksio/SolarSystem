import "./index.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { PlanetType } from "./assets/types.js";
import { movePlanetPosition, moveCameraPosition } from "./assets/functions.js";
import { addPlanet } from "./assets/functions.js";
import { planety } from "./assets/functions.js";

export const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); //prettier-ignore
const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector("#bg") as HTMLCanvasElement, }); //prettier-ignore

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.set(0, 50, 170);
renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff, 1000);
pointLight.position.set(-100, 0, 0);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

new OrbitControls(camera, renderer.domElement);

scene.background = new THREE.TextureLoader().load("/space.jpg");

planety.forEach((el) => addPlanet(el));

document.querySelectorAll("li").forEach((item: Element) => {
    item.addEventListener("click", async () => {
        let planetName = item.textContent;
        let planetData = planety.find((planet) => planet[0] === planetName)!;

        planety.forEach((el) => movePlanetPosition(el, planetData[1]));

        await moveCameraPosition(
            camera,
            new THREE.Vector3(
                0,
                planetName === "sun" ? 50 : 10,
                planetName === "sun" ? planetData[2] + 70 : planetData[2] + 10
            ),
            1000
        );

        camera.lookAt(new THREE.Vector3(0, 0, 0));
    });
});

const animate = () => {
    requestAnimationFrame(animate);
    planety.forEach((el: PlanetType) => (el[3]!.rotation.y += 0.005));
    planety[0][3]!.rotation.y -= 0.0045;
    renderer.render(scene, camera);
};

animate();
