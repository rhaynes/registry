
var gift = require('app/gift');

function Item(bind,args) {
  var self = this;

  this.itemID = args.item.itemID;
  this.category = args.item.category;
  this.title = ko.observable(args.item.title);
  this.price = ko.observable(args.item.price);
  this.contributed = ko.observable(args.item.contributed);
  this.src = ko.observable('https://sarahandryanallonsy.s3.amazonaws.com/'+args.item.img);
  this.remaining = ko.computed(function() {
    var remaining = self.price()-self.contributed();
    return remaining > 0 ? remaining : 0;
  });
  this.funded = ko.computed(function() {
    return Math.round(self.contributed()/self.price()*100)+'%';
  });

  this.suggested = ko.computed(function() {
    if (self.remaining() <= 50)
      return self.remaining()
    else return 50;
  });
}

Item.prototype.selectAll = function() {
  gift.setItem(this);
  this.contribute();
}

Item.prototype.contribute = function() {
  var self = this;
  dialog('ui/Gift',function(vm,res,done,abort) {
    if (res) {
      if (!gift.from()) {
        fs.alert('Please enter a name in the From field');
        setTimeout(abort,0);
        return;
      }

      if (!gift.email()) {
        fs.alert('Please enter your email');
        setTimeout(abort,0);
        return;
      }

      var amount = gift.getAmount();
      if (!amount) {
        fs.alert('Please choose a gift amount');
        setTimeout(abort,0);
        return;
      }

      if (!/^\d+$/.test(amount)) {
        fs.alert('Please use whole numbers only');
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
                done();
                fs.alert('Thank you for the gift!!! Looking forward to seeing you at the wedding! <br><br>Best,<br><br>Sarah and Ryan','Gift Received','info',function() {
                  setTimeout(function() {
                    self.contributed(+self.contributed()+gift.getAmount());
                  },500);
                });
              },abort);
            }
          });
        }
      });
    }
  });
}

Item.prototype.selectContrib = function(value) {
  var self = this;
  return function() {
    gift.setItem(self,value)
    self.contribute();
  }
}

module.exports = Item;

