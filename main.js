

// url = `http://www.recipepuppy.com/api/?q=${searchTerm}`
// url = "http://www.recipepuppy.com/api/"

let list = document.querySelector('.list');
// need click listener
let button = document.getElementById('button');
let input = document.getElementById('search');
button.addEventListener('click', fetchSearch );
input.addEventListener('keypress', function(e) {
var key = e.which || e.keyCode;
if (key === 13) {fetchSearch()}} );
let searchTerm = document.getElementById('search').value
let url = `http://recipepuppyproxy.herokuapp.com/api/?q=${searchTerm}`
function fetchSearch() {
  list.innerHTML = ``;
  fetch(url)
    // Data is fetched and we get a promise.
    .then(
      // The promise returns a response from the server.
      function(response) {
        // We process the response accordingly.
        if (response.status !== 200) {
          console.log(response.status);
          return;
        }
        response.json().then(function(data) {
          console.log("Here is the data:", data);
          // let result = data.results;
          for (var i = 0; i < data.results.length; i++) {
            let title = data.results[i].title;
            let href = data.results[i].href;
            console.log(data.results[i].thumbnail);
            let tnail = data.results[i].thumbnail;
            if (data.results[i].thumbnail == undefined) {
              let tnail = "http://via.placeholder.com/140x100";
              }


            let listItem =`
            <li>
              <p><a href="${href}">${title}</a></p>
              <p><img src="${tnail}" alt=""></p>
            </li>`

            console.log(title);
            console.log(href);
            console.log(tnail);

            // list.appendChild(listItem); doesn't work
            // document.ul.innerHTML = listItem;
            list.innerHTML += listItem;
          }
        });
      }
    )
    .catch(function(err) {
      console.log("Fetch Error :-S", err);
    });
}
