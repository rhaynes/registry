
var gift = require('app/gift');

function Item(bind,args) {
  var self = this;

  this.itemID = args.item.itemID;
  this.title = ko.observable(args.item.title);
  this.price = ko.observable(args.item.price);
  this.contributed = ko.observable(args.item.contributed);
  this.src = ko.observable(args.item.image);
  this.remaining = ko.computed(function() {
    var remaining = self.price()-self.contributed();
    return remaining > 0 ? remaining : 0;
  });
  this.funded = ko.computed(function() {
    return Math.round(self.contributed()/self.price())+'%';
  });
}

Item.prototype.contribute = function() {
  gift.setItem(this);
  dialog('ui/Gift',function(vm,res,done,abort) {
    if (res) {
      if (!gift.from()) {
        fs.alert('Please enter a name in the From field');
        setTimeout(abort,0);
        return;
      }

      if (!gift.getAmount()) {
        fs.alert('Please choose a gift amount');
        setTimeout(abort,0);
        return;
      }

      done();
      dialog('ui/Personalize',function(vm,res,done) {
        if (res) {
          done();
          dialog('ui/Payment',function(vm,res,done,abort) {
            if (res) {
              vm.submit(function() {
                fs.alert('Thank you for the gift!!! Looking forward to seeing you at the wedding! <br><br>Best,<br><br>Sarah and Ryan','Gift Received','info');
                done();
              },abort);
            }
          });
        }
      });
    }
  });
}

module.exports = Item;

