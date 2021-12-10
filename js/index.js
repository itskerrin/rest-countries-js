const dropdownBtn = document.getElementById('dropdown-btn');
const dropdownContent = document.getElementById('dropdown-content');
const dropdownItem = document.querySelectorAll('.dropdown-item');
const countriesContainer = document.getElementById('countries-container');

// Filter by region
dropdownBtn.addEventListener('click', () => {
  dropdownContent.style.display === 'none' ||
  dropdownContent.style.display === ''
    ? (dropdownContent.style.display = 'block')
    : (dropdownContent.style.display = 'none');
});

// get region
dropdownItem.forEach((region) => {
  region.addEventListener('click', () => {
    console.log(region.innerText);
  });
});

// fetch countries and render each on screen
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
            <h2>${country.name}</h2>
            <h2>Population: <span>${country.population.toLocaleString()}</span></h2>
            <h2>Region: <span>${country.region}</span></h2>
            <h2>Capital: <span>${country.capital}</span></span></h2>
        </div>
        `;
    countriesContainer.appendChild(countryEl);
  });
}
