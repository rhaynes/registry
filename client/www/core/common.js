
exports.dialog = function(path,cb,args) {
  var options = require(path).prototype.options();
  args = args || {};

  // Overwrite default options if title and level are provided
  if (args.title) options.title = args.title;
  if (args.type) options.type = args.type;
  if (args.buttonLabels) {
    for (var k in args.buttonLabels)
      options.buttons[k].label = args.buttonLabels[k];
  }

  var vm = null;
  options.onshow = function(dialogDom) {
    vm = fs.mixAppend(dialogDom.$modalBody,path,args);
    vm.__dialog = dialogDom;
    dialogDom.__vm = vm;
    if (vm.show) vm.show(dialogDom);
  }
  options.cancel = function() {
    function doCancel() {
      if (cb) cb(vm,false,function() {});
    }
    if (vm.cancel) {
      vm.cancel(function() {
        doCancel();
      })
    } else doCancel();
  }
  options.action = function(next,abort) {
    function doAction(callNext) {
      if (callNext || !options.ajax) {
        next();
        if (cb) cb(vm,true,function() {});
      } else if (cb) cb(vm,true,next,abort);
    }

    if (vm.action)
      vm.action(function() {
        doAction(true);
      },function() {
        if (abort) abort();
      })
    else doAction(false);
  }

  // Make sure a cancel event gets fired
  options.onhide = function(dialog) {
    if (dialog.exitCode === null)
      options.cancel();
  }
  var dialog = BootstrapDialog.show(options);
  dialog.exitCode = null;
  return dialog;
}

