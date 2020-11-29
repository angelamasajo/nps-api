'use strict';


function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h3><a href='${responseJson.data[i].url}' target="_blank">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`
        )
    };
    $('#results').removeClass('hidden');
};

function getParksList(searchTerm, maxResults = 10) {
    searchTerm = searchTerm.replace(/\s/g, '');
    let url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=8oY4lm2uTI7QgnW6eRfGM9XmAVsNcX7dWJ3cTvrk`

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(responseJson => displayResults(responseJson))
        .catch(error => alert(`Something went wrong. Try again later.`)
        );
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchTerm = $('#js-search-term').val();
        const maxResults = $('#js-max-results').val();
        getParksList(searchTerm, maxResults);
    });
}

$(watchForm);