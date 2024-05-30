document.addEventListener("DOMContentLoaded", () => {
  const themeToggleButton = document.getElementById("theme-toggle");
  const urlParams = new URLSearchParams(window.location.search);
  const countryName = urlParams.get("name");

  if (countryName) {
    fetch(`https://restcountries.com/v3.1/name/${countryName}`)
      .then((response) => response.json())
      .then((data) => {
        displayCountryDetail(data[0]);
      });
  }

  function displayCountryDetail(country) {
    const countryDetail = document.getElementById("country-detail");
    countryDetail.innerHTML = `
        <img src="${country.flags.png}" alt="${country.name.common} flag">
        <div class="details-data">
        <h2>${country.name.common}</h2>
        <div class="details-content">
        <div>
        <p><strong>Native Name:</strong> ${country.name.common}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Sub Region:</strong> ${country.subregion}</p>
        <p><strong>Capital:</strong> ${
          country.capital ? country.capital[0] : "N/A"
        }</p>
        </div>
        <div class="mid-details">
        <p><strong>Top Level Domain:</strong> ${country.tld[0]}</p>
        <p><strong>Currencies:</strong> ${Object.keys(country.currencies)}</p>
        <p><strong>Languages:</strong> ${Object.values(country.languages).join(
          ", "
        )}</p>
        </div>
        </div>
        <p><strong>Border Countries:</strong> ${
          country.borders
            ? country.borders
                .map(
                  (border) =>
                    `<a href="details.html?name=${border}">${border}</a>`
                )
                .join(", ")
            : "None"
        }</p>
        </div>
      `;

    document.getElementById("back").addEventListener("click", () => {
      window.history.back();
    });
  }

  themeToggleButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
});
