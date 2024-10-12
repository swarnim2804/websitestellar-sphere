function showInfo(body) {
    const infoBox = document.getElementById("info-box");
    const infoTitle = document.getElementById("info-title");
    const infoDescription = document.getElementById("info-description");

    const info = {
        sun: {
            title: "Sun",
            description: "The Sun is a giant ball of hot plasma at the center of the Solar System. It provides the energy and light that sustain life on Earth. Composed mostly of hydrogen and helium, it generates energy through nuclear fusion in its core."
        },
        mercury: {
            title: "Mercury",
            description: "Mercury is the smallest and closest planet to the Sun. It has a very thin atmosphere, and its surface experiences extreme temperatures, ranging from scorching heat to freezing cold. It has no moons."
        },
        venus: {
            title: "Venus",
            description: "Venus is the hottest planet due to its thick atmosphere, which traps heat. Known as Earth's sister planet because of its similar size, it rotates in the opposite direction compared to most planets and has no moons."
        },
        earth: {
            title: "Earth",
            description: "Earth is the third planet from the Sun and the only known planet to support life. It has liquid water, a breathable atmosphere, and one moon, known as the Moon. It has diverse climates, ecosystems, and is home to millions of species."
        },
        mars: {
            title: "Mars",
            description: "Mars is known as the Red Planet because of its reddish appearance due to iron oxide on its surface. It has the largest volcano in the solar system and signs that water once flowed on its surface. Mars has two moons, Phobos and Deimos."
        },
        jupiter: {
            title: "Jupiter",
            description: "Jupiter is the largest planet in the Solar System, known for its massive storms, including the Great Red Spot. It’s a gas giant composed mostly of hydrogen and helium, and it has at least 79 moons, including the four large Galilean moons."
        },
        saturn: {
            title: "Saturn",
            description: "Saturn is famous for its stunning ring system, made of ice, dust, and rock. It is another gas giant, mainly composed of hydrogen and helium, and has more than 80 moons, with Titan being the largest and most intriguing."
        },
        uranus: {
            title: "Uranus",
            description: "Uranus is unique because it rotates on its side, likely due to a collision with an Earth-sized object in the past. It has a faint ring system and is mostly made of hydrogen, helium, and methane, which gives it a pale blue color. It has 27 known moons."
        },
        neptune: {
            title: "Neptune",
            description: "Neptune, the farthest planet from the Sun, is known for its deep blue color and strong winds, the fastest in the Solar System. Like Uranus, it is a gas giant with a faint ring system and at least 14 moons, the largest of which is Triton."
        },
    };

    // Set the info box content
    infoTitle.innerText = info[body].title;
    infoDescription.innerText = info[body].description;
    infoBox.style.display = "block";

    // Automatically close the info box after 7 seconds
    setTimeout(function() {
        infoBox.style.display = "none";
    }, 5000);  // 5 seconds = 5000 milliseconds
}

function calculateWeight() {
    const earthWeight = parseFloat(document.getElementById("earth-weight").value);
    const planet = document.getElementById("planet-select").value;

    // Gravity on different planets relative to Earth
    const gravity = {
        mercury: 0.38,
        venus: 0.91,
        earth: 1.00,
        mars: 0.38,
        jupiter: 2.34,
        saturn: 1.06,
        uranus: 0.92,
        neptune: 1.19,
    };

    if (!isNaN(earthWeight) && earthWeight > 0) {
        const weightOnPlanet = (earthWeight * gravity[planet]).toFixed(2);
        document.getElementById("weight-result").innerText = 
            `Your weight on ${planet.charAt(0).toUpperCase() + planet.slice(1)} would be ${weightOnPlanet} kg.`;
    } else {
        document.getElementById("weight-result").innerText = 
            'Please enter a valid weight on Earth.';
    }
}