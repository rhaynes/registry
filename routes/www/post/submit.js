
var stripe = require('registry/stripe');
var db = require('registry/db');
var paymentManager = require('registry/paymentManager');

exports.requires = function($P) {
  $P.require.login();
}

exports.expects = {
  ccToken: {type: 'string', required: false}, //one-time-use token for security
  saveInfo: {type: 'integer', required: false},
  name: {type: 'string', required:true},
  purchaseData: {
    type:'object',
    properties: {
      totalCharge: {type:'integer', required:true},
      items:{type: 'array', items: {type: 'integer'}, required:true},
    }
  },
  existingCardData: {type:'string', required: false},
}

function extractUsersName($P) {
  var name = $P.args.name.split(' ');
  if (name.length >= 2) {
    var first = name[0];
    var last = name[name.length-1];

    var user = db.users.getUser($P.userID);
    if ((user.preferredName == '') && (user.lastName == ''))
      db.users.updateName($P.userID,first,last);
  }
}

exports.main = function($P) {
  // Make sure we are using a valid api key
  // This isn't really that useful, delete for the next store
  if (stripe.apiKey != Const.stripePrivateKey) {
    $P.error(new Error('Charges could not be made by the server at this time. If this happens again, please let the registry owner know.'));
  }

  // Make sure the finalized cart agrees with the submitted price from the UI
  // If this doesn't match up, it's either a bug on our end or someone is trying
  // to hack the charges to make the purchase a lower price
  if (cart.totalCharge != $P.args.purchaseData.totalCharge) {
    $P.error(new Error('Charges could not be made by the server at this time. If this happens again, please let the registry owner know.'));
  }

  // Record the beginning of a purchase
  var chargeID = db.inventory_charges.begin($P.userID, cart.totalCharge);

  // Sanity check
  if (cart.totalCharge > 200000)
    $P.error(new Error('Charge could not be made at this time. If this happens again, please let the registry owner know.'));

  // Execute necessary logic to charge the credit card
  paymentManager.charge($P,cart.totalCharge,function() {

    // post charge actions go here

  });

  $P.json({});
}

