
var dialogs = require('ui/dialogs');
var gift = require('app/gift');

function Gift(bind,args) {
  this.item = args.item;
  this.gift = gift;
}

module.exports = dialogs(Gift,{
  is: 'prompt',
  title: 'Step 1 of 3: Choose a Gift Amount',
  buttonLabel: 'Next',
  ajax: true,
})

