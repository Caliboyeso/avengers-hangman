
    // Global Variables
    // ==================================================================================================

    // A array that stores a list of avengers
    var avengersList = ["ironman", "captainamerica", "thor", "hulk", "hawkeye", "blackwidow", "warmachine",
                        "falcon", "wintersoldier", "vision", "wanda", "drstrange", "spiderman", "blackpanther",
                        "starlord", "gamora", "rocket", "groot", "drax", "groot", "mantis", "antman", "wasp"];
    // This empty variable will store a random avenger from the avengersList array
    var randomAvenger = "";
    // This empty array will store the letters of the avengers name individually
    var lettersInRandomAvenger = [];
    // This variable will store the number of letters of the randomly picked avenger
    var numberOfLetters = 0;
    // This empty array that will store the letters the user guesses correctly
    var correctGuesses = [];
    // This empty array that will store the letters the user guesses wrong
    var wrongGuesses = [];
    // The number of guesses the user starts off with
    var guessesLeft = 9;
    // A win counter to keep track of how many wins
    var winCounter = 0;
    // A loss counter to keep track of how many loses
    var lossCounter = 0;

    // Functions
    // ==================================================================================================

    // A function that sets up the game
    function startGame() {
        // This resets the guesses left back to 9
        guessesLeft = 9;
        // This stores a random avenger using the Math.random() function
        randomAvenger = avengersList[Math.floor(Math.random() * avengersList.length)];
        // This stores the letters of the randomly picked avenger using the split() function
        lettersInRandomAvenger = randomAvenger.split("");
        // This stores the number of letters in the avengers name
        numberOfLetters = lettersInRandomAvenger.length;
        // This resets the letters the user guessed correctly
        correctGuesses = [];
        // This resets the letters the user guessed wrong
        wrongGuesses = [];
        // A for loop that will cover the name of the avenger with dashes
        for (var i = 0; i < numberOfLetters; i++) {
            // This renders dashes to the html using the push() function
            correctGuesses.push("-");
        }
        // This clears the correct guesses from the previous round
        document.getElementById("correct-guesses").innerHTML = correctGuesses.join(" ");
        // This clears the wrong guesses from the previous round
        document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
        // This renders the number of guesses left
        document.getElementById("guesses-left").innerHTML = guessesLeft;
    }

    // A function that checks if the letters guessed are correct or wrong
    function checkLetters(letter) {
        // This boolean will be toggled depending if the letter is in the avengers name
        var letterInWord = false;
        // A for loop that checks if the letter exists in the avengers name
        for (var i = 0; i < numberOfLetters; i++) {
            // A if statment if the letter does exist in the avengers name
            if (randomAvenger[i] === letter) {
                // This boolean changes to true since the letter does exist
                letterInWord = true;
            }
        }
        // A if statement that checks where exactly the letter is located in the avengers name
        if (letterInWord) {
            // A for loop that loops through the name
            for (var j = 0; j < numberOfLetters; j++) {
                // A if statement that finds where the letter is located
                if (randomAvenger[j] === letter) {
                    // This places the letter in the correct guesses column
                    correctGuesses[j] = letter;
                }
            }
        }
        // A else statement if the user guesses the wrong letter
        else {
            // This renders the letter the user guessed wrong
            wrongGuesses.push(letter);
            // This removes one from the number of guesses left using the decrement operator
            guessesLeft--;
        }
    }

    // A function that will update the user if they won or lost
    function roundComplete() {
        // This clears the correct guesses from the previous round
        document.getElementById("correct-guesses").innerHTML = correctGuesses.join(" ");
        // This clears the wrong guesses from the previous round
        document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
        // This renders the number of guesses left
        document.getElementById("guesses-left").innerHTML = guessesLeft;
        // A if statement if all the letters match the solution
        if (lettersInRandomAvenger.toString() === correctGuesses.toString()) {
            // This adds one to the win counter using the increment operator
            winCounter++;
            // This gives the user an alert notify that they have won
            alert("We won Mr. Stark! We won!");
            // This updates the win counter
            document.getElementById("win-counter").innerHTML = winCounter;
            // Calling the startGame() function to start the next round
            startGame();
        }
        // A else if statement if the user runs out of guesses
        else if (guessesLeft === 0) {
            // Adds one to the loss counter by using the increment operator
            lossCounter++;
            // This gives the user an alert to notify that they have lost and should never come back again(jk)
            alert("You couldn't live with your own failure. Where did that bring you? Back to me. You lose!");
            // This updates the loss counter
            document.getElementById("loss-counter").innerHTML = lossCounter;
            // Calling the startGame() function to start the next round
            startGame();
        }
    }

    // MAIN PROCESS
    // ==================================================================================================

    // Calling the startGame() function to start the game
    startGame();
    // This function will capture key clicks
    document.onkeyup = function(e) {
        // A if statement if the key pressed is a letter
        if (e.keyCode >= 65 && e.keyCode <= 90) {
            // This will convert all key clicks to lower case letters using the toLowerCase() function
            var letterGuessed = e.key.toLowerCase();
            // This checks if the letter/key clicked is correct
            checkLetters(letterGuessed);
            // Calling the roundComplete() function to start the next round
            roundComplete();
        }
    };