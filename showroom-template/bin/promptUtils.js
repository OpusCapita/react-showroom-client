'use strict';

let rl = require('readline-sync');

function askQuestion(question) {
  /* Question - 'Object' like {
    type: 'projectName',
    prompt: 'Please enter project name: ',
    validation: answer => answer,
    validationMessage: 'Project name should be not empty.'
  } */

  let answer = rl.question(question.prompt);
  if(question.validation(answer)) {
    return Object.assign({}, question, { answerValue: answer });
  }
  console.log(question.validationMessage);
  return askQuestion(question);
}

function askQuestions(questions) {
  return questions.map(question => askQuestion(question));
}

module.exports = {
  askQuestion: askQuestion,
  askQuestions: askQuestions
};
