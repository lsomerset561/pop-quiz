// Questions
var questions = [
	'What is the capital of Florida?',
	'What popular TV show stars Kerry Washington on Thursday nights?',
	'Who is the main character in the Japanese anime Dragonball?',
	'Which of these is NOT a company that makes fitness trackers?'
];
var possibleAnswers = [
	['Tallahassee', 'Georgia', 'Salt Lake City', 'Miami'],
	['The Bachelor', 'Scandal', 'Friends', 'American Idol' ],
	['Goku', 'Frieza', 'Vegeta', 'Gohan'],
	['Microsoft', 'Jawbone', 'Fitbit', 'Gateway']
];
var correctAnswers = [ 0, 1, 0, 3 ];

// Question Areas
var beginInput = '<label class="col-xs-6"> <input type="radio" name="answer" value="';
var middleInput = '" />';
var endInput = '</label>';
var $questionDisplay = $('#questionDisplay');
var $possibleAnswerArea = $('#possibleAnswersArea');
var $finalButton = $('#finalAnswer');

// User Information
var $userName = $("#userName");
var currentScore = 0;
var points = 25;
var passScore = 75;
var $userChoice;
var $userScore = $('#userScore');
var $messageArea = $('#messageArea');
var globalIndex = 0;

//keeps score updated
function setScore() {
  $userScore.text(currentScore);
}

function setPossibleAnswerButtons() {
  var inputs = "";  
  for (var i = 0; i < correctAnswers.length; i++) {
    input = beginInput + i + middleInput + possibleAnswers[globalIndex][i] + endInput;
    inputs += input;
  }
  $($possibleAnswerArea).html(inputs);
  return;
}

function getScoreMessage() {
  scoreMessage = "<br /><p>You need " + passScore + " to pass.  Your total score is " + currentScore + ".  </p><p>";
  switch (currentScore) {
    case 25:
      scoreMessage += "Better luck next time...</p>";
      break;
    case 50:
      scoreMessage += "Ooh, so close!</p>";
      break;
    case 75:
      scoreMessage += "Good job!</p>";
      break;
    case 100:
      scoreMessage += "Wow, you nailed it!!!</p>";
      break;
    default:
      scoreMessage += "Did you even try?</p>";
  }
  
  return scoreMessage;
}

function addPoints() {
  $userChoice = parseInt($userChoice);
  if ($userChoice === correctAnswers[globalIndex]) {
    currentScore += points;
  }
  setScore();
}

//more questions or are we done?
function nextQuestionAnswerSet() {
  //if there are still more questions in the array
  if (globalIndex < questions.length-1) {
    //move to next matching question & answer set
    globalIndex++;
    $questionDisplay.text(questions[globalIndex]);
    setPossibleAnswerButtons();
  } else {
    //we're at the end of all the questions
    alert("All out of questions!");
    $messageArea.html(getScoreMessage());
  }
}

function setUserChoice() {
  return $userChoice = $("input[type=radio]:checked").val();
}

function checkAnswer() {
  setUserChoice();
  //If no button selected
  if ($userChoice === undefined) {
    $messageArea.html("<p><h3>Please choose an answer.</p></h3>");
  } else {
    //clear message area
    $messageArea.text("");
    addPoints();
    nextQuestionAnswerSet();
  }
}

//obtain name from user
function setUsername() {
  $userName.text(prompt("What is your name?"));
  setScore();
}

//preload questions, answers
$questionDisplay.text(questions[globalIndex]);
setPossibleAnswerButtons();
setUsername();