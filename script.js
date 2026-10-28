// Selecting HTML elements for interaction
const convertBtn = document.getElementById("convertBtn");
const clearBtn = document.getElementById("clearBtn");
const btnContainer = document.getElementById("btnContainer");
const result = document.getElementById("result");
const copyright = document.getElementById("copy");

// Adding event listeners to buttons
convertBtn.addEventListener("click", convertTemp);
clearBtn.addEventListener("click", clearTemp);

// Function to convert temperature
function convertTemp() {
  const unit = document.getElementById("unit").value; // Get selected unit
  const temperatureValue = document.getElementById("temperature").value; // Get input temperature
  const decimalPlace = document.getElementById("decimalPlace").value; // Get decimal places for output

  let temp = parseFloat(temperatureValue); // Parse input temperature to float
  let convertedTemp; // Variable to hold converted temperature

  // Array of temperature units and their symbols
  const temperatureUnits = [
    { name: "Celsius", symbol: "&deg;C" },
    { name: "Fahrenheit", symbol: "&deg;F" },
    { name: "Kelvin", symbol: " K" },
    { name: "Rankine", symbol: "&deg;R" },
    { name: "Réaumur", symbol: "&deg;Ré" },
    { name: "Delisle", symbol: "&deg;De" },
    { name: "Rømer", symbol: "&deg;Rø" },
    { name: "Newton", symbol: "&deg;N" },
  ];

  // Check if temperature input is not empty
  if (temperatureValue) {
    // Switch statement to handle different temperature units

    switch (unit) {
      case "Celsius":
        convertedTemp = {
          Fahrenheit: (temp * 9) / 5 + 32,
          Kelvin: temp + 273.15,
          Rankine: (temp * 9) / 5 + 491.67,
          Réaumur: (temp * 4) / 5,
          Delisle: (100 - temp) * (3 / 2),
          Rømer: temp * (21 / 40) + 7.5,
          Newton: temp * (33 / 100),
        };
        break;
      case "Fahrenheit":
        convertedTemp = {
          Celsius: ((temp - 32) * 5) / 9,
          Kelvin: ((temp - 32) * 5) / 9 + 273.15,
          Rankine: temp + 459.67,
          Réaumur: ((temp - 32) * 4) / 9,
          Delisle: (212 - temp) * (5 / 6),
          Rømer: (temp - 32) * (7 / 24) + 7.5,
          Newton: (temp - 32) * (11 / 60),
        };
        break;
      case "Kelvin":
        convertedTemp = {
          Celsius: temp - 273.15,
          Fahrenheit: ((temp - 273.15) * 9) / 5 + 32,
          Rankine: (temp * 9) / 5,
          Réaumur: ((temp - 273.15) * 4) / 5,
          Delisle: (373.15 - temp) * (3 / 2),
          Rømer: (temp - 273.15) * (21 / 40) + 7.5,
          Newton: (temp - 273.15) * (33 / 100),
        };
        break;
      case "Rankine":
        convertedTemp = {
          Celsius: ((temp - 491.67) * 5) / 9,
          Fahrenheit: temp - 459.67,
          Kelvin: (temp * 5) / 9,
          Réaumur: ((temp - 491.67) * 4) / 9,
          Delisle: (671.67 - temp) * (5 / 6),
          Rømer: (temp - 491.67) * (7 / 24) + 7.5,
          Newton: (temp - 491.67) * (11 / 60),
        };
        break;
      case "Réaumur":
        convertedTemp = {
          Celsius: (temp * 5) / 4,
          Fahrenheit: (temp * 9) / 4 + 32,
          Kelvin: (temp * 5) / 4 + 273.15,
          Rankine: (temp * 9) / 4 + 491.67,
          Delisle: (80 - temp) * (15 / 8),
          Rømer: temp * (21 / 32) + 7.5,
          Newton: temp * (33 / 80),
        };
        break;
      case "Delisle":
        convertedTemp = {
          Celsius: 100 - (temp * 2) / 3,
          Fahrenheit: 212 - (temp * 6) / 5,
          Kelvin: 373.15 - (temp * 2) / 3,
          Rankine: 671.67 - (temp * 6) / 5,
          Réaumur: 80 - temp * (8 / 15),
          Rømer: 60 - temp * (7 / 20),
          Newton: 33 - temp * (11 / 50),
        };
        break;
      case "Rømer":
        convertedTemp = {
          Celsius: (temp - 7.5) * (40 / 21),
          Fahrenheit: (temp - 7.5) * (24 / 7) + 32,
          Kelvin: (temp - 7.5) * (40 / 21) + 273.15,
          Rankine: (temp - 7.5) * (24 / 7) + 491.67,
          Réaumur: (temp - 7.5) * (32 / 21),
          Delisle: (60 - temp) * (20 / 7),
          Newton: (temp - 7.5) * (22 / 35),
        };
        break;
      case "Newton":
        convertedTemp = {
          Celsius: temp * (100 / 33),
          Fahrenheit: temp * (60 / 11) + 32,
          Kelvin: temp * (100 / 33) + 273.15,
          Rankine: temp * (60 / 11) + 491.67,
          Réaumur: temp * (80 / 33),
          Delisle: (33 - temp) * (50 / 11),
          Rømer: temp * (35 / 22) + 7.5,
        };
        break;
      default:
        console.log("Something went wrong!");
    }

    // Displaying the results in the HTML

    // Find symbol for related temperature unit
    const degreeSymbol = temperatureUnits.find(
      (degree) => degree.name === unit,
    ).symbol;

    const decimalPlace = document.getElementById("decimalPlace").value; // Get decimal places for output
    const places = decimalPlace === "1" ? "place" : "places"; // Use ternary operator to determine the correct string

    btnContainer.style.marginBottom = "0px"; // Reset space between copyright message

    result.innerHTML = `<div class="resultMessage">Convert <span class="tempInput">${temp} ${degreeSymbol}</span> to ${decimalPlace} decimal ${places}</div>`;
    result.innerHTML += temperatureUnits
      .map(
        (
          unitObj,
        ) => `<div><span class="${unit === unitObj.name ? "tempIn" : "tempOut"}">${unitObj.name}</span></div> 
        <div class="convertedTemp">${convertedTemp[unitObj.name] !== undefined ? convertedTemp[unitObj.name].toFixed(decimalPlace) : temp.toFixed(decimalPlace)} ${unitObj.symbol}</div>`,
      )
      .join("");
    window.location.href = "#result"; // scroll to see results
  } else {
    // Displaying error message if input is empty
    result.innerHTML = `<div class="emptyInputMessage">Enter the temperature to convert <br />(must be a number)</div>`;
    btnContainer.style.marginBottom = "0px"; // Reset space between copyright message
    temperature.focus();
  }
}

// Function to clear input fields
function clearTemp() {
  unit.value = "Celsius"; // Reset unit to Celsius
  temperature.value = ""; // Clear temperature input
  temperature.focus(); // Set focus on temperature input
  decimalPlace.value = 2; // Reset decimal places to 2
  btnContainer.style.marginBottom = "100px"; // Reset space between copyright message
  result.innerHTML = ``; // Clear results display
}

// Add a click event listener to the toggle button
document.getElementById("menuToggle").addEventListener("click", function () {
  // Get the sliding menu and the toggle icon
  const menu = document.getElementById("slidingMenu");
  const toggleIcon = this;

  // Toggle the 'active' class on the menu
  menu.classList.toggle("active");

  // Check if the menu is currently active
  const isActive = menu.classList.contains("active");

  // Define styles based on the active state of the menu
  const iconStyles = {
    icon: isActive ? "&#10006;" : "&#9776;", // Change icon based on state
    color: isActive ? "#eeeeee" : "#111111", // Change text color
    backgroundColor: isActive ? "#333333" : "#99a3a3", // Change background color
    position: isActive ? "fixed" : "absolute", // Change position
    defaultColor: isActive ? "#333333" : "#99a3a3", // Default background color
    hoverColor: isActive ? "#444444" : "#788b8b ", // Change hover background color
  };

  // Apply the defined styles to the toggle icon
  toggleIcon.innerHTML = iconStyles.icon; // Update icon
  toggleIcon.style.color = iconStyles.color; // Update text color
  toggleIcon.style.backgroundColor = iconStyles.backgroundColor; // Update background color
  toggleIcon.style.position = iconStyles.position; // Update position
  toggleIcon.style.transition = "background-color 0.3s"; // Smooth transition

  // Add event listener for mouseover to change background color
  toggleIcon.addEventListener("mouseover", function () {
    this.style.backgroundColor = iconStyles.hoverColor; // Change to hover background color
  });

  // Add event listener for mouseout to revert background color
  toggleIcon.addEventListener("mouseout", function () {
    this.style.backgroundColor = iconStyles.defaultColor; // Revert to default background color
  });
});

// Select all elements with the class 'accordion'
const acc = document.querySelectorAll(".accordion");

// Iterate over each accordion button
acc.forEach((button) => {
  button.addEventListener("click", function () {
    // Add a click event listener to each button
    this.classList.toggle("accordionActive"); // Toggle the 'accordionActive' class on the clicked button
    const panel = this.nextElementSibling; // Select the next sibling element (the content panel)
    panel.style.maxHeight = panel.style.maxHeight // Toggle the max height of the panel to create expand/collapse effect
      ? null // If maxHeight is set, remove it
      : `${panel.scrollHeight}px`; // Otherwise, set it to the scroll height of the panel
  });
});

// Dynamically generate copyright information
copyright.innerHTML =
  "Copyright &copy; " + // Start of the copyright string
  new Date().getFullYear() + // Get the current year
  ` <a href="https://www.gaz41.com">gaz41.com</a>. <span class="copy2">All Rights Reserved</span>`;
