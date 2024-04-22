document.addEventListener('DOMContentLoaded', function () {
    const FlagImage = document.getElementById('flag-img');
    const GuessInput = document.getElementById('guess-input');
    const SubmitBtn = document.getElementById('submit-btn');
    const ResultMsg = document.getElementById('result');

  
    function fetchRandomFlag() {
        fetch('https://restcountries.com/v3.1/all')
            .then(response => response.json())
            .then(data => {
                const randomIndex = Math.floor(Math.random() * data.length);
                const flagUrl = data[randomIndex].flags.png;
                const countryName = data[randomIndex].name.common;
                FlagImage.src = flagUrl;
                FlagImage.dataset.country = countryName;

            })
            .catch(error => console.log('Error fetching data: ', error));
    }

    function checkGuess() {
        const userGuess = GuessInput.value.trim().toLowerCase();
        const correctAnswer = FlagImage.dataset.country.toLowerCase();

        console.log(userGuess, correctAnswer);

        if (userGuess === correctAnswer) {
            ResultMsg.textContent = 'Correct!';
            ResultMsg.style.color = 'green';
        } else {
            ResultMsg.textContent = 'Incorrect. Try again.';
            ResultMsg.style.color = 'red';
        }
      
        GuessInput.value = '';
       
        fetchRandomFlag();
    }

    SubmitBtn.addEventListener('click', checkGuess);

    fetchRandomFlag();
});