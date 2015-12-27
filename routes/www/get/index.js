
var db = require('registry/db');

exports.main = function($P) {
  $P.exports.itemData = db.items.getData();
  $P.exports.stripePublishableKey = Const.stripePublicKey;
  $P.render();
}

