const THREE = require("three");
const {
  OrbitControls,
} = require("three/examples/jsm/controls/OrbitControls.js");
const path = require("path");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
camera.position.set(0, 15, 50);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Texture loader
const loader = new THREE.TextureLoader();

// --- Starfield ---
function createStars() {
  const starGeometry = new THREE.BufferGeometry();
  const starMaterial = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.5,
  });

  const starVertices = [];
  for (let i = 0; i < 2000; i++) {
    const x = (Math.random() - 0.5) * 2000;
    const y = (Math.random() - 0.5) * 2000;
    const z = (Math.random() - 0.5) * 2000;
    starVertices.push(x, y, z);
  }

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVertices, 3)
  );
  const stars = new THREE.Points(starGeometry, starMaterial);
  scene.add(stars);
}
createStars();

// --- Sun ---
const sunGeo = new THREE.SphereGeometry(5, 32, 32);
const sunMat = new THREE.MeshBasicMaterial({
  map: loader.load(path.join(__dirname, "../assets/textures/sun.jpg")),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Add Sun label
const sunLabel = createTextSprite("Sun", 8);
sunLabel.position.set(0, 8, 0);
sun.add(sunLabel);

// --- Helper function to create text sprite ---
function createTextSprite(text, size = 5) {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 256;

  // Draw text
  context.fillStyle = "#ffffff";
  context.font = "Bold 60px Arial";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, 128, 128);

  // Create texture from canvas
  const texture = new THREE.CanvasTexture(canvas);
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(size, size * 0.5, 1);
  return sprite;
}

// --- Helper function to create orbit lines ---
function createOrbitLine(distance) {
  const points = [];
  const segments = 256;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    const x = distance * Math.cos(angle);
    const z = distance * Math.sin(angle);
    points.push(new THREE.Vector3(x, 0, z));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0x444444,
    transparent: true,
    opacity: 0.5,
  });
  const orbitLine = new THREE.Line(geometry, material);
  scene.add(orbitLine);
}

// --- Planets ---
function createPlanet(name, radius, texture, distance) {
  const geo = new THREE.SphereGeometry(radius, 32, 32);
  const mat = new THREE.MeshBasicMaterial({
    map: loader.load(path.join(__dirname, `../assets/textures/${texture}`)),
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(distance, 0, 0);
  scene.add(mesh);

  // Add name label
  const label = createTextSprite(name, 6);
  label.position.set(0, radius + 3, 0);
  mesh.add(label);

  return mesh;
}

const mercury = createPlanet("Mercury", 0.5, "mercury.jpg", 8);
const venus = createPlanet("Venus", 1.2, "venus.jpg", 11);
const earth = createPlanet("Earth", 1.3, "earth.jpg", 15);
const mars = createPlanet("Mars", 1, "mars.jpg", 19);
const jupiter = createPlanet("Jupiter", 3, "jupiter.jpg", 25);
const saturn = createPlanet("Saturn", 2.5, "saturn.jpg", 32);
const uranus = createPlanet("Uranus", 2, "uranus.jpg", 38);
const neptune = createPlanet("Neptune", 2, "neptune.jpg", 44);

// --- Create orbit lines ---
createOrbitLine(8);
createOrbitLine(11);
createOrbitLine(15);
createOrbitLine(19);
createOrbitLine(25);
createOrbitLine(32);
createOrbitLine(38);
createOrbitLine(44);

// --- Saturn Ring ---
const saturnRingTex = loader.load(
  path.join(__dirname, "../assets/textures/saturn-ring.png")
);
const saturnRingGeo = new THREE.RingGeometry(3, 5, 64);
const saturnRingMat = new THREE.MeshBasicMaterial({
  map: saturnRingTex,
  side: THREE.DoubleSide,
  transparent: true,
});
const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat);
saturnRing.rotation.x = Math.PI / 2;
saturn.add(saturnRing);

// --- Moon ---
const moonGeo = new THREE.SphereGeometry(0.35, 32, 32);
const moonMat = new THREE.MeshBasicMaterial({
  map: loader.load(path.join(__dirname, "../assets/textures/moon.jpg")),
});
const moon = new THREE.Mesh(moonGeo, moonMat);
scene.add(moon);

// Add Moon label
const moonLabel = createTextSprite("Moon", 4);
moonLabel.position.set(0, 1, 0);
moon.add(moonLabel);

// --- Animation ---
function animate() {
  requestAnimationFrame(animate);

  const time = Date.now() * 0.001;

  // Rotate Sun
  sun.rotation.y += 0.001;

  // Planets orbit
  mercury.position.x = 8 * Math.cos(time * 4);
  mercury.position.z = 8 * Math.sin(time * 4);

  venus.position.x = 11 * Math.cos(time * 1.5);
  venus.position.z = 11 * Math.sin(time * 1.5);

  earth.position.x = 15 * Math.cos(time * 1);
  earth.position.z = 15 * Math.sin(time * 1);

  mars.position.x = 19 * Math.cos(time * 0.8);
  mars.position.z = 19 * Math.sin(time * 0.8);

  jupiter.position.x = 25 * Math.cos(time * 0.2);
  jupiter.position.z = 25 * Math.sin(time * 0.2);

  saturn.position.x = 32 * Math.cos(time * 0.15);
  saturn.position.z = 32 * Math.sin(time * 0.15);

  uranus.position.x = 38 * Math.cos(time * 0.1);
  uranus.position.z = 38 * Math.sin(time * 0.1);

  neptune.position.x = 44 * Math.cos(time * 0.05);
  neptune.position.z = 44 * Math.sin(time * 0.05);

  // Moon orbiting Earth
  moon.position.x = earth.position.x + 2 * Math.cos(time * 4);
  moon.position.z = earth.position.z + 2 * Math.sin(time * 4);

  controls.update();
  renderer.render(scene, camera);
}
animate();

// --- Handle window resize ---
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
