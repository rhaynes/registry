

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
  // Set handler for internal server errors (HTTP 500)
  fs.onInternalServerError(function(code,res) {
    if (res) fs.alert(res.error.msg,'Internal Server Error','danger')
    else fs.alert(code+' Server error: Please report this as a bug to support@osmosis.org','Error','danger');
  });

  fs.onRequestError(function(code,res) {
    fs.alert(res.error.msg,'Oops!','warning');
  });

  fs.onConnectionError(function(handler) {
    fs.alert('No internet!','Bad connection','warning');
  });

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
  var groups = _.groupBy(items,function(item) { return item.category });

  for (var k in groups) {
    fs.mixAppend($('.item-groups'),'ui/ItemGroup',{
      name: k,
      items: groups[k],
    })
  }
}

