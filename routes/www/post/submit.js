
var stripe = require('registry/stripe');
var db = require('registry/db');
var paymentManager = require('registry/paymentManager');

exports.expects = {
  ccToken: {type: 'string', required: false}, //one-time-use token for security
  gift: {
    type:'object',
    properties: {
      itemID: {type:'integer', required:true},
      from: {type:'string', required:true},
      email: {type:'string', required:true},
      amount: {type:'integer', required:true},
      message: {type: 'string'},
    }
  },
}

exports.main = function($P) {
  // Make sure we are using a valid api key
  // This isn't really that useful, delete for the next store
  if (stripe.apiKey != Const.stripePrivateKey) {
    $P.error(new Error('Charges could not be made by the server at this time. If this happens again, please let the registry owner know.'));
  }

  // Record the beginning of a purchase
  $P.args.gift.message = $P.args.gift.message || '';
  var contribID = db.contributions.begin($P.args.gift);

  // Sanity check
  if ($P.args.gift.amount > 200000)
    $P.error(new Error('Charge could not be made at this time. If this happens again, please let the registry owner know.'));

  // Execute necessary logic to charge the credit card
  paymentManager.charge($P,$P.args.gift.amount*100,function() {

    db.items.update($P.args.gift.itemID,$P.args.gift.amount);

    db.contributions.finalize(contribID);

  });

  $P.json({});
}

