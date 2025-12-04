console.log("hi");

//global variables
const planktonAudio = new Audio("./audio/plankton.mp3");
planktonAudio.loop = true;

const seaweed2Audio = new Audio("./audio/seaweed2.mp3");
seaweed2Audio.loop = true;

const eelAudio = new Audio("./audio/eel.mp3");
eelAudio.loop = true;

const seaangelAudio = new Audio("./audio/seaangel.mp3");
seaangelAudio.loop = true;

const jellyAudio = new Audio("./audio/jelly.mp3");
jellyAudio.loop = true;

const urchinAudio = new Audio("./audio/urchin.mp3"); //currently not hearing this, can add with the green seaweed if we want
urchinAudio.loop = true;

const gearsnailAudio = new Audio("./audio/gearsnail.mp3");
gearsnailAudio.loop = true;

const seaweedAudio = new Audio("./audio/seaweed.mp3");
seaweedAudio.loop = true;

const anglerAudio = new Audio("./audio/angler.mp3");
anglerAudio.loop = true;

//booleans to handle if creature has been pressed or not
//not sure we need this -keeping for now
// let planktonIsPlaying = false;
// let seaweedIsPlaying = false;
// let anglerIsPlaying = false;
// let angelIsPlaying = false;
// let urchinIsPlaying = false;
// let eelIsPlaying = false;
// let jellyIsPlaying = false;
// let snailIsPlaying = false;

//if we want a background just affected by mouse positions / filters
// const backgroundAudio = new Audio("./audio/background.mp3");
// backgroundAudio.loop = true;

let users = {};
let socket; //make sure this is declared in the global scope!
let userName;
let userCursor; // Store this user's cursor image
let creatureText;
let ws; // Declare WebSocket variable
let userCursorConfig; // Declare globally so it's accessible everywhere
let myCursorElement; // Declare cursor element globally

// Cursor-to-audio mapping - each cursor has its own image and audio
const cursorConfig = [
  {
    image: "./images/plankton.png",
    audio: new Audio("./audio/plankton.mp3"),
    name: "plankton",
    isPlaying: false,
  },
  {
    image: "./images/angel.png",
    audio: new Audio("./audio/seaangel.mp3"),
    name: "angel",
    isPlaying: false,
  },
  {
    image: "./images/urchin.png",
    audio: new Audio("./audio/urchin.mp3"),
    name: "urchin",
    isPlaying: false,
  },
  {
    image: "./images/seaweed.png",
    audio: new Audio("./audio/seaweed.mp3"),
    name: "seaweed",
    isPlaying: false,
  },
  {
    image: "./images/gearsnail.png",
    audio: new Audio("./audio/gearsnail.mp3"),
    name: "gearsnail",
    isPlaying: false,
  },
  {
    image: "./images/angler.png",
    audio: new Audio("./audio/angler.mp3"),
    name: "angler",
    isPlaying: false,
  },
  {
    image: "./images/eel.png",
    audio: new Audio("./audio/eel.mp3"),
    name: "eel",
    isPlaying: false,
  },
  // { image: "./images/jellyfish.png", audio: new Audio("./audio/jelly.mp3"), name: "jellyfish", isPlaying: false },
  {
    image: "./images/plankton2.png",
    audio: new Audio("./audio/background.mp3"),
    name: "plankton2",
    isPlaying: false,
  },
  {
    image: "./images/seaweed2.png",
    audio: new Audio("./audio/seaweed2.mp3"),
    name: "seaweed2",
    isPlaying: false,
  },
];

// Configure audio settings for cursor sounds
cursorConfig.forEach((config) => {
  config.audio.loop = true; // Loop audio while playing
  config.audio.volume = 0.7; // Adjust volume as needed
});

// Assign random cursor to this user
userCursorConfig =
  cursorConfig[Math.floor(Math.random() * cursorConfig.length)];
userCursor = userCursorConfig.image;
userName = userCursorConfig.name; // Use cursor name as username

console.log("User cursor assigned:", userName, userCursor);

// Wait for DOM to be ready before creating cursor and connecting WebSocket
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded, initializing...");

  // Create the user's own cursor element
  myCursorElement = document.createElement("img");
  myCursorElement.id = "my-cursor";
  myCursorElement.className = "cursor";
  myCursorElement.src = userCursor;
  myCursorElement.style.position = "absolute";
  myCursorElement.style.width = "125px";
  myCursorElement.style.height = "125px";
  myCursorElement.style.pointerEvents = "none";
  myCursorElement.style.transform = "translate(-50%, -50%)";
  myCursorElement.style.zIndex = "9999";
  myCursorElement.style.left = "100px"; // Initial position
  myCursorElement.style.top = "100px"; // Initial position
  myCursorElement.style.opacity = "1";

  // Add image load handlers
  myCursorElement.onload = function () {
    console.log("Cursor image loaded successfully!");
  };
  myCursorElement.onerror = function () {
    console.error("Failed to load cursor image:", userCursor);
  };

  document.body.appendChild(myCursorElement);
  console.log("User cursor element created and added to DOM");
  console.log("Cursor element:", myCursorElement);
  console.log("Cursor src:", myCursorElement.src);
  console.log("Cursor element in DOM:", document.getElementById("my-cursor"));

  // Connect to WebSocket server after DOM is ready
  const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
  const host = window.location.host;
  const wsUrl = `${protocol}//${host}`;
  console.log("Connecting to WebSocket:", wsUrl);

  ws = new WebSocket(wsUrl);
  socket = ws; // Assign ws to socket for compatibility

  ws.onopen = () => {
    console.log("Connected to WebSocket server");
  };

  ws.onclose = () => {
    console.log("Disconnected from server");
  };

  ws.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  // Setup mouse tracking AFTER cursor element is created
  //tracking the mouse move
  //added window page offset for lower elements on the page
  document.addEventListener("mousemove", function (event) {
    const x = event.clientX + window.pageXOffset; // Add scroll position
    const y = event.clientY + window.pageYOffset; // Add scroll position

    // Update user's own cursor position
    myCursorElement.style.left = x + "px";
    myCursorElement.style.top = y + "px";

    // Send position to server for other users to see
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          type: "userData",
          name: userName,
          x: x,
          y: y,
          cursor: userCursor,
        })
      );
    }
  });

  // Toggle user's cursor audio on click (play/stop)
  document.addEventListener("click", function (event) {
    if (userCursorConfig.isPlaying) {
      // Stop the audio
      userCursorConfig.audio.pause();
      userCursorConfig.audio.currentTime = 0; // Reset to beginning
      userCursorConfig.isPlaying = false;
      console.log(`${userCursorConfig.name} audio stopped`);
    } else {
      // Play the audio
      userCursorConfig.audio.play().catch((err) => {
        console.log("Audio play prevented:", err);
      });
      userCursorConfig.isPlaying = true;
      console.log(`${userCursorConfig.name} audio playing`);
    }
  });

  console.log("Event listeners attached for mousemove and click");
});

let updatingElement = false;

//Function to create/get cursor elements with unique images for each user
function getCursorElement(id, cursorImage) {
  var elementId = "cursor-" + id;
  var element = document.getElementById(elementId);
  if (element == null) {
    element = document.createElement("img");
    element.id = elementId;
    element.className = "cursor";
    element.src = cursorImage;
    document.body.appendChild(element);
  } else if (updatingElement) {
    element.src = cursorImage;
    // console.log(cursorImage);
    updatingElement = false;
  }

  return element;
}

//ws on message - getting data from the server

ws.onmessage = (event) => {
  console.log("Message from server:", event.data);
  try {
    const data = JSON.parse(event.data);

    // Handle initial state from server - need to update this with the data that we need in lines 23 in index.js
    // client nhandling of jellypress information - what do i do when the jelly has been clciked?

    if (data.type === "initialState") {
      if (data.state.jellyState) {
        jelly.classList.add("jelly-on");
      } else {
        jelly.classList.remove("jelly-on");
      }
      // brightnessSlider.value = data.state.brightness;
      // brightnessValue.textContent = data.state.brightness;
      // flashSlider.value = data.state.pulseRate;
      // flashValue.textContent = data.state.pulseRate;
      //   servoSlider.value = data.state.servoAngle;
      //   servoValue.textContent = data.state.servoAngle;
    }

    // // Update angler value from other clients
    if (data.type === "angler" && data.value !== undefined) {
      // brightnessSlider.value = data.value;
      // brightnessValue.textContent = data.value;
      console.log("angler:", data.value);
    }

    // Update jelly value from other clients
    if (data.type === "jellyState" && data.value !== undefined) {
      console.log("jellyState:", data.value);
      if (data.value) {
        jelly.classList.add("jelly-on");
      } else {
        jelly.classList.remove("jelly-on");
      }
    }

    // Update servo slider from other clients
    // if (data.type === "servo" && data.value !== undefined) {
    //   servoSlider.value = data.value;
    //   servoValue.textContent = data.value;
    // }
  } catch (error) {
    console.error("Error parsing message:", error);
  }
};

//handle the digital - > physical connection: user clicks on the jelly, motor turns on; user clicks on the jelly again, motor turns off
// client handling of jellypress information - has the jelly been clicked?

let jelly = document.getElementById("jelly");
jelly.addEventListener("click", (event) => {
  console.log("jelly was clicked");
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(
      JSON.stringify({
        type: "jellyPress",
        value: "press", //unsure if we need this, keeping for now
      })
    );
  }
});

//ANGLER 3 - somehow combine this to make it work for the light/distance
let angler = document.getElementById("angler");
getButtonState(); //immediately gets the current state of the led update the dom
function getButtonState() {
  fetch("/led") //go to this end point
    .then((r) => r.json())
    .then((data) => {
      toggleButton.textContent = data.lightState ? "ON" : "OFF"; //ternery operator! if statement in one line. if state is true, text is on, else its off
    });
}

angler.addEventListener("click", (event) => {
  fetch("/led", { method: "POST" }) //changes the state!
    .then((r) => r.json())
    .then((data) => {
      //same logic as above, since the server is returning the led state this will update the button to match
      toggleButton.textContent = data.lightState ? "ON" : "OFF"; //toggle the dom button to match the button state on the server
    });
  console.log("angler was clicked");
  if (anglerIsPlaying) {
    anglerAudio.pause();
    anglerAudio.currentTime = 0; //reset to beginning
    anglerIsPlaying = false;
    angler.classList.remove("playing"); // Remove animation
  } else {
    anglerIsPlaying = true;
    anglerAudio.play();
    angler.classList.add("playing"); // Add animation
  }

  // socket.emit("angler", { name: userName });
  // creatureText =
  //   "With our advancements in technology, we were able to explore the depths of the ocean, enabling us to discover new information about anglerfish. We closely observed the relationship between anglerfish and their bacterial symbionts, which give them their ability to glow. This research led us to developing our own artificial bacterial symbionts that now allow us to have light without needing power.";
  // showPopup(creatureText);
});

// socket.on("angler", function (data) {
//   if (anglerIsPlaying) {
//     anglerAudio.pause();
//     anglerAudio.currentTime = 0; //reset to beginning
//     anglerIsPlaying = false;
//     angler.classList.remove("playing"); // Remove animation
//   } else {
//     anglerIsPlaying = true;
//     anglerAudio.play();
//     angler.classList.add("playing"); // Add animation
//   }
// });

//EEL 6
let eel = document.getElementById("eel");

function fetchReadings() {
  fetch("/data") //hit this endpoint
    .then((r) => r.json())
    .then((readings) => {
      console.log(readings);

      //work on what to do with sensor data received by the sensor -- resize image? make it pulse on the page? once we figure that out, then figure out the mapping of the senosr and get it to react that way

      // Show only last 10 readings as formatted JSON
      // const recent = readings.slice(-10).reverse(); //readings an array, this just pulls the last 10
      // logContainer.textContent = JSON.stringify(recent, null, 2); //change it to a string for display
    })
    .catch((error) => {
      logContainer.textContent = `Error: ${error.message}`;
    });
}

eel.addEventListener("click", (event) => {
  socket.emit("eel", { name: userName });
  creatureText =
    "Electric eels used to average six feet and the most powerful could generate 860 volts of electricity. Nowadays, eels run up to 200 feet and generate enough power to run small towns. Factions of cooperating eels help us cultivate power and have become a main power source for coastal towns. Other factions of eels have become more aggressive, using their electric abilities to defend their territory in intricate underwater grids maintained to keep the independence and autonomy of sea freedom for those uninterested in collaborating with humans.";
  showPopup(creatureText);
});

socket.on("eel", function (data) {
  if (eelIsPlaying) {
    eelAudio.pause();
    eelAudio.currentTime = 0; //reset to beginning
    eelIsPlaying = false;
    eel.classList.remove("playing"); // Remove animation
  } else {
    eelIsPlaying = true;
    eelAudio.play();
    eel.classList.add("playing"); // Add animation
  }
});

// Fetch immediately on page load
fetchReadings();

// Then poll every 3 seconds
setInterval(fetchReadings, 3000);

//reference code - leaving here to use as we rebuild the server:
//getting character info pop up!
// function showPopup(creatureText) {
//   let popup = document.getElementById("center_popup");
//   popup.style.visibility = "visible";

//   let overlay = document.getElementById("overlay");
//   overlay.style.visibility = "visible";

//   //display results in popup window

//   let displayCreatureInfo = document.getElementById("popup_text");

//   displayCreatureInfo.innerHTML = creatureText;
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });

//   let continueButton = document.getElementById("continue_button");
//   continueButton.addEventListener("click", function (event) {
//     // console.log("continue button clicked");
//     popup.style.visibility = "hidden";
//     overlay.style.visibility = "hidden";
//     updatingElement = true;
//     userCursor = cursorImages[Math.floor(Math.random() * cursorImages.length)];

//     const x = event.clientX + window.pageXOffset; // Add scroll position
//     const y = event.clientY + window.pageYOffset; // Add scroll position
//     // console.log("mouse x:" + x + " mouse y:" + y);
//     socket.emit("userData", { name: userName, x: x, y: y, cursor: userCursor });
//   });
// }

//to do if time:
//keep track of which sounds are already playing and then share that with the server and then with the new users who join the site
//add a stop all audio button maybe?

//code from proj 02 for ref:

//PLANKTON 1
// let plankton = document.getElementById("plankton");

// plankton.addEventListener("click", (event) => {
//   socket.emit("plankton", { name: userName });
//   creatureText =
//     "Plankton get their name from the Greek word planktos, meaning drifter, precisely because they have no choice but to go where the currents take them. As they evolved over the past 1000 years, they learned how to harness this power and take others with them along for the ride. We now use plankton and the ocean currents as transportation, never quite knowing where we’ll end up but content to go with the flow. ";
//   showPopup(creatureText);
// });

// socket.on("plankton", function (data) {
//   if (planktonIsPlaying) {
//     seaangelAudio.pause();
//     seaangelAudio.currentTime = 0; //reset to beginning
//     planktonIsPlaying = false;
//     plankton.classList.remove("playing"); // Remove animation
//   } else {
//     planktonIsPlaying = true;
//     seaangelAudio.play();
//     plankton.classList.add("playing"); // Add animation
//   }
// });

//SEAWEED 1
// let seaweed = document.getElementById("seaweed");

// seaweed.addEventListener("click", (event) => {
//   socket.emit("seaweed", { name: userName });
//   creatureText =
//     "Seaweed has been around since long before the dinosaurs, adapting expertly to its environment. In the early 2000s, its ability to remove CO2 from the atmosphere made it essential in the fight against climate change. Some concoction of chemicals released into the ocean mixed with the seaweed’s biology and allowed it to develop the ability to also filter out toxic plastics. The unique vein-like structures in this specific species made it especially good at this. ";
//   showPopup(creatureText);
// });

// socket.on("seaweed", function (data) {
//   if (seaweedIsPlaying) {
//     seaweedAudio.pause();
//     seaweedAudio.currentTime = 0; //reset to beginning
//     seaweedIsPlaying = false;
//     seaweed.classList.remove("playing"); // Remove animation
//   } else {
//     seaweedIsPlaying = true;
//     seaweedAudio.play();
//     seaweed.classList.add("playing"); // Add animation
//   }
// });

//GEARSNAIL 7
// let gearsnail = document.getElementById("gearsnail");
// gearsnail.addEventListener("click", (event) => {
//   socket.emit("gearsnail", { name: userName });
//   creatureText =
//     "Gear Snails have bioengineered shells made of interlocking gears. With an incredibly slow metabolism, their biology requires them to traverse 100 miles a day to survive. Many of them help process eel power, and their shells are also used once they die to form necessary parts for regenerative mining compounds for our rare city center tech nodes. They are a protected and revered species by many, but some are still unfortunately poached for their shells.";
//   showPopup(creatureText);
// });

// socket.on("gearsnail", function (data) {
//   if (snailIsPlaying) {
//     gearsnailAudio.pause();
//     gearsnailAudio.currentTime = 0; //reset to beginning
//     snailIsPlaying = false;
//     gearsnail.classList.remove("playing"); // Remove animation
//   } else {
//     snailIsPlaying = true;
//     gearsnailAudio.play();
//     gearsnail.classList.add("playing"); // Add animation
//   }
// });

//ANGEL 4
// let angel = document.getElementById("angel");

// angel.addEventListener("click", (event) => {
//   socket.emit("angel", { name: userName });
//   creatureText =
//     "Sea angels protected themselves by absorbing a noxious molecule that kept other creatures from eating them. We now use this molecule to protect our vulnerable truth tellers. Sea angels are known as peace guardians of our society. Adapting from living under the most pressure in the deepest oceans in the world, they rose to shallow waters, representing a shift to a time of peace for humanity.";
//   showPopup(creatureText);
// });

// socket.on("angel", function (data) {
//   if (angelIsPlaying) {
//     backgroundAudio.pause();
//     backgroundAudio.currentTime = 0;
//     angelIsPlaying = false;
//     angel.classList.remove("playing");
//   } else {
//     angelIsPlaying = true;
//     //Console Log for if its something wrong once deployed (working locally fine) this audio was the only one not playing
//     backgroundAudio
//       .play()
//       .catch((err) => console.log("Audio play prevented:", err));
//     angel.classList.add("playing");
//   }
// });

//URCHIN 5
// let urchin = document.getElementById("urchin");

// urchin.addEventListener("click", (event) => {
//   socket.emit("urchin", { name: userName });
//   creatureText =
//     "Urchins now travel in groups, and their intricate spiny structures create vast underwater expanses that catch and process plastic waste and nuclear fallout, releasing carbon and nitrogen back into the water and atmosphere. They have become essential to maintaining the health of our oceans and atmosphere, and we work closely with them to ensure their continued survival and success.";
//   showPopup(creatureText);
// });

// socket.on("urchin", function (data) {
//   if (urchinIsPlaying) {
//     seaweed2Audio.pause();
//     seaweed2Audio.currentTime = 0; //reset to beginning
//     urchinIsPlaying = false;
//     urchin.classList.remove("playing"); // Remove animation
//   } else {
//     urchinIsPlaying = true;
//     seaweed2Audio.play();
//     urchin.classList.add("playing"); // Add animation
//   }
// });

//JELLY 9
// let jelly = document.getElementById("jelly");
// jelly.addEventListener("click", (event) => {
//   socket.emit("jelly", { name: userName });
//   creatureText =
//     "Jellyfish have adapted with high concentrations of mercury. They are mostly left alone due to mercury's toxic effects on humanity but are visible signs of the ocean's health - similar to a thermometer's function, they rise as the temperature of the ocean rises, and we are able to identify patterns and disruptions immediately by observing these adapted jellyfish.";
//   showPopup(creatureText);
// });

// socket.on("jelly", function (data) {
//   if (jellyIsPlaying) {
//     jellyAudio.pause();
//     jellyAudio.currentTime = 0; //reset to beginning
//     jellyIsPlaying = false;
//     jelly.classList.remove("playing"); // Remove animation
//   } else {
//     jellyIsPlaying = true;
//     jellyAudio.play();
//     jelly.classList.add("playing"); // Add animation
//   }
// });
