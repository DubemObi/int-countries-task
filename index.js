document.addEventListener("DOMContentLoaded", () => {
  const countryList = document.getElementById("country-list");
  const customSelectTrigger = document.querySelector(".select-trigger");
  const customOptions = document.querySelectorAll(".option");
  const themeToggleButton = document.getElementById("theme-toggle");

  fetch("https://restcountries.com/v3.1/all")
    .then((response) => response.json())
    .then((data) => {
      displayCountries(data);
    });

  function displayCountries(countries) {
    countryList.innerHTML = "";
    countries.forEach((country) => {
      const countryElement = document.createElement("div");
      countryElement.className = "country";
      countryElement.innerHTML = `
          <img src="${country.flags.png}" alt="${country.name.common} flag">
          <div class="country-data">
          <h3>${country.name.common}</h3>
          <p>Population: ${country.population.toLocaleString()}</p>
          <p>Region: ${country.region}</p>
          <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
          </div>
          `;
      countryElement.addEventListener("click", () => {
        window.location.href = `details.html?name=${country.name.common}`;
      });
      countryList.appendChild(countryElement);
    });
  }

  document.getElementById("search").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const countryElements = document.querySelectorAll(".country");

    countryElements.forEach((countryElement) => {
      const countryName = countryElement
        .querySelector("h3")
        .innerText.toLowerCase();
      if (countryName.includes(searchTerm)) {
        countryElement.style.display = "block";
      } else {
        countryElement.style.display = "none";
      }
    });
  });

  customSelectTrigger.addEventListener("click", () => {
    document.querySelector(".select").classList.toggle("open");
  });

  customOptions.forEach((option) => {
    option.addEventListener("click", (e) => {
      const selectedRegion = e.target.getAttribute("data-value");
      customSelectTrigger.textContent = e.target.textContent;
      document.querySelector(".select").classList.remove("open");
      filterCountriesByRegion(selectedRegion);
    });
  });

  function filterCountriesByRegion(region) {
    const countryElements = document.querySelectorAll(".country");
    countryElements.forEach((countryElement) => {
      const countryRegion = countryElement
        .querySelector("p:nth-child(3)")
        .innerText.split(": ")[1];
      if (region === "" || countryRegion === region) {
        countryElement.style.display = "block";
      } else {
        countryElement.style.display = "none";
      }
    });
  }

  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".select")) {
      document.querySelector(".select").classList.remove("open");
    }
  });
});
