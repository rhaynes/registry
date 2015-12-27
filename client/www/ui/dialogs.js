
// Dialog types
//   BootstrapDialog.TYPE_DEFAULT
//   BootstrapDialog.TYPE_INFO
//   BootstrapDialog.TYPE_PRIMARY
//   BootstrapDialog.TYPE_SUCCESS
//   BootstrapDialog.TYPE_WARNING
//   BootstrapDialog.TYPE_DANGER

module.exports = function(vmClass,options) {
  vmClass.prototype.options = function() {
    // First make a copy of the options object
    var newOptions = {};
    for (var k in options)
      newOptions[k] = options[k];

    var actionButton = {
      label: options.buttonLabel || 'OK',
      cssClass: 'btn-primary',
    };

    if (options.ajax) {
      actionButton.autospin = true;
      actionButton.action = function(dialog) {
        dialog.enableButtons(false);
        dialog.setClosable(false);
        newOptions.action(function() {
          dialog.exitCode = 1;
          dialog.close();
        },function() {
          dialog.enableButtons(true);
          dialog.setClosable(true);
          $('.icon-spin',dialog.$modalFooter).remove();
        });
      }
    } else {
      actionButton.action = function(dialog) {
        newOptions.action(function() {
          dialog.exitCode = 1;
          dialog.close();
        });
      }
    }

    if (options.is == 'prompt')
      actionButton.hotkey = 13;

    var cancelButton = {
      label: options.cancelLabel || 'Cancel',
      action: function(dialog) {
        newOptions.cancel();
        dialog.exitCode = -1;
        dialog.close();
      }
    };

    if (options.is == 'prompt' || options.is == 'confirm') {
      newOptions.buttons = [cancelButton,actionButton];
    } else if (options.is == 'popup') {
      newOptions.buttons = [cancelButton];
    } else newOptions.buttons = [actionButton];

    return newOptions;
  }

  return vmClass;
}

