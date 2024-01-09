import * as THREE from "three";
import { PlanetType } from "./types";
import { scene } from "../main";

export const movePlanetPosition = async (
    el: PlanetType,
    planetPosition: number
) => {
    if (el[3]) {
        let speed = Math.abs(el[3].position.x - (el[1] - planetPosition)) / 10;

        while (el[3].position.x < el[1] - planetPosition) {
            el[3].position.x += speed;
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
        while (el[3].position.x > el[1] - planetPosition) {
            el[3].position.x -= speed;
            await new Promise((resolve) => setTimeout(resolve, 1));
        }
        el[3].position.x = el[1] - planetPosition;
    }
};

export const moveCameraPosition = async (
    camera: THREE.PerspectiveCamera,
    targetPosition: THREE.Vector3,
    duration: number
) => {
    const startPosition = camera.position.clone();
    const startTime = Date.now();
    return new Promise<void>((resolve) => {
        const animateCamera = () => {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;
            const t = Math.min(1, elapsedTime / duration);
            camera.position.lerpVectors(startPosition, targetPosition, t);

            if (t < 1) requestAnimationFrame(animateCamera);
            else resolve();
        };
        animateCamera();
    });
};

export const addPlanet = (arr: PlanetType) => {
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(arr[2], 32, 32),
        new THREE.MeshStandardMaterial({
            map: new THREE.TextureLoader().load(`${arr[0]}.jpg`),
        })
    );
    planet.position.set(arr[1], 0, 0);
    scene.add(planet);
    arr[3] = planet;
};
