document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-game')
  const genreButtonsContainer = document.querySelector('.genre-buttons')
  const questionContainer = document.querySelector('.question-container')
  const answerContainer = document.querySelector('.answer-container')
  const nickNameContainer = document.querySelector('.username')
  const advanceButton = document.querySelector('.enter-button')
  const scoreContainer = document.querySelector('.score-container')
  const genreButtons = document.querySelectorAll('.genre-button')
  const restartButton = document.querySelector('.restart-game')
  let selectedGenre = null
  let nickName
  let questions = [];
  let currentQuestionIndex = 0;
  let score = 100000
  let timer // armazena o tempo


  // start game
  startButton.addEventListener('click', () => {
    nickNameContainer.classList.remove('hide')
    advanceButton.classList.remove('hide')
    startButton.classList.add('hide')
    nickNameContainer.focus()

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
        genreButtonsContainer.classList.remove('hide')
      } else {
        alert('Please, insert a nickName')
      }
    }
  })

  // restart game
  restartButton.addEventListener('click', () => {
    const sameNickName = confirm('Deseja jogar novamente com o mesmo nickName?')

    if (sameNickName) {
      // alert(`Jogo reiniciado com o nickname: ${nickName}`)
      genreButtonsContainer.classList.remove('hide')
      scoreContainer.classList.add('hide')
      restartButton.classList.add('hide')
    } else {
      nickNameContainer.classList.remove('hide')
      advanceButton.classList.remove('hide')
      restartButton.classList.add('hide')
      scoreContainer.classList.add('hide')
    }
  })

  genreButtons.forEach(button => {
    button.addEventListener('click', () => {
      genreButtons.forEach(btn => {
        btn.classList.remove('selected')
        btn.classList.add('unselected')
      })

      button.classList.add('selected')
      button.classList.remove('unselected')

      selectedGenre = button.getAttribute('id')
      loadQuestions()
    })
  })

  // fetch questions
  async function loadQuestions() {
    if (!selectedGenre) {
      alert('Selecione um genero para iniciar.')
      return
    }

    try {
      const response = await fetch('/questions.json')

      // verifica se a resposta foi bem-sucedida
      /* 
      if (!response.ok) {
        throw new Error('erro ao carregar as perguntas. Codigo de status:' + response.status)
      }

      // resposta para depuração
      console.log('resposta:', response)
      */

      const data = await response.json()
      console.log('dados:', data)

      // carrega as informações do genero selecionado
      questions = data[selectedGenre]
      if (questions && questions.length > 0) {
        genreButtonsContainer.classList.add('hide')
        questionContainer.classList.remove('hide')
        answerContainer.classList.remove('hide')
        displayQuestions()
      } else {
        alert('Não há perguntas para este genero.')
      }
    }
    catch (error) {
      console.error('Erro ao carregar as perguntas', error)
    }
  }

  // Exibir Pergunta
  function displayQuestions() {
    const question = questions[currentQuestionIndex];

    // exibe o texto da pergunta no local destinado
    questionContainer.innerText = question.pergunta

    // exibe as alternativas de resposta na tela
    answerContainer.innerHTML = '';

    question.opcoes.forEach(option => {
      const button = document.createElement('button')
      button.innerText = option
      button.classList.add('answer-button')
      button.addEventListener('click', () => selectAnswer(option))
      answerContainer.appendChild(button)
    })

    startScoreTimer()

    // Iniciar o Timer
    function startScoreTimer() {
      let startTime = Date.now()

      timer = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        score -= elapsedTime * 0.010
        if (score <= 0) {
          score = 0
          clearInterval(timer)
          alert('tempo esgotado!')
          resetGame()
          endQuiz()
        }

        scoreContainer.innerText = 'Score:' + Math.round(score)
      }, 100)

    }

    function selectAnswer(selectedOption) {
      clearInterval(timer)

      const correctAnswer = questions[currentQuestionIndex].resposta

      if (selectedOption === correctAnswer) {
        score += 5000
        console.log('Resposta correta!')
      } else {
        score -= 7000
        console.log('Resposta errada!')
      }

      nextQuestion()
      console.log(score)
    }

    function nextQuestion() {
      currentQuestionIndex++
      // se a pergunta atual não for a ultima, exibe a próxima
      if (currentQuestionIndex < questions.length) {
        displayQuestions()
      } else {
        endQuiz()
      }
    }

    function endQuiz() {
      clearTimeout(timer)
      questionContainer.classList.add('hide')
      answerContainer.classList.add('hide')
      if (score >= 25000) {
        scoreContainer.innerText = 'Parabéns, ' + nickName + '! Sua pontuação foi ' + Math.round(score) + '.'
      } else if (score >= 15000) {
        scoreContainer.innerText = 'Você conseguiu, ' + nickName + '! Sua pontuação foi ' + Math.round(score) + '.'
      } else {
        scoreContainer.innerText = 'Que pena, ' + nickName + '! Sua pontuação foi ' + Math.round(score) + '.'
      }
      scoreContainer.classList.remove('hide')
      restartButton.classList.remove('hide')

      resetGame()
    }

    function resetGame() {
      score = 100000
      currentQuestionIndex = 0
      selectedGenre = null
      questions = []
      timer = null
    }
  }
})