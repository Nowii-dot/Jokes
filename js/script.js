document.addEventListener("DOMContentLoaded", () => {
  fetch('data/jokes.json')
    .then(response => response.json())
    .then(jokes => {
      const container = document.getElementById('jokeList');
      jokes.forEach(joke => {
        const jokeHTML = createJokeHTML(joke);
        container.appendChild(jokeHTML);
      });
    });
});

function createJokeHTML(joke) {
  const div = document.createElement('div');
  div.className = 'joke-container';

  // odczytaj rating z localStorage jeśli istnieje
  const storedRating = localStorage.getItem(`rating-${joke.id}`);
  const initialRating = storedRating ? parseFloat(storedRating) : joke.rating;

  div.innerHTML = `
    <div class="joke">
      <p class="joke-text">${joke.text}</p>
      <button class="joke-button joke-show">Pokaż</button>
      <p class="hidden-text" style="display:none;">${joke.answer}</p>
    </div>

    <div class="user-panel">
      <div class="user-avatar"><img src="/img/user.png" alt="User Avatar"></div>
      <div class="user-info">
        <span class="username">${joke.author}</span>
        <span class="date">${joke.date}</span>
      </div>
    </div>

    <div class="button-panel" data-id="${joke.id}">
                         <button class="joke-button like" ><img class="img-like" src="/img/like.png"></button>
                    <button class="joke-button unlike" ><img class="img-like" src="/img/unlike.png"></button>
      <button class="joke-button average">${initialRating.toFixed(2).replace('.', ',')}</button>
    </div>
  `;

  // logika przycisku "Pokaż"
  const showBtn = div.querySelector('.joke-show');
  const answer = div.querySelector('.hidden-text');
  showBtn.addEventListener('click', () => {
    answer.style.display = 'block';
    showBtn.style.display = 'none';
  });

  // ocenianie
  const likeBtn = div.querySelector('.like');
  const unlikeBtn = div.querySelector('.unlike');
  const avgBtn = div.querySelector('.average');

  let rating = initialRating;

  likeBtn.addEventListener('click', () => {
    rating += 1;
    updateRating(joke.id, rating, avgBtn);
  });

  unlikeBtn.addEventListener('click', () => {
    rating -= 1;
    updateRating(joke.id, rating, avgBtn);
  });

  return div;
}

function updateRating(id, rating, avgBtn) {
  avgBtn.textContent = rating.toFixed(2).replace('.', ',');
  localStorage.setItem(`rating-${id}`, rating);
}
