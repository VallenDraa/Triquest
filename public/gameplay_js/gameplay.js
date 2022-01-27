const questionCardWrapper = document.querySelector('.question-card-wrapper'),
  questionCards = document.querySelectorAll('.question-card');

// calling api and assigning the questions
const questions = {
  fetchQuestion: () => {
    return fetch('../data/sampleQuestion.json')
      .then((res) => res.json())
      .then((questionsRes) => {
        questionsRes.results.forEach((question) => {
          questions.questionList.push(question);
        });
      })
      .then(() =>
        questions.assignQuestionPropertyToCard(
          questions.questionList,
          questions.currentQuestion
        )
      );
  },
  assignQuestionPropertyToCard: (questionsArr, i) => {
    // for multiple choice
    if (questionsArr[i].type == 'multiple') {
      document.querySelector('.question-four-opt').innerHTML =
        questionsArr[i].question;
      questions.multipleAnswerAssign(
        questionsArr[i].correct_answer,
        questionsArr[i].incorrect_answers,
        document.querySelectorAll('.answer-four')
      );
      questions.questionCardFooter(questionsArr, i);
      document.querySelector('.question-card-two').classList.add('hidden');
      document.querySelector('.question-card-four').classList.remove('hidden');
      multipleOrBool = 0;
    }
    // for boolean choice
    else {
      document.querySelector('.question-two-opt').innerHTML =
        questionsArr[i].question;
      questions.boolAnswerAssign(
        questionsArr[i].correct_answer,
        document.querySelectorAll('.answer-two')
      );
      questions.questionCardFooter(questionsArr, i);
      document.querySelector('.question-card-four').classList.add('hidden');
      multipleOrBool = 1;
      document.querySelector('.question-card-two').classList.remove('hidden');
    }
  },
  multipleAnswerAssign: (correct, incorrects, element) => {
    let choices = incorrects.concat(correct),
      pastNumChoice = [],
      pastNumCard = [],
      indexChoice,
      indexCard;

    function generateIndex(pastNumType, indexType) {
      if (pastNumType.length != 0) {
        while (pastNumType.includes(indexType)) {
          indexType = Math.round(Math.random() * 3);
        }
      } else {
        indexType = Math.round(Math.random() * 3);
      }
      return indexType;
    }

    for (const choice in choices) {
      // randomize the choice input to html
      indexChoice = generateIndex(pastNumChoice, indexChoice);
      indexCard = generateIndex(pastNumCard, indexCard);

      // insert to html and check if the choice is the correct Answer
      if (choices[indexChoice] === correct) {
        element[indexCard].classList.add('co');
      }
      element[indexCard].textContent = choices[indexChoice];

      //  pushing the index to the respective array, so that, that number index wont be picked again
      pastNumChoice.push(indexChoice);
      pastNumCard.push(indexCard);
    }
  },
  boolAnswerAssign: (correct, answerCard) => {
    const trueOpt = 'True';

    if (trueOpt === correct) {
      answerCard[0].classList.add('co');
      answerCard[1].classList.add('li');
    } else {
      answerCard[0].classList.add('li');
      answerCard[1].classList.add('co');
    }
  },
  questionCardFooter: (questionsArr, i) => {
    if (questionsArr[i].type == 'multiple') {
      document.querySelector('.footer-four-opt').textContent = `${i + 1}/${
        questionsArr.length
      } · ${questionsArr[i].difficulty} · ${questionsArr[i].category}`;
    } else {
      document.querySelector('.footer-two-opt').textContent = `${i + 1}/${
        questionsArr.length
      } · ${questionsArr[i].difficulty} · ${questionsArr[i].category}`;
    }
  },
  checkHowLongQuestion: (question) => {
    if (question.length > 100 && question.length < 130) {
      if (window.innerWidth > 768) {
        // console.log(
        //   `succeed in changing font-size of question text for:\n\n \"${question}\"\n\ntype [1A]`
        // );
        return `font-size: 1.5rem; line-height: 2rem;`;
      } else {
        // console.log(
        //   `succeed in changing font-size of question text for:\n\n \"${question}\"\n\ntype [1B]`
        // );
        return `font-size: 1.125rem; line-height: 1.75rem;`;
      }
    } else if (question.length > 130 && question.length < 160) {
      if (window.innerWidth > 768) {
        // console.log(
        //   `succeed in changing font-size of question text for:\n\n \"${question}\"\n\ntype [2A]`
        // );
        return `font-size: 1.125rem; line-height: 1.75rem;`;
      } else {
        // console.log(
        //   `succeed in changing font-size of question text for:\n\n \"${question}\"\n\ntype [2B]`
        // );
        return `font-size: 1rem; line-height: 1.5rem;`;
      }
    }
  },
  questionList: [],
  multipleOrBool: 0, //multiple = 0 , bool = 1
  currentQuestion: 0,
};
questions.fetchQuestion();

// timerBar function
let time = 15;
const timerBars = document.querySelectorAll('.timer-bar');

function changeTimerBarStyle() {
  timerBars.forEach((timerBar) => {
    timerBar.setAttribute('style', `width:${(time * 10) / 1.5}%`);
    if (time <= 10) {
      timerBar.classList.replace('bg-green-400', 'bg-orange-400');
    }
    if (time <= 5) {
      timerBar.classList.replace('bg-orange-400', 'bg-red-500');
    }
    if (time <= 0.1) {
      timerBar.classList.replace('bg-red-500', 'bg-transparent');
    }
  });
}

function resetTimeAndBar() {
  time = 15;
  //change bar style
  timerBars.forEach((timerBar) => {
    turnBarToGreen(timerBar);
    timerBar.classList.remove('duration-1000');
    timerBar.setAttribute('style', `width:100%`);
  });
  // re-add transition
  setTimeout(() => {
    timerBars.forEach((timerBar) => {
      timerBar.classList.add('duration-1000');
    });
  }, 50);

  // restart timer
  // setTimeout(() => {
  //   let x = Math.random() * 100;
  //   const timer = setInterval(() => {
  //     console.log('a', x);
  //     time -= 0.1;
  //     if (time <= 0.1) {
  //       clearInterval(timer);
  //     }
  //   }, 100);
  // }, 1000);
}

function runTimerBar() {
  setTimeout(() => {
    const timer = setInterval(() => {
      time -= 0.1;
      if (time <= 0.1) {
        clearInterval(timer);
      }
    }, 100);
    const changeBar = setInterval(() => {
      changeTimerBarStyle();
      if (time <= 0.1) {
        clearInterval(changeBar);
      }
    }, 100);
  }, 1000);
}

function turnBarToGreen(timerBar) {
  if (timerBar.classList.contains('bg-green-400')) {
    return;
  } else if (timerBar.classList.contains('bg-orange-400')) {
    timerBar.classList.replace('bg-orange-400', 'bg-green-400');
  } else if (timerBar.classList.contains('bg-red-500')) {
    timerBar.classList.replace('bg-red-500', 'bg-green-400');
  }
}

// resize the questions font size
window.addEventListener('resize', () => {
  document.querySelectorAll('.question').forEach((question) => {
    question.setAttribute(
      'style',
      questions.checkHowLongQuestion(question.innerText)
    );
  });
});

// everytime an answer is clicked
document.querySelectorAll('.answer-opt').forEach((option) => {
  option.addEventListener('click', () => {
    // add the index
    if (questions.currentQuestion < 10) {
      questions.currentQuestion++;
    }

    // check the index and refresh the question
    if (questions.currentQuestion !== questions.questionList.length) {
      // add animation to the question card
      setTimeout(() => {
        questionCards[questions.multipleOrBool].classList.add('anim-swipe-x');
      }, 100);

      // to refresh the question
      setTimeout(() => {
        questions.assignQuestionPropertyToCard(
          questions.questionList,
          questions.currentQuestion
        );
      }, 700);

      // to remove animation and to reset timer bar
      setTimeout(() => {
        // remove the animation from the question card
        questionCards[questions.multipleOrBool].classList.remove(
          'anim-swipe-x'
        );
        // reset the timer bar
        resetTimeAndBar();
      }, 1499);
    }
    // check the index and call the result screen
    else {
      resultScreen();
    }
  });
});

// point system

// result screen
const progressBar = document.querySelector('.circular-progress'),
  valueContainer = document.querySelector('.value-container');
function resultScreen() {
  document.querySelector('.result-screen').classList.remove('hidden');
  document.querySelector('.result-screen').classList.add('anim-lighten-full');
  document.querySelector('.result-screen>div').classList.add('anim-pop-up');
  setTimeout(() => {
    let totalCorrectAns = 0,
      totalQuestion = questions.questionList.length,
      speed = 60;

    let progress = setInterval(() => {
      totalCorrectAns++;
      valueContainer.textContent = `${totalCorrectAns}/${totalQuestion}`;
      progressBar.style.background = `conic-gradient(
      rgb(253 186 116) ${totalCorrectAns * 10 * 3.6}deg,
      rgb(253 224 71) ${totalCorrectAns * 10 * 3.6}deg
    )`;
      if (totalCorrectAns == totalQuestion) {
        clearInterval(progress);
      }
    }, speed);
  }, 300);
}

// loading screen
if (document.readyState === 'loading') {
  function removeLoadingScreen() {
    document.querySelector('.loading-screen').classList.add('hidden');
  }

  document.addEventListener('DOMContentLoaded', () => {
    removeLoadingScreen();
    runTimerBar();
  });
} else {
  removeLoadingScreen();
  runTimerBar();
}
