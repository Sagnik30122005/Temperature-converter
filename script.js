const celsiusInput = document.getElementById("celsius");
const fahrenheitInput = document.getElementById("fahrenheit");
const kelvinInput = document.getElementById("kelvin");
const message = document.getElementById("message");

const inputs = {
  celsius: celsiusInput,
  fahrenheit: fahrenheitInput,
  kelvin: kelvinInput
};

let activeInput = null;

function roundTemperature(value) {
  return Number.parseFloat(value.toFixed(2));
}

function updateValues(source, value) {
  const temperature = Number.parseFloat(value);

  if (Number.isNaN(temperature)) {
    clearInputs(source);
    message.textContent = "Enter a value in any field.";
    return;
  }

  let celsius;
  let fahrenheit;
  let kelvin;

  if (source === "celsius") {
    celsius = temperature;
    fahrenheit = (temperature * 9) / 5 + 32;
    kelvin = temperature + 273.15;
  }

  if (source === "fahrenheit") {
    celsius = ((temperature - 32) * 5) / 9;
    fahrenheit = temperature;
    kelvin = celsius + 273.15;
  }

  if (source === "kelvin") {
    celsius = temperature - 273.15;
    fahrenheit = (celsius * 9) / 5 + 32;
    kelvin = temperature;
  }

  inputs.celsius.value = source === "celsius" ? value : roundTemperature(celsius);
  inputs.fahrenheit.value = source === "fahrenheit" ? value : roundTemperature(fahrenheit);
  inputs.kelvin.value = source === "kelvin" ? value : roundTemperature(kelvin);

  message.textContent = "Conversions updated instantly.";
}

function clearInputs(source) {
  Object.entries(inputs).forEach(([unit, input]) => {
    if (unit !== source) {
      input.value = "";
    }
  });
}

Object.entries(inputs).forEach(([unit, input]) => {
  input.addEventListener("input", () => {
    if (activeInput) return;

    activeInput = unit;
    updateValues(unit, input.value);
    activeInput = null;
  });
});