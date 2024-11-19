let countries = [];

// Populate the dropdown with countries
const populateDropdown = (countryData) => {
    const countryList = document.getElementById("countryList");
    countryList.innerHTML = ""; // Clear previous content

    countryData.forEach(country => {
        const listItem = document.createElement("div");
        listItem.className = "dropdown-item";
        listItem.innerHTML = `
            <img src="${country.flag}" alt="${country.name} flag" class="flag-icon">
            <span>${country.name}</span>`;

        listItem.addEventListener("click", () => {
            // Update the input field with the selected country's name and flag
            document.getElementById("countrySearch").value = country.name;

            // Update the selected flag display inside the input field
            const selectedFlag = document.getElementById("selectedFlag");
            selectedFlag.src = country.flag;
            selectedFlag.alt = `${country.name} flag`;
            selectedFlag.style.display = "inline-block"; // Show the flag inside input

            // Hide the dropdown
            document.getElementById("countryList").style.display = "none";
        });

        countryList.appendChild(listItem);
    });
};

// Fetch the full list of countries from the API and sort them
fetch("https://restcountries.com/v3.1/all")
    .then(response => response.json())
    .then(data => {
        countries = data.map(country => ({
            name: country.name.common,
            flag: country.flags.svg
        })).sort((a, b) => a.name.localeCompare(b.name));

        populateDropdown(countries);
    })
    .catch(error => console.error("Error fetching countries:", error));

// Search functionality: Filter countries as you type
document.getElementById("countrySearch").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(query)
    );

    populateDropdown(filteredCountries); // Populate with filtered results

    // Handle "No results found"
    const countryList = document.getElementById("countryList");
    if (filteredCountries.length === 0) {
        const noResultsItem = document.createElement("div");
        noResultsItem.id = "noResults";
        noResultsItem.className = "dropdown-item text-muted";
        noResultsItem.textContent = "No results found";
        countryList.appendChild(noResultsItem);
    }
});

// Adjust the dropdown width to match the input field
const adjustDropdownWidth = () => {
    const inputField = document.getElementById("countrySearch");
    const dropdownList = document.getElementById("countryList");
    dropdownList.style.width = `${inputField.offsetWidth}px`;
};

// Adjust the dropdown width on window resize or when the input field is focused
window.addEventListener("resize", adjustDropdownWidth);
document.getElementById("countrySearch").addEventListener("focus", adjustDropdownWidth);

// Show dropdown when input field is focused
document.getElementById("countrySearch").addEventListener("focus", () => {
    document.getElementById("countryList").style.display = "block";
});

// Hide dropdown when clicking outside of the input field or dropdown
document.addEventListener("click", (event) => {
    const inputField = document.getElementById("countrySearch");
    const dropdown = document.getElementById("countryList");

    if (!inputField.contains(event.target) && !dropdown.contains(event.target)) {
        dropdown.style.display = "none";
    }
});

// Show dropdown on hover over the input field
document.getElementById("countrySearch").addEventListener("mouseover", () => {
    document.getElementById("countryList").style.display = "block";
});
