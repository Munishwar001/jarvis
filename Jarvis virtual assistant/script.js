let btn = document.getElementById("btn");
let content = document.getElementById("content");
let voice = document.getElementById("voice");
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
   // text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
}

 async function  wishme()  {
    let date = new Date();
    let hours = date.getHours();
    console.log(hours);
    
    if (hours >= 0 && hours < 12) {
        speak("good morning sir");
    }
    else if (hours >= 12 && hours < 16) {
        speak("good afternoon sir");
    }
    else { 
        speak("good evening sir"); 
        console.log("lkkl");
        
    }
}

window.addEventListener("load",wishme);  
let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition ;
let recognition = new speechRecognition();
recognition.onresult = (event)=>{
console.log(event);
let currentIndex = event.resultIndex;
  let transcript = event.results[currentIndex][0].transcript ;
    console.log(transcript);
    content.innerText = transcript; 
    takeCommand(transcript);
}

btn.addEventListener("click", () => {
    recognition.start(); 
    btn.style.display = "none"; 
    voice.style.display = "flex";
}); 

function takeCommand(message) {
    message = message.toLowerCase(); // Normalize input for consistent matching

    if (message.includes("what's your name") || message.includes("who are you")) {
        setTimeout(() => speak("My name is JARVIS, created by Munishwar."), 500);
    } 
    else if (message.includes("search for") || message.includes("who is")) {
        let query = message.replace("search for", "").trim();
        let searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        window.open(searchUrl);
        speak(`Searching for ${query} on Google.`);
    }
    else if (message.includes("hello jarvis") || message.includes("hi jarvis")) {
        setTimeout(() => speak("Hello sir, how can I assist you today?"), 500);
    }
    else if (message.includes("open youtube")) {
        window.open("https://www.youtube.com/");
        speak("Opening YouTube");
    }
    else if (message.includes("calculate")) {
        let expression = message.replace("calculate", "").trim();
        try {
            let result = eval(expression);
            speak(`The result of ${expression} is ${result}`);
        } catch (error) {
            speak("I couldn't calculate that. Please try again.");
        }
    }
    else if (message.includes("open google")) {
        window.open("https://www.google.com/");
        speak("Opening Google");
    }
    else if (message.includes("open file")) {
        speak("Sorry, I can only perform this action in a local environment.");
    }
    else if (message.includes("open facebook")) {
        window.open("https://www.facebook.com/");
        speak("Opening Facebook");
    }
    else if (message.includes("open instagram")) {
        window.open("https://www.instagram.com/");
        speak("Opening Instagram");
    } 
    else if (message.includes("remind me to")) {
        let reminder = message.replace("remind me to", "").trim();
        setTimeout(() => speak(`This is your reminder: ${reminder}`), 5000); 
        speak(`I'll remind you to ${reminder} shortly.`);
    }

    else if (message.includes("what's the time") || message.includes("tell me the time")) {
        let currentTime = new Date().toLocaleTimeString();
        speak(`The current time is ${currentTime}`);
    }
    else if (message.includes("what's the date") || message.includes("tell me the date")) {
        let currentDate = new Date().toLocaleDateString();
        speak(`Today's date is ${currentDate}`);
    }
    else if (message.includes("motivate me") || message.includes("give me a quote")) {
        let quotes = [
            "Believe you can, and you're halfway there.",
            "The only limit to our realization of tomorrow is our doubts of today.",
            "Don't watch the clock; do what it does. Keep going.",
            "The future belongs to those who believe in the beauty of their dreams.",
            "Success is not the key to happiness. Happiness is the key to success."
        ];
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        speak(randomQuote);
    }
    else if (message.includes("play a song") || message.includes("sing a song")) {
        let songs = [
            "https://www.youtube.com/watch?v=gzTeaxhI5Ck", 
            "https://www.youtube.com/watch?v=25B35c1LkBQ",
            "https://www.youtube.com/watch?v=eZZ6OV7gKSc"
        ];
        let randomSong = songs[Math.floor(Math.random() * songs.length)];
        window.open(randomSong);
        speak("Playing a song for you");
    }
    else if (message.includes("close tab") || message.includes("close window")) {
        speak("Closing the current tab");
        setTimeout(() => window.close(), 1000); // Add delay to allow speech
    }
    else if (message.includes("how are you")) {
        speak("I'm doing great, thank you for asking. How can I assist you?");
    }
    else if (message.includes("open new tab") || message.includes("open new tab") ) {
        window.open("https://www.google.com/");
        speak("Opening a new tab.");
    }
  
    else {
        speak("I'm sorry, I didn't understand that command.");
    } 
    voice.style.display = "none";
    btn.style.display ="flex";
}

