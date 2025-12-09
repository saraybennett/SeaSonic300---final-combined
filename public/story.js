console.log("hi");

//close and return
document
  .getElementById("closeAndReturnBtn")
  .addEventListener("click", function () {
    // Attempt to close the current tab.
    // This will likely only work if the tab was opened programmatically (e.g., via window.open()).
    window.close();

    // Attempt to navigate back in the browser history.
    // This will work if there's a previous page in the history.
    history.back();
  });

//handle creature story through click events
//PLANKTON 1
let plankton = document.getElementById("plankton");

plankton.addEventListener("click", (event) => {
  creatureText =
    "Plankton get their name from the Greek word planktos, meaning drifter, precisely because they have no choice but to go where the currents take them. As they evolved over the past 1000 years, they learned how to harness this power and take others with them along for the ride. We now use plankton and the ocean currents as transportation, never quite knowing where we’ll end up but content to go with the flow. ";
  showPopup(creatureText);
});

//SEAWEED 1
let seaweed = document.getElementById("seaweed");

seaweed.addEventListener("click", (event) => {
  creatureText =
    "Seaweed has been around since long before the dinosaurs, adapting expertly to its environment. In the early 2000s, its ability to remove CO2 from the atmosphere made it essential in the fight against climate change. Some concoction of chemicals released into the ocean mixed with the seaweed’s biology and allowed it to develop the ability to also filter out toxic plastics. The unique vein-like structures in this specific species made it especially good at this. ";
  showPopup(creatureText);
});

//ANGLER 3
let angler = document.getElementById("angler");

angler.addEventListener("click", (event) => {
  creatureText =
    "With our advancements in technology, we were able to explore the depths of the ocean, enabling us to discover new information about anglerfish. We closely observed the relationship between anglerfish and their bacterial symbionts, which give them their ability to glow. This research led us to developing our own artificial bacterial symbionts that now allow us to have light without needing power.";
  showPopup(creatureText);
});

//ANGEL 4
let angel = document.getElementById("angel");

angel.addEventListener("click", (event) => {
  creatureText =
    "Sea angels protected themselves by absorbing a noxious molecule that kept other creatures from eating them. We now use this molecule to protect our vulnerable truth tellers. Sea angels are known as peace guardians of our society. Adapting from living under the most pressure in the deepest oceans in the world, they rose to shallow waters, representing a shift to a time of peace for humanity.";
  showPopup(creatureText);
});

//URCHIN 5
let urchin = document.getElementById("urchin");

urchin.addEventListener("click", (event) => {
  creatureText =
    "Urchins now travel in groups, and their intricate spiny structures create vast underwater expanses that catch and process plastic waste and nuclear fallout, releasing carbon and nitrogen back into the water and atmosphere. They have become essential to maintaining the health of our oceans and atmosphere, and we work closely with them to ensure their continued survival and success.";
  showPopup(creatureText);
});

//EEL 6
let eel = document.getElementById("eel");

eel.addEventListener("click", (event) => {
  creatureText =
    "Electric eels used to average six feet and the most powerful could generate 860 volts of electricity. Nowadays, eels run up to 200 feet and generate enough power to run small towns. Factions of cooperating eels help us cultivate power and have become a main power source for coastal towns. Other factions of eels have become more aggressive, using their electric abilities to defend their territory in intricate underwater grids maintained to keep the independence and autonomy of sea freedom for those uninterested in collaborating with humans.";
  showPopup(creatureText);
});

//GEARSNAIL 7
let gearsnail = document.getElementById("gearsnail");
gearsnail.addEventListener("click", (event) => {
  creatureText =
    "Gear Snails have bioengineered shells made of interlocking gears. With an incredibly slow metabolism, their biology requires them to traverse 100 miles a day to survive. Many of them help process eel power, and their shells are also used once they die to form necessary parts for regenerative mining compounds for our rare city center tech nodes. They are a protected and revered species by many, but some are still unfortunately poached for their shells.";
  showPopup(creatureText);
});

//add last seaweed if that's something that we want?? code below

//JELLY 9
let jelly = document.getElementById("jelly");
jelly.addEventListener("click", (event) => {
  creatureText =
    "Jellyfish have adapted with high concentrations of mercury. They are mostly left alone due to mercury's toxic effects on humanity but are visible signs of the ocean's health - similar to a thermometer's function, they rise as the temperature of the ocean rises, and we are able to identify patterns and disruptions immediately by observing these adapted jellyfish.";
  showPopup(creatureText);
});

//getting character info pop up!
function showPopup(creatureText) {
  let popup = document.getElementById("center_popup");
  popup.style.visibility = "visible";

  let overlay = document.getElementById("overlay");
  overlay.style.visibility = "visible";

  //display results in popup window

  let displayCreatureInfo = document.getElementById("popup_text");

  displayCreatureInfo.innerHTML = creatureText;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  let continueButton = document.getElementById("continue_button");
  continueButton.addEventListener("click", function (event) {
    popup.style.visibility = "hidden";
    overlay.style.visibility = "hidden";
  });
}
