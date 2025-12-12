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

//booleans to handle if creature  or not
let planktonIsPlaying = false;
let seaweedIsPlaying = false;
let anglerIsPlaying = false;
let angelIsPlaying = false;
let urchinIsPlaying = false;
let eelIsPlaying = false;
let jellyIsPlaying = false;
let snailIsPlaying = false;

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
let userCursorServer;

// Cursor-to-audio mapping - each cursor has its own image and audio
const cursorConfig = [
  {
    image: "./images/jellyfish.png",
    audio: new Audio("./audio/jelly.mp3"),
    name: "jellyfish",
    isPlaying: false,
  },
  {
    image: "./images/angler.png",
    imagePlaying: "./images/angler_playing.png",
    audio: new Audio("./audio/angler.mp3"),
    name: "angler",
    isPlaying: false,
  },
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
    image: "./images/eel.png",
    audio: new Audio("./audio/eel.mp3"),
    name: "eel",
    isPlaying: false,
  },

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

//on page load - show pop up welcome to help onboard users
window.onload = function () {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  //display results in popup window

  let displayWelcome = document.getElementById("popup_text");

  displayWelcome.innerHTML =
    "Welcome to the SeaSonic3000! <br> <br>  A new era began in 2075. The space mission to colonize Mars was a success, but only narcissists were able to survive up there. Back on Earth, society began to flourish. Humanity used AI to adapt new technologies with nature. In turn, the creatures we studied evolved with us and our technological advancements.";
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  let nextButton = document.getElementById("next-button");
  nextButton.addEventListener("click", function (event) {
    displayWelcome.innerHTML =
      "This is a collaborative physical and web-based project linked through a shared sonic experience. There will be elements of the site that affect the physical world and vice versa. When you enter the site, you’ll be transformed into one of the creatures.  <br> <br> Each creature makes a unique sound. Can you discover what yours is? Start by clicking or tapping your creature and see where that takes you! ";
    nextButton.style.visibility = "hidden";
    let continueButton = document.getElementById("continue_button");
    continueButton.style.visibility = "visible";
    continueButton.addEventListener("click", function (event) {
      popup.style.visibility = "hidden";
      overlay.style.visibility = "hidden";
      continueButton.style.visibility = "hidden";

      //run whole website:
      // Connect to WebSocket server

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

      //ws on message - getting messages from the server

      ws.onmessage = (event) => {
        console.log("Message from server:", event.data);
        try {
          const data = JSON.parse(event.data);

          //using initial data from the server to update the user cursor
          if (data.type === "initialState") {
            console.log("this is the cursor index:" + data.cursorState);
            userCursorServer = data.cursorState;
            console.log(userCursorServer);

            //if the cursorState is null-do something HERE !!!!

            if (data.cursorState === null) {
              // alert(
              //   "All cursors are currently in use. You can listen to the shared sonic experience & explore more of the world by clicking the button on the top right. Please refresh the page later to be transformed into a creature."
              // );

              popup.style.visibility = "visible";
              overlay.style.visibility = "visible";
              let cursorFull = document.getElementById("popup_text");
              cursorFull.innerHTML =
                "All cursors are currently in use. You can listen to the shared sonic experience & explore more of the world by clicking the learn more button. <br><br>Please refresh the page later to be transformed into a creature.";
              let closeButton = document.getElementById("close_button");
              closeButton.style.visibility = "visible";
              closeButton.addEventListener("click", function (event) {
                popup.style.visibility = "hidden";
                overlay.style.visibility = "hidden";
                closeButton.style.visibility = "hidden";
              });
            }

            userCursorConfig = cursorConfig[userCursorServer];
            console.log(userCursorConfig);
            userCursor = userCursorConfig.image; //modify to send entire cursor config object
            userName = userCursorConfig.name; // Use cursor name as username

            console.log("User cursor assigned:", userName, userCursor);

            //do all the cursor work here:
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
            myCursorElement.style.left = center; // Initial position
            myCursorElement.style.top = center; // Initial position
            myCursorElement.style.opacity = "1";

            // Add image load handlers
            myCursorElement.onload = function () {
              console.log("Cursor image loaded successfully!");
            };
            myCursorElement.onerror = function () {
              console.error("Failed to load cursor image:", userCursor);
            };

            document.body.appendChild(myCursorElement);

            //below code not needed for now, leaving in case we need to ref later
            // if (data.state.jellyState) {
            //   jelly.classList.add("jelly-on");
            // } else {
            //   jelly.classList.remove("jelly-on");
            // }
          }

          // // // Update angler value from other clients - leaving for ref if we build this back in
          // if (data.type === "angler" && data.value !== undefined) {
          //   console.log("angler:", data.value);
          // }

          // // Update jelly value from other clients
          // if (data.type === "jellyState" && data.value !== undefined) {
          //   console.log("jellyState:", data.value);
          //   if (data.value) {
          //     jelly.classList.add("jelly-on");
          //   } else {
          //     jelly.classList.remove("jelly-on");
          //   }
          // }

          if (data.type === "userData") {
            users[data.id] = data;
            console.log("Received userData:", data);

            // Only draw cursor if position and cursor image data exists
            if (
              data.data.x !== undefined &&
              data.data.y !== undefined &&
              data.data.cursor
            ) {
              var el = getCursorElement(data.data.id, data.data.cursor);
              console.log(el);
              el.style.left = data.data.x + "px";
              el.style.top = data.data.y + "px";
              // console.log("Drew cursor for:", data.id, "at", data.x, data.y);
            }
          }

          if (data.type === "soundTrigger") {
            console.log("Remote sound trigger received for::" + data.who);

            // this should make sure the sound doesn't play twice for the sending user
            if (data.who === userName) {
              return;
            }
            // searches the user array for the correct user based on data being received
            const targetCreature = cursorConfig.find(
              (item) => item.name === data.who
            );

            if (targetCreature) {
              if (targetCreature.isPlaying) {
                // if it's currently playing, then it stopes it
                targetCreature.audio.pause();
                targetCreature.audio.currentTime = 0; // sets back to beginning
                targetCreature.isPlaying = false; //resets the boolean flag
                console.log(`${targetCreature.name} stopped`);
                //image url switch to the normal image
              } else {
                // If it's stopped, play it
                targetCreature.audio.play();
                targetCreature.isPlaying = true;
                console.log(`${targetCreature.name} started`);
                //image url switch to the playing image
              }
            }
          }

          if (data.type === "removeImg") {
            var elementId = "cursor-" + data.value;
            var element = document.getElementById(elementId);
            if (element) {
              document.body.removeChild(element);
              console.log("Removed cursor for disconnected user:", data.value);
            }
          }
        } catch (error) {
          console.error("Error parsing message:", error);
        }
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

        // Send position to server for other users to see - userCursror.name on 199 - handle that based on the type, update type to match the server side, copy this to a click event
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

      // Toggle user's cursor audio on click (play/stop & broadcast this via sockets)
      document.addEventListener("click", function (event) {
        //triger a message being sent to the server
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(
            JSON.stringify({
              type: "userClick",
              name: userName,
            })
          );
        }

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

        //show narrative on button click - NEEDS WORK, tie to button vs hover to make it a more seamless ux
        // const elementToHover = document.getElementById("hover-button");
        // let popup = document.getElementById("center_popup");

        // elementToHover.addEventListener("mouseenter", () => {
        //   console.log("im here");
        //   popup.style.visibility = "visible";

        //   let overlay = document.getElementById("overlay");
        //   overlay.style.visibility = "visible";
        // });

        // elementToHover.addEventListener("mouseleave", () => {
        //   popup.style.visibility = "hidden";
        //   overlay.style.visibility = "hidden";
        // });
      });
    });
  });

  // Code to execute after the entire page has loaded
  console.log("Window loaded!");
};

let updatingElement = false;

//Function to create/get cursor elements with unique images for each user
function getCursorElement(id, cursorImage) {
  console.log(cursorImage);
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

//handle the digital - > physical connection: user clicks on the jelly, motor turns on; user clicks on the jelly again, motor turns off
// client handling of jellypress information - has the jelly been clicked?

// let jelly = document.getElementById("jelly");
// jelly.addEventListener("click", (event) => {
//   console.log("jelly was clicked");
//   if (ws.readyState === WebSocket.OPEN) {
//     ws.send(
//       JSON.stringify({
//         type: "jellyPress",
//         value: "press", //unsure if we need this, keeping for now
//       })
//     );
//   }
// });
