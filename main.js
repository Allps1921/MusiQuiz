document.addEventListener('DOMContentLoaded', function () {
  const genreButton = document.querySelectorAll('.genre-button');
  const startButton = document.getElementById('start-button');
  const tittleButton = document.getElementById('tittle-button');
}
  genreButton.addEventListener("click", genreButtonSelect)
  startButton.addEventListener('click', startGameQuiz)
  tittleButton.addEventListener('click', tittleButtonSelect)