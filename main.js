document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-game')
  const genreButtonContainer = document.querySelector('.genre-button')
  const questionContainer = document.querySelector('.question-container')
  const answerContainer = document.querySelector('.answer-container')
  const nickNameContainer = document.querySelector('.username')
  const advanceButton = document.querySelector('.enter-button')
  let nickName
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 50000
  let timer

  // start game
  startButton.addEventListener('click', () => {
    nickNameContainer.classList.remove('hide')
    advanceButton.classList.remove('hide')
    startButton.classList.add('hide')
    nickNameContainer.focus

    // coletar dados ao pressionar enter ou clicar no botão avançar
    advanceButton.addEventListener('click', handleAdvance)
    nickNameContainer.addEventListener('keypress', (e) => {
      // retorna a mesma função que adance button se pressionado a tecla enter
      if (e.key === 'Enter') {
        handleAdvance()
      }
    })

    function handleAdvance() {
      nickName = nickNameContainer.value.trim()
      if (nickName) {
        nickNameContainer.classList.add('hide')
        advanceButton.classList.add('hide')
        genreButtonContainer.classList.add('hide')
      } else {
        alert('Please, insert a nickName')
      }
    }
  }
  )



})




