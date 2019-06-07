import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Let's fetch some data from an API!!</h1>
<div id="question"></div>
`;

//////////// code sample 1 /////////////

// In this section we'll grab data from the open-trivia API
//Though not necessary, let's put out endpoint in a variable

// To see what the API looks like click 👇🏾

/*fetch(endpoint) // call the fetch function
  // then unwrap the pending promise and parse the result as json
  .then(response => response.json())
  // the json returned from the previous line is wrapped in a promise, so we call .then()
  .then(data => console.log(data));*/

// Note: As seen above, handling an error is best practice, but not required.

// As we can see, what's returned is an object, and the data we care about
//   is in a key called "results". In a real-world application we could .map()
//   over this data and render content each trivia item based on what the API returned

///////////// code sample 2 //////////////

/*fetch(endpoint)
  .then(response => response.json())
  .catch(e => {
    // 👆🏾 All Promises have a .catch() method on them
    console.error(e.message);
  })
  .then(data => console.log(data))
  .catch(e => {
    // 👆🏾 All Promises have a .catch() method on them
    console.error(e.message);
  });*/

// Add the same .catch to the first fetch function
// Then change the endpoint by deleting the "t" in "opentdb"
// Notice how an error gets thrown, but the UI is unaffected!

// 🎉Congrats, you've gracefully handled your network error🎉

///////////// 🚨🚨🚨 CHALLENGE 🚨🚨🚨 ///////////////

// Logging out content to the UI is a great first step, but gets boring.

// 1. Delete one of the fetch calls.
// 2. When a call is successful, display the first trivia question in the DOM
// 3. When a call is unsuccessful, display an error message.
// 4. Test both scenarios to make sure it's working correctly
// 5. Feeling adventureous? Use your knowledge to build something great!

// Feel free to Fork this sandbox in the top left and share your project!
/*const endpoint = "https://opentdb.com/api.php?amount=5";
fetch(endpoint)
  .then(response => response.json())
  .then(triviaResp => {
    const questionAnswer = triviaResp.results.map(currVal => {
      return "<h4>" + currVal.question + "</h4>" + currVal.correct_answer;
    });
    document.getElementById("question").innerHTML = questionAnswer;
  })
  .catch(e2 => {
    console.log("error-2 =" + e2.message);
    document.getElementById("question").innerHTML = e2.message;
  });*/

const shuffle = array => {
  array.sort(() => Math.random() - 0.2);
};

const endpointURL = "https://opentdb.com/api.php?amount=5";
const retrieveQuestions = endpoint => {
  return fetch(endpoint).then(response => response.json());
};

const handleError = err => {
  document.getElementById("question").innerHTML = err.message;
};

const paintQuestions = questions => {
  questions.results.map(question => {
    let answers = [...question.incorrect_answers, question.correct_answer];
    shuffle(answers);
    const h4 = document.createElement("h4");
    h4.innerText = question.question;
    document.getElementById("question").append(h4);
    for (var i = 0; i < answers.length; i++) {
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "choices" + question.correct_answer;
      if (question.correct_answer === answers[i]) {
        radio.value = "true";
      } else {
        radio.value = "false";
      }
      radio.id = "choice" + i;
      radio.onclick = function() {
        if (this.value === "true") alert("awesome!");
        else alert("better luck next time!");
      };
      var radioText = document.createElement("div");
      radioText.id = "c" + i;
      radioText.class = "choiceText";
      document.getElementById("question").appendChild(radio);
      radio.appendChild(radioText);

      const answerHtml = answers[i];
      document.getElementById("question").append(answerHtml);
    }
    return true;
  });
};

retrieveQuestions(endpointURL)
  .then(paintQuestions)
  .catch(handleError);
