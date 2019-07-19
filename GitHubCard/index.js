/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
const gitpage = "https://api.github.com/users/";
const me = "benjamin-t-wilson";
let gitGrabber = axios
  .get(gitpage + me)
  .then(response => {
    console.log(response);
    return new cardHolder(response);
  })
  .catch(error => {
    console.log("error", error);
  });
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];

followersArray.forEach(cv => {
  axios
    .get(gitpage + cv)
    .then(response => {
      return new cardHolder(response);
    })
    .catch(error => {
      console.log("error", error);
    });
});

let friendsArray = [];
let friendGrabber = axios
  .get(gitpage + me + "/followers")
  .then(response => {
    console.log(response);
    return response.data.forEach(cv => {
      axios
        .get(gitpage + cv.login)
        .then(response => {
          return new cardHolder(response);
        })
        .catch(error => {
          console.log("error", error);
        });
    });
  })
  .catch(error => {
    console.log("error", error);
  });

// console.log(friendsArray);
// console.log(friendsArray[1]);

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const cardsDiv = document.querySelector(".cards");
function cardHolder(obj) {
  let cardHouse = document.createElement("div");
  cardHouse.classList.add("card");
  cardsDiv.appendChild(cardHouse);
  let cardAvatar = document.createElement("img");
  cardAvatar.setAttribute("src", obj.data.avatar_url);
  cardHouse.appendChild(cardAvatar);
  let cardRoom = document.createElement("div");
  cardRoom.classList.add("card-info");
  cardHouse.appendChild(cardRoom);
  let cardName = document.createElement("h3");
  cardName.classList.add("name");
  cardName.textContent = obj.data.name;
  cardRoom.appendChild(cardName);
  let cardUserName = document.createElement("p");
  cardUserName.classList.add("username");
  cardUserName.textContent = obj.data.login;
  cardRoom.appendChild(cardUserName);
  let cardLoc = document.createElement("p");
  cardLoc.textContent = `Location: ${obj.data.location}`;
  cardRoom.appendChild(cardLoc);
  let cardAnchor = document.createElement("a");
  cardAnchor.setAttribute("href", "obj.data.html_url");
  cardAnchor.textContent = obj.data.html_url;
  let cardProf = document.createElement("p");
  cardProf.textContent = `Profile: `;
  cardRoom.appendChild(cardProf);
  cardProf.appendChild(cardAnchor);
  let cardFollowers = document.createElement("p");
  cardFollowers.textContent = `Followers: ${obj.data.followers}`;
  let cardFollowing = document.createElement("p");
  cardFollowers.textContent = `Following: ${obj.data.following}`;
  cardRoom.appendChild(cardFollowing);
  let cardBio = document.createElement("p");
  cardBio.textContent = `Bio: ${obj.data.bio}`;
  cardRoom.appendChild(cardBio);
  let cardExpand = document.createElement("span");
  cardExpand.textContent = "Open / Close";
  cardExpand.classList.add("expandButton");
  cardRoom.appendChild(cardExpand);
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
