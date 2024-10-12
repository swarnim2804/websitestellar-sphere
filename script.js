gsap.registerPlugin(ScrollTrigger);

  // Asteroid Scene
  const sceneAsteroid = new THREE.Scene();
  const cameraAsteroid = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const rendererAsteroid = new THREE.WebGLRenderer({ antialias: true });
  rendererAsteroid.setSize(window.innerWidth, window.innerHeight);
  document.getElementById('scene').appendChild(rendererAsteroid.domElement);

  const geometry = new THREE.SphereGeometry(3, 32, 32);
  const textureLoader = new THREE.TextureLoader();
  const material = new THREE.MeshBasicMaterial({ map: textureLoader.load('asteroid.png') });
  const asteroid = new THREE.Mesh(geometry, material);
  sceneAsteroid.add(asteroid);
  asteroid.position.set(-30, 20, -10);
  cameraAsteroid.position.z = 10;

  const animateAsteroid = function () {
    requestAnimationFrame(animateAsteroid);
    rendererAsteroid.render(sceneAsteroid, cameraAsteroid);
  };

  animateAsteroid();

  function fallAndBlast() {
    gsap.to(asteroid.position, {
      x: 15,
      y: -10,
      duration: 1,
      ease: "power1.in",
      onComplete: () => {
        createBlast(asteroid.position.x, asteroid.position.y, asteroid.position.z);
        sceneAsteroid.remove(asteroid);
        showButtons();
      }
    });
  }

  function createBlast(x, y, z) {
    const blastGeometry = new THREE.CircleGeometry(5, 32);
    const blastMaterial = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load('blast.png'),
      transparent: true
    });
    const blast = new THREE.Mesh(blastGeometry, blastMaterial);
    blast.position.set(x, y, z);
    sceneAsteroid.add(blast);
    gsap.to(blast.scale, {
      x: 4,
      y: 4,
      duration: 1,
      onComplete: () => {
        sceneAsteroid.remove(blast);
      }
    });
  }

  function showButtons() {
    const button1 = document.getElementById('mysteryButton1');
    const button2 = document.getElementById('mysteryButton2');

    button1.style.display = 'block';
    button2.style.display = 'block';

    setTimeout(() => {
      button1.style.opacity = '1';
      button2.style.opacity = '1';
    }, 2000);
  }

  // Add event listeners for buttons
  document.getElementById('mysteryButton1').addEventListener('click', () => {
    const section1 = document.getElementById('button1section');
    section1.style.display = 'flex'; 
    section1.classList.add('show'); 
    
    // Hide scene
    document.getElementById('scene').style.display = 'none';
    
    // Hide buttons
    document.getElementById('mysteryButton1').style.display = 'none';
    document.getElementById('mysteryButton2').style.display = 'none';
  });

  document.getElementById('mysteryButton2').addEventListener('click', () => {
    const section2 = document.getElementById('button2section');
    section2.style.display = 'flex'; 
    section2.classList.add('show'); 

    // Hide scene
    document.getElementById('scene').style.display = 'none';

    // Hide buttons
    document.getElementById('mysteryButton1').style.display = 'none';
    document.getElementById('mysteryButton2').style.display = 'none';

    // Initialize starfield
    initStarfield();
  });

  ScrollTrigger.create({
    trigger: "#mystery",
    start: "top 80%",
    once: true,
    onEnter: () => {
      setTimeout(fallAndBlast, 1000);
    }
  });

  // Starfield
  let sceneStars, cameraStars, rendererStars, starGeo, stars;
  const starCount = 6000;
  const acceleration = 1; // Acceleration for star movement

  function initStarfield() {
    // Create the scene for the starfield
    sceneStars = new THREE.Scene();

    // Create the camera
    cameraStars = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    cameraStars.position.z = 15; // Adjusted for better visibility
    cameraStars.rotation.x = Math.PI / 4; // Slightly tilted down

    // Create the renderer
    rendererStars = new THREE.WebGLRenderer();
    rendererStars.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('starfield').appendChild(rendererStars.domElement);

    // Create the stars
    createStars();

    // Start animation
    animateStarfield();
  }

  function createStars() {
    starGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3); // x, y, z for each star

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = Math.random() * 600 - 300; // x
      positions[i * 3 + 1] = Math.random() * 600 - 300; // y
      positions[i * 3 + 2] = Math.random() * 600 - 300; // z
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const sprite = new THREE.TextureLoader().load('star.png');
    const starMaterial = new THREE.PointsMaterial({
      color: 0xaaaaaa,
      size: 0.7,
      map: sprite,
      transparent: true
    });

    stars = new THREE.Points(starGeo, starMaterial);
    sceneStars.add(stars);
  }

  function animateStarfield() {
    // Update star positions
    for (let i = 0; i < stars.geometry.attributes.position.count; i++) {
      stars.geometry.attributes.position.array[i * 3 + 1] -= acceleration; // Move each star down

      if (stars.geometry.attributes.position.array[i * 3 + 1] < -200) {
        stars.geometry.attributes.position.array[i * 3 + 1] = 200; // Reset position
      }
    }

    // Notify Three.js that the positions have changed
    stars.geometry.attributes.position.needsUpdate = true;

    // Render the scene
    rendererStars.render(sceneStars, cameraStars);
    requestAnimationFrame(animateStarfield);
  }

  // Handle window resizing for both scenes
  window.addEventListener('resize', () => {
    cameraAsteroid.aspect = window.innerWidth / window.innerHeight;
    cameraAsteroid.updateProjectionMatrix();
    rendererAsteroid.setSize(window.innerWidth, window.innerHeight);

    if (rendererStars) {
      cameraStars.aspect = window.innerWidth / window.innerHeight;
      cameraStars.updateProjectionMatrix();
      rendererStars.setSize(window.innerWidth, window.innerHeight);
    }
  });
  gsap.to("#ufoAnimation",{
    x:1200,
    duration:10,
    delay:1,
    yoyo:true,
    ease: "back.out(2.5)",
    repeat:-1,
  });

  document.getElementById("button1").addEventListener("click", function() {
    // Show Past Section, Hide Others
    document.getElementById("past").style.display = "block";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button2").addEventListener("click", function() {
    // Show Present Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "block";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button3").addEventListener("click", function() {
    // Show Future Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "block";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

// Buttons inside the "Past" section
document.getElementById("button2-past").addEventListener("click", function() {
    // Show Present Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "block";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button3-past").addEventListener("click", function() {
    // Show Future Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "block";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

// Buttons inside the "Present" section
document.getElementById("button1-present").addEventListener("click", function() {
    // Show Past Section, Hide Others
    document.getElementById("past").style.display = "block";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button3-present").addEventListener("click", function() {
    // Show Future Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "block";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

// Buttons inside the "Future" section
document.getElementById("button1-future").addEventListener("click", function() {
    // Show Past Section, Hide Others
    document.getElementById("past").style.display = "block";
    document.getElementById("present").style.display = "none";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button2-future").addEventListener("click", function() {
    // Show Present Section, Hide Others
    document.getElementById("past").style.display = "none";
    document.getElementById("present").style.display = "block";
    document.getElementById("future").style.display = "none";
    document.getElementById("clock").style.display = "none";
    document.getElementById("past1").style.display = "none";
    document.getElementById("present1").style.display = "none";
    document.getElementById("future1").style.display = "none";
});

document.getElementById("button1-next").addEventListener("click", function() {
  // Show Present Section, Hide Others
  document.getElementById("past1").style.display = "block";
  document.getElementById("present").style.display = "none";
  document.getElementById("future").style.display = "none";
  document.getElementById("clock").style.display = "none";
  document.getElementById("past").style.display = "none";
  document.getElementById("present1").style.display = "none";
  document.getElementById("future1").style.display = "none";
});
document.getElementById("button2-next").addEventListener("click", function() {
  // Show Present Section, Hide Others
  document.getElementById("past").style.display = "none";
  document.getElementById("present1").style.display = "block";
  document.getElementById("future").style.display = "none";
  document.getElementById("clock").style.display = "none";
  document.getElementById("past1").style.display = "none";
  document.getElementById("present").style.display = "none";
  document.getElementById("future1").style.display = "none";
});

document.getElementById("button3-next").addEventListener("click", function() {
  // Show Present Section, Hide Others
  document.getElementById("past1").style.display = "none";
  document.getElementById("present").style.display = "none";
  document.getElementById("future1").style.display = "block";
  document.getElementById("clock").style.display = "none";
  document.getElementById("past").style.display = "none";
  document.getElementById("present1").style.display = "none";
  document.getElementById("future").style.display = "none";
});


const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,   // Set to full window width
  height: window.innerHeight, // Set to full window height
  parent: 'game',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

let player;
let cursors;
let obstacles;
let score = 0;
let scoreText;
let gameOverText;
let startButton;
let isGameStarted = false;

const game = new Phaser.Game(config);

// Adjust game size on window resize
window.addEventListener('resize', () => {
  game.scale.resize(window.innerWidth, window.innerHeight);
});

function preload() {
  // Load rocket, asteroid images, and button
  this.load.image('player', 'rocket1.png');
  this.load.image('obstacle', 'image.png');
  this.load.image('startButton', 'closebutimage.png');

  // Simulate loading delay (for testing, can be removed in production)
  this.time.delayedCall(1000, () => {});
}

function create() {
  // Add player rocket sprite but keep it hidden initially
  player = this.physics.add.sprite(window.innerWidth / 2, window.innerHeight - 100, 'player').setVisible(false);
  player.setDisplaySize(60, 60);
  player.setCollideWorldBounds(true);

  // Create a group of obstacles (asteroids), also hidden initially
  obstacles = this.physics.add.group({
    key: 'obstacle',
    repeat: 5,
    setXY: { x: 12, y: -50, stepX: 150 } // Start obstacles off-screen
  });

  // Hide obstacles at first
  obstacles.children.iterate(function (child) {
    child.setDisplaySize(50, 50);
    child.setVelocityY(0);  // Set velocity to 0 initially
    child.setVisible(false);
  });

  // Enable collision detection between player and obstacles
  this.physics.add.collider(player, obstacles, hitObstacle, null, this);

  // Create keyboard input for movement
  cursors = this.input.keyboard.createCursorKeys();

  // Display score
  scoreText = this.add.text(25, 100, 'Score: 0', { fontSize: '32px', fill: '#fff' });

  // Display game over message (hidden initially)
  gameOverText = this.add.text(window.innerWidth / 2, window.innerHeight / 2, '', { fontSize: '64px', fill: '#fff' });
  gameOverText.setOrigin(0.5, 0.5);

  // Create the Start Game button
  startButton = this.add.sprite(window.innerWidth / 2, window.innerHeight / 2, 'startButton').setInteractive();

  // Add event listener to the button
  startButton.on('pointerdown', startGame, this);
}

function update() {
  if (!isGameStarted) {
    return;
  }

  // Player movement
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);
  } else {
    player.setVelocityX(0);
  }

  // Loop through obstacles to respawn them at the top when they fall off the screen
  obstacles.children.iterate(function (child) {
    if (child.y > window.innerHeight) {
      child.y = -50; // Reset to above the visible area
      child.x = Phaser.Math.Between(0, window.innerWidth);
      score += 10;
      scoreText.setText('Score: ' + score);
      child.setVelocityY(Phaser.Math.Between(300, 400)); // Set a new downward velocity
    }
  });
}

// Function to start the game
function startGame() {
  startButton.setVisible(false);

  player.setVisible(true);
  obstacles.children.iterate(function (child) {
    child.setVisible(true);
    child.setVelocityY(Phaser.Math.Between(300, 400)); // Set initial downward velocity for obstacles
  });

  isGameStarted = true;
}

// Function to handle collision between player and obstacle
function hitObstacle(player, obstacle) {
  this.physics.pause();
  player.setTint(0xff0000);
  gameOverText.setText('Game Over!');
  score = 0;
}

// When the video ends, hide the loader and show the game
const loaderVideo = document.getElementById('loaderVideo');
loaderVideo.addEventListener('ended', function() {
  const loader = document.getElementById('loader');
  loader.classList.add('fade-out');
  setTimeout(() => {
    loader.style.display = 'none';
    document.getElementById('game').style.display = 'block';
  }, 1000); // Delay for fade-out animation
});



document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("imageryForm");
  const imageDisplay = document.getElementById("imageDisplay");
  const modalContent = document.getElementById('modalContent');
  const modal1 = document.getElementById('imageModal');
  const closeModal = document.getElementById('closeModal');

  form.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevents page from refreshing on submit

      // Get the values from the input fields
      const date = document.getElementById("date").value;
      const camera = document.getElementById("camera").value;

      // Define your NASA API key here
      const apiKey = "z5gNLtycMgQ2gyjeR4hGFG4LUnLGsWCguXgFkeU2";
      
      // Construct the API URL with the user input
      const apiUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${date}&camera=${camera}&api_key=${apiKey}`;

      // Fetch the images from the API
      fetch(apiUrl)
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => {
              console.log(data); // Check the data returned from the API
              if (data.photos.length > 0) {
                  // Clear any previous images
                  imageDisplay.innerHTML = '';

                  // Loop through the first 7 photos
                  const imageUrls = data.photos.slice(0, 7).map(photo => photo.img_src);
                  
                  // Populate the modal with the images
                  populateModal(imageUrls);
                  
                  // Show images in a designated area (optional)
                  imageUrls.forEach(src => {
                      const imgElement = document.createElement("img");
                      imgElement.setAttribute("src", src);
                      imgElement.setAttribute("alt", `Mars rover image taken on ${date} by ${camera}`); // Fixed alt text
                      imageDisplay.appendChild(imgElement);
                  });
              } else {
                  imageDisplay.innerHTML = '<p>No images available for this date and camera.</p>';
              }
          })
          .catch((error) => {
              console.error("Error fetching the imagery:", error);
              imageDisplay.innerHTML = '<p>Error fetching the imagery. Please try again.</p>';
          });
  });

  function populateModal(images) {
      modalContent.innerHTML = ''; // Clear previous images

      // Check if there are any images to display
      if (images.length > 0) {
          images.forEach(src => {
              const img = document.createElement('img');
              img.src = src; // Set the source of the image
              img.alt = 'Mars Image'; // Alternative text for the image
              modalContent.appendChild(img); // Append the image to the modal content
          });

          modal1.style.display = 'block'; // Show the modal
      } else {
          alert('No images found!'); // Alert if no images
      }
  }

  // Close modal functionality
  closeModal.addEventListener('click', function() {
      modal1.style.display = 'none'; // Hide the modal
  });

  // Close modal when clicking outside of the modal content
  window.addEventListener('click', function(event) {
      if (event.target === modal1) {
          modal1.style.display = 'none'; // Hide the modal
      }
  });
});


document.addEventListener('DOMContentLoaded', function () {
  // Play the UFO sound immediately when the page loads
  let ufoSound = document.getElementById('ufoSound');
  ufoSound.play();

  // When the 'Start Journey' button is clicked
  document.getElementById('startJourney').addEventListener('click', function() {
      // Play space sound
      let spaceSound = document.getElementById('spaceSound');
      spaceSound.play();

      // Hide the heading, "Start Journey" button, and spaceship
      document.querySelector('h1').classList.add('hidden');
      document.getElementById('startJourney').classList.add('hidden');
      document.getElementById('spaceship').classList.add('hidden');

      // Show the transition buttons and trigger space journey animation
      document.getElementById('transitionButtons').classList.remove('hidden');
      document.getElementById('spaceJourneyAnimation').classList.remove('hidden');
  });

  // Function to show a loading animation
  function showLoadingAnimation() {
      const loadingDiv = document.createElement('div');
      loadingDiv.className = 'loading'; // Create a loading div
      loadingDiv.innerHTML = 'Loading...'; // Add loading text
      document.body.appendChild(loadingDiv);
      return loadingDiv; // Return the loading div for later removal
  }

  // Function to show a confirmation modal
  function showModal(quest) {
      const modal = document.createElement('div');
      modal.className = 'modal';
      modal.innerHTML = `
          <div class="modal-content">
              <p>Are you sure you want to go to ${quest}?</p>
              <button id="confirm">Yes</button>
              <button id="cancel">No</button>
          </div>
      `;
      document.body.appendChild(modal);

      // Confirm button
      document.getElementById('confirm').addEventListener('click', function() {
          const loadingDiv = showLoadingAnimation(); // Show loading animation
          setTimeout(function() {
              // Navigate to the selected quest page
              window.location.href = quest === 'Constellation Quest' ? 'constellation.html' : 'galacticrealm.html';
          }, 1000); // Duration of loading animation
          document.body.removeChild(modal); // Remove the modal
          document.body.removeChild(loadingDiv); // Remove loading div
      });

      // Cancel button
      document.getElementById('cancel').addEventListener('click', function() {
          document.body.removeChild(modal); // Remove the modal
      });
  }

  // Handle clicks on the image buttons
  document.getElementById('ConstellationQuest').addEventListener('click', function() {
      const questSound = document.getElementById('questSound');
      questSound.play(); // Play sound effect
      showModal('Constellation Quest'); // Show confirmation modal
  });

  document.getElementById('GalacticRealm').addEventListener('click', function() {
      const questSound = document.getElementById('questSound');
      questSound.play(); // Play sound effect
      showModal('Galactic Realm'); // Show confirmation modal
  });
});

document.addEventListener('mousemove', function(e) {
  createFireParticle(e.clientX, e.clientY);
});

function createFireParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('fire-particle');
  
  // Set initial position
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);

  // Remove the particle after animation ends
  setTimeout(() => {
      particle.remove();
  }, 1000); // Match with the CSS animation duration
}