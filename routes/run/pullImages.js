
var Shell = require('fusion/Shell');
var path = require('path');
var sql = require('fusion/sql');
var db = require('registry/db');

exports.main = function() {
  var shell = new Shell();
  shell.cd(root+'public/images');
  var img = 'http://www.compassbonaire.com/wp-content/uploads/2012/03/snorkel-and-sail-trip-bonaire.jpg';
  var items = sql.query('SELECT * FROM items');
  for (var k in items) {
    db.items.addImageURL(items[k].itemID,path.basename(items[k].image));

/*    try {
      shell.run('curl ? > ?',[items[k].image,path.basename(items[k].image)]);
    } catch(e) {
    }*/
  }
}

