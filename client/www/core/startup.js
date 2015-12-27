

function allonsy() {
  $('.get-item').click(function(e) {
    e.preventDefault();
    alert('this will select the item');
  });

  $('.easter-egg').click(function(e) {
    if ($('.easter-egg-img').hasClass('hidden'))
      $('.easter-egg-img').removeClass('hidden')
    else $('.easter-egg-img').addClass('hidden');
  });
}

exports.alwaysRun = function() {
  // Inject everything exported by common into the global scope
  var common = require('core/common');
  for (var k in common)
    window[k] = common[k];

  fs.onAlert(function(msg,title,level,cb) {
    var options = {message:msg};
    if (title) options.title = title
    else options.title = 'Oops!';
    if (level) options.type = 'type-'+level
    else options.type = 'type-warning';
    options.callback = cb;
    BootstrapDialog.alert(options);
  });

  // Bind incoming data from the server
  bindData(window);

  // Easter egg
  allonsy();
}

exports.run = function() {
  var items = fs.transpose(itemData);
  for (var k in items) {
    fs.mixAppend($('.items'),'ui/Item',{
      item: items[k],
    })
  }
}

