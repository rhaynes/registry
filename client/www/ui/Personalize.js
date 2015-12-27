
var dialogs = require('ui/dialogs');
var gift = require('app/gift');

function Personalize() {
  this.gift = gift;
}

module.exports = dialogs(Personalize,{
  is: 'prompt',
  title: 'Step 2 of 3: Personalize',
  buttonLabel: 'Next',
  ajax: true,
})

