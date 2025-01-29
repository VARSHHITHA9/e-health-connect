// Author: Varshitha

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const outputElement = document.getElementById('output');

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
}

function takeCommand() {
    return new Promise((resolve, reject) => {
        recognition.lang = 'en-IN';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        outputElement.innerHTML += '<br>Listening...';

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            resolve(transcript);
        };

        recognition.onerror = (event) => {
            console.error('Error occurred in recognition:', event.error);
            reject(event.error);
        };

        recognition.start();
    });
}

function checkAllMessages(message) {
    message = message.toLowerCase();
    
    if (message.includes('fever')) {
        speak("What's your age?");
        let age = prompt('You (age in numbers):');
        age = parseInt(age);

        if (age <= 5) return 'Take PARACETAMOL 120MG/5ML, morning and night after food.';
        if (age > 5 && age <= 9) return 'Take PARACETAMOL/ACETAMINOPHEN 250MG/5ML, morning and night after food.';
        if (age > 9 && age <= 15) return 'Take PARACETAMOL 500MG, morning and night after food.';
        if (age >= 16) return 'Take PARACETAMOL 600MG, morning and night after food.';
    }

    if (message.includes('cough')) {
        speak("What's your age?");
        let age = prompt('You (age in numbers):');
        age = parseInt(age);

        if (age < 9) return 'Data not available.';
        if (age > 9 && age < 12) return 'Take AMBROXOL-15MG + GUAIPHENESIN-50MG + LEVOSALBUTAMOL-0.5MG.';
        if (age >= 12) {
            let type = prompt('1. Dry cough\n2. Phlegm cough');
            return type == 1
                ? 'Take TERBUTALINE SULPHATE-1.25MG/5ML + BROMHEXINE HYDROCHLORIDE-2MG/5ML + GUAIPHENESIN-50MG/5ML + MENTHOL-0.5MG/5ML.'
                : 'Take AMBROXOL-30MG + GUAIPHENESIN-50MG + LEVOSALBUTAMOL-1MG.';
        }
    }

    if (message.includes('stomach') && message.includes('pain')) {
        speak("What's your age?");
        let age = parseInt(prompt('You (age in numbers):'));
        return age <= 10
            ? 'Take DICYCLOMINE-10MG + SIMETHICONE-40MG.'
            : 'Take DICYCLOMINE-10MG + MEFENAMIC ACID-250MG.';
    }

    if (message.includes('headache')) {
        speak("What's your age?");
        let age = parseInt(prompt('You (age in numbers):'));
        return age > 2 && age <= 10
            ? 'Take Aceclofenac(50.0 Mg) + Paracetamol / Acetaminophen(125.0 Mg).'
            : 'Take CAFFEINE-50MG + PARACETAMOL-300MG + PROPYPHENAZONE-150MG.';
    }

    if (message.includes('cold')) {
        speak("What's your age?");
        let age = parseInt(prompt('You (age in numbers):'));
        return age > 3 && age <= 16
            ? 'Take CHLORPHENIRAMINE-1MG + PARACETAMOL-125MG + PHENYLEPHRINE-5MG + SODIUM CITRATE-60MG.'
            : 'Take CHLORPHENIRAMINE-8MG + PHENYLEPHRINE-20MG.';
    }

    const simpleResponses = {
        hello: "Hello! How may I help you?",
        hi: "Hello! How may I help you?",
        hey: "Hello! How may I help you?",
        bye: "See you!",
        goodbye: "See you!",
        "how are you": "I'm doing fine, and you?",
        thanks: "You're welcome!",
        thank: "You're welcome!"
    };

    return simpleResponses[message] || "Sorry, I didn't understand that. Please try again.";
}

outputElement.innerHTML += 'CLICK ON "START" TO BEGIN :)';

const speakButton = document.getElementById('speakButton');
speakButton.addEventListener('click', async function () {
    speak("Hello! Welcome to e-HealthConnect. Please tell us your medical issue.");
    outputElement.innerHTML += '<br>Bot: Hello! Welcome to e-HealthConnect. Please tell us your medical issue.';

    try {
        while (true) {
            const query = await takeCommand();
            outputElement.innerHTML += '<br><span class="user-message">You: ' + query + '</span>';

            const response = checkAllMessages(query);
            outputElement.innerHTML += '<br><span class="bot-message">Bot: ' + response + '</span>';
            speak(response);
        }
    } catch (error) {
        outputElement.innerHTML += '<br><span class="bot-message">Error: ' + error + '</span>';
    }
});
