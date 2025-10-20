# � Solar System Simulator (Three.js + Electron)

---

## 👥 Group Members

- **Jerby B. Calo**
- **Benjamin A. Pariñas**
- **Laurence L. Meniano**

---

## 📘 Project Overview

This project is an **interactive 3D Solar System simulator** developed using **Three.js**, **Electron.js**, **HTML**, **CSS**, and **JavaScript (ES6 Modules)**.  
The application provides a realistic visualization of the Solar System with all eight planets orbiting the Sun, complete with orbital paths, planet labels, and smooth camera controls.

### 🎯 Features

- 🌟 **Starfield Background** — 2000 dynamic stars surrounding the solar system
- ☀️ **Sun Visualization** — Textured sun at the center of the system
- � **8 Planets** — Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune
- 🌙 **Moon System** — Earth's Moon orbiting in real-time
- 💫 **Saturn's Rings** — Realistic ring system for Saturn
- � **Orbital Mechanics** — Planets orbit at different speeds with visible orbit paths
- 🷺 **Planet Labels** — Text labels for all celestial bodies
- 🎮 **Orbit Controls** — Interactive camera with damping for smooth navigation

---

## 🧩 Tech Stack

- **Three.js** — 3D graphics library
- **Electron.js** — Desktop application framework
- **HTML5**, **CSS3** — Frontend interface
- **JavaScript (ES6 Modules)** — Application logic
- **Texture Assets** — High-quality planet textures

---

## 📂 Project Structure

```
├── main.js              # Electron main process
├── preload.js           # Electron preload script
├── package.json         # Dependencies and metadata
├── src/
│   ├── index.html       # Application entry point
│   ├── renderer.js      # Three.js scene and animation logic
│   └── style.css        # Application styling
└── assets/
    └── textures/        # Planet and celestial body textures
        ├── sun.jpg
        ├── mercury.jpg
        ├── venus.jpg
        ├── earth.jpg
        ├── mars.jpg
        ├── jupiter.jpg
        ├── saturn.jpg
        ├── saturn-ring.png
        ├── uranus.jpg
        ├── neptune.jpg
        └── moon.jpg
```

---

## 🚀 Setup and Run

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start the Application

```bash
npm start
```

The application will launch an Electron window displaying the interactive Solar System simulator.

---

## 🎮 Controls

- **Mouse Drag** — Rotate the view around the solar system
- **Mouse Wheel** — Zoom in and out
- **Mouse Movement** — Smooth camera damping for fluid interaction

---

## 📦 Dependencies

- **three** (^0.180.0) — 3D graphics library
- **lil-gui** (^0.21.0) — GUI controls library
- **gsap** (^3.13.0) — Animation library
- **electron** (^38.3.0) — Desktop app framework (dev dependency)
