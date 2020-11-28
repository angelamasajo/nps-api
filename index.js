'use strict';

// put your own value below!
const apiKey = '8oY4lm2uTI7QgnW6eRfGM9XmAVsNcX7dWJ3cTvrk'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


// function formatQueryParams(params) {
//   const queryItems = Object.keys(params)
//     .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//   return queryItems.join('&');
// }

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3><a href='${responseJson.data[i].url}' target="_blank">${responseJson.data[i].fullName}</a></h3>
      <p>${responseJson.data[i].description}</p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParksList(searchTerm, maxResults=10) {
    let url = `https://developer.nps.gov/api/v1/parks?stateCode=${searchTerm}&limit=${maxResults}&api_key=8oY4lm2uTI7QgnW6eRfGM9XmAVsNcX7dWJ3cTvrk`
//   const queryString = formatQueryParams(params)
//   const url = searchURL + '?' + queryString;

//   console.log(url);
console.log(maxResults)

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
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