// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {

    // Here is the HTML formatting for our mission target div.
    let missionInfo = `
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name}  </li>
                     <li>Diameter: ${diameter}:  </li>
                     <li>Star: ${star} </li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src="${imageUrl}">
    `
    document.getElementById("missionTarget").innerHTML = missionInfo;
}


function validateInput(testInput) {
    if (testInput === "") {
        return "Empty";
    } else if (isNaN(testInput)) {
        return "Not a Number";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required.");
    } else if (validateInput(pilot) !== "Not a Number" || validateInput(copilot) !== "Not a Number" || validateInput(fuelLevel) !== "Is a Number" || validateInput(cargoLevel) !== "Is a Number") {
        alert("Make sure to enter valid information for each field!");
    } else {
        document.getElementById("faultyItems").style.visibility = "hidden";
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
        document.getElementById("launchStatus").innerHTML = "Awaiting Information Before Launch";
        document.getElementById("launchStatus").style.color = "black";

        let liPilot = document.getElementById("pilotStatus");
        liPilot.innerHTML = `Pilot ${pilot} is ready for launch.`;
        let liCopilot = document.getElementById("copilotStatus");
        liCopilot.innerHTML = `Co-pilot ${copilot} is ready for launch.`;

        if (fuelLevel >= 10000 && cargoLevel <= 10000) {
            document.getElementById("launchStatus").innerHTML = "Shuttle is ready for launch!";
            document.getElementById("launchStatus").style.color = "green";
        } else {
            document.getElementById("faultyItems").style.visibility = "visible";
            document.getElementById("launchStatus").innerHTML = "Shuttle not ready for launch";
            document.getElementById("launchStatus").style.color = "red";
            if (fuelLevel < 10000) {
                document.getElementById("fuelStatus").innerHTML = `${fuelLevel} L is not enough fuel for the journey.`;
            }
            if (cargoLevel > 10000) {
                document.getElementById("cargoStatus").innerHTML = `${cargoLevel} kg is not low cargo for the journey.`;
            }
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
    });
    return planetsReturned;
}

function pickPlanet(planets) {
    let randNum = Math.floor(Math.random() * planets.length);
    return planets[randNum];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet;
module.exports.myFetch = myFetch;


