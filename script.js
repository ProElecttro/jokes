// Get the DOM elements
const currentMessage = document.getElementById('current-message-section');
const savedMessageList = document.getElementById('saved-message-list');
const clear_btn = document.getElementById('clear-all-btn');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');

// Define variables
let jokeTimer;
let saved_message = []; // array which holds the messages for the saved-messages section

// Create a new Audio object

const audio = [
  new Audio('haha.mp3'),
  new Audio('spongeBob.mp3'),
  new Audio('galaxy.mp3')
]

// Fetches a random joke from the API and displays it in the "Current Message" section
function displayJoke() {
  fetch('https://official-joke-api.appspot.com/random_joke')
    .then(response => response.json())
    .then(data => {
      // Check if the joke already exists in the saved_message array
      const existingJoke = saved_message.find(joke => joke.setup === data.setup && joke.punchline === data.punchline);
      if (existingJoke) {
        console.log('Joke already exists in saved messages');
        return;
      }

      // Update the "Current Message" section with the fetched joke
      currentMessage.innerHTML = `${data.setup} <br> ${data.punchline}`;

      // Save the fetched joke to the saved_message array
      saved_message.push(data);

      // Update the "Saved Messages" section with the new joke
      displaysaved_message();

      // Play an audio sound
      const rndm_index = Math.floor(Math.random() * audio.length);
      audio[rndm_index].play();
    });
}



// Display all saved messages in the "Saved Messages" section
function displaysaved_message() {
  savedMessageList.innerHTML = ''; // clear the savedMessageList element
  // Iterate through the saved_message array and create a new list item for each joke
  saved_message.forEach((joke, index) => {
    const joke_item = document.createElement('li'); // creating a list item element
    joke_item.innerHTML = `<button class="delete-btn" data-index="${index}">Delete</button>  ${joke.setup} ${joke.punchline}`;
    joke_item.setAttribute('data-index', index);
    savedMessageList.appendChild(joke_item);
  });

  // Set up event listeners for the delete buttons
  setupDeleteButtons();
}


// Delete a saved message from the saved_message array
function deleteSavedMessage(index) {
  // Remove the message from the saved_message array
  saved_message.splice(index, 1);

  // Update the "Saved Messages" section
  displaysaved_message();

  // Alert the user that the message was deleted
  alert('Message deleted!');
}

// Set up event listeners for the delete buttons
function setupDeleteButtons() {
  const deleteButtons = document.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Get the index of the message to be deleted
      const index = parseInt(button.parentNode.getAttribute('data-index'));

      // Delete the message from the saved_message array
      deleteSavedMessage(index);
    });
  });
}

// Clear all saved messages from the saved_message array and the "Saved Messages" section
function clearAllsaved_message() {
  // Clear the saved_message array
  saved_message = [];

  // Update the "Saved Messages" section
  displaysaved_message();
}

// Start the joke timer to fetch and display new jokes every few seconds
function startJokeTimer() {
  // Update the "Current Message" section to indicate that new jokes are being fetched
  currentMessage.innerHTML = 'Fetching new jokes, wait for few seconds';

  // Set up the joke timer to display a new joke every 13 seconds
  jokeTimer = setInterval(() => {
    displayJoke();
  }, 13000);
}

// Stop the joke timer and display the most recent saved joke in the "Current Message" section
function stopJokeTimer() {
  // Clear the joke timer
  clearInterval(jokeTimer);
  displayLastSavedJoke();
}

// sets up the event listeners for the buttons
function setupButtons() {
  clear_btn.addEventListener('click', clearAllsaved_message);
  startBtn.addEventListener('click', startJokeTimer);
  stopBtn.addEventListener('click', stopJokeTimer);
}

// initializes the page by displaying the "Current Message" section and setting up the buttons and saved messages
function initiate() {
  currentMessage.innerHTML = 'Press "Accept Notifications" to begin';
  setupButtons();
  displaysaved_message();

}

initiate();
