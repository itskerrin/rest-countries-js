const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownContent = document.getElementById('dropdown-content');
const dropdownItem = dropdownContent.querySelectorAll('.dropdown-item');
const countriesContainer = document.getElementById('countries-container');
const searchbarInput = document.querySelector('input');

// Drop down regions
dropdownBtn.addEventListener('click', () => {
  dropdownContent.style.display === 'none' ||
  dropdownContent.style.display === ''
    ? (dropdownContent.style.display = 'block')
    : (dropdownContent.style.display = 'none');
});

// Fetch data and render cards for each country
const fetchCountries = async () => {
  const res = await fetch('https://restcountries.com/v2/all');
  const countries = await res.json();

  displayCountries(countries);
};

fetchCountries();

function displayCountries(countries) {
  countriesContainer.innerHTML = '';

  countries.forEach((country) => {
    const countryEl = document.createElement('div');
    countryEl.classList.add('country-card');
    countryEl.innerHTML = `
        <div>
            <img src="${country.flag}" alt="${country.name}" />
        </div>
        <div class="card-content">
            <h2 class="country-name">${country.name}</h2>
            <h2>Population: <span>${country.population.toLocaleString()}</span></h2>
            <h2 class="country-region">Region: <span>${
              country.region
            }</span></h2>
            <h2>Capital: <span>${country.capital}</span></span></h2>
        </div>
        `;
    countriesContainer.appendChild(countryEl);
  });
}

// Search for country - search bar
searchbarInput.addEventListener('input', (e) => {
  const value = e.target.value;
  const countryNames = document.querySelectorAll('.country-name');

  countryNames.forEach((name) => {
    name.innerText.toLowerCase().includes(value.toLowerCase())
      ? (name.parentElement.parentElement.style.display = 'block')
      : (name.parentElement.parentElement.style.display = 'none');
  }); // change the visibility of 'countryEl' if it matches the input value
});

// Filter by region
// add event listener to each dropdown item (regions)
dropdownItem.forEach((regions) => {
  regions.addEventListener('click', () => {
    const value = regions.innerText;

    const countryRegion = document.querySelectorAll('.country-region');
    // check if clicked value matches h2 displaying regions
    countryRegion.forEach((region) => {
      region.innerText.includes(value) || value === 'All Regions'
        ? (region.parentElement.parentElement.style.display = 'block')
        : (region.parentElement.parentElement.style.display = 'none');
    });
  });
});
