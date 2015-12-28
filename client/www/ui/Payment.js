
var dialogs = require('ui/dialogs');
var gift = require('app/gift');
var Stripe = require('app/Stripe');

var Payment = function(bind,args) {
  var self = this;

  this.status = ko.observable('enabled');

  this.gift = gift;
  this.amount = ko.observable(this.gift.getAmount());

  this.card = {
    name: ko.observable(),
    number: ko.observable(),
    month: ko.observable(),
    year: ko.observable(),
    cvc: ko.observable(),
  }

  this.monthOptions = ['01','02','03','04','05','06',
    '07','08','09','10','11','12'];

  // If we're adding a new card this is set to true
  this.paymentURI = 'submit';

  bind(this);

  setTimeout(function() {
    $('.modal-footer').prepend('<img style="float: left; width:100px" src="images/big@2x.png">');
  },200);

}

Payment.prototype.submit = function(done,abort) {
  var self = this;

  // stripePublishableKey should be exported by get/buy from the server
  // environment vars. If it is undefined here, it means that get/buy isn't
  // doing its job for some reason
  Stripe.setPublishableKey(stripePublishableKey);

  if (!this.card.name() || !this.card.number() || !this.card.cvc()) {
    fs.alert('All fields are required!');
    setTimeout(abort,0);
    return;
  }

  Stripe.card.createToken({
    number: this.card.number(),
    cvc: this.card.cvc(),
    exp_month: this.card.month(),
    exp_year: this.card.year(),
  }, function(status, response) {

    if(status == 200) {
      console.log("success");
      // post to server for actual processing
      var tok = response['id'];
      var packid = 1;

      // This is how you send a request from a returning buyer who saved her information
      fs.post(self.paymentURI,{
        ccToken: tok,
        gift: gift.getGift(),
      },function(res) {
        self.status('success');
        if (done) done();
      },function(res) {
        fs.alert(res.error.msg);
        if (abort) abort();
      });

    } else {
      fs.alert(response.error.message);
      abort();
      console.log("error: ",response);
      //highlight box or do something for the user here
    }
  });
}

module.exports = dialogs(Payment,{
  is: 'prompt',
  title: 'Step 3 of 3: Payment Method',
  buttonLabel: 'Give Gift!',
  ajax: true,
})

