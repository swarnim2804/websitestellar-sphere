// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const planetInfo = {
    mercury: 'Mercury: Closest planet to the Sun.',
    venus: 'Venus: The hottest planet.',
    earth: 'Earth: Our home planet.',
    mars: 'Mars: Known as the Red Planet.',
    jupiter: 'Jupiter: The largest planet.',
    saturn: 'Saturn: Famous for its rings.',
    uranus: 'Uranus: Tilted on its side.',
    neptune: 'Neptune: The farthest planet.'
};

// Show planet info when clicked
const showPlanetInfo = (planetName) => {
    const planetDetails = planetInfo[planetName.toLowerCase()];
    if (planetDetails) {
        const planetInfoBox = document.getElementById('planet-info');
        const planetDetailsElement = document.getElementById('planet-details');

        // Populate the info box with the planet's details
        planetDetailsElement.innerHTML = `<h2>${planetName}</h2><p>${planetDetails}</p>`;
        
        // Display the info box
        planetInfoBox.style.display = 'block';
    }
};

// Close planet info box
const closeInfo = () => {
    const planetInfoBox = document.getElementById('planet-info');
    planetInfoBox.style.display = 'none';
};

// Add event listener for mouse clicks
window.addEventListener('click', (event) => {
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both axes
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Check for intersections with planets
    const intersects = raycaster.intersectObjects(planets);

    if (intersects.length > 0) {
        const selectedPlanet = intersects[0].object; // Get the clicked planet
        showPlanetInfo(selectedPlanet.name);         // Display its info
    }
});

// Rotating and Orbiting logic
function animate() {
    requestAnimationFrame(animate);

    // Rotate Sun
    sun.rotation.y += 0.002;

    // Rotate planets around their own axis
    planets.forEach(planet => planet.rotation.y += 0.01);

    // Orbit planets around the Sun
    for (let i = 0; i < planets.length; i++) {
        angle[i] += 0.01; // Speed of orbit
        planets[i].position.x = Math.cos(angle[i]) * orbitRadius[i];
        planets[i].position.z = Math.sin(angle[i]) * orbitRadius[i];
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Camera position
camera.position.z = 50;

// Resize function to handle window resizing
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

// Call the animate function
animate();
