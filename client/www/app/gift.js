
function Gift() {
  this.from = ko.observable();
  this.email = ko.observable();
  this.selected = ko.observable();
  this.amount = ko.observable();
  this.message = ko.observable();
}

function stripUnits(amount) {
  if (amount[0] == '$')
    return amount.slice(1)
  else return amount;
}

Gift.prototype.getAmount = function() {
  if (this.selected() == 'custom') {
    return +stripUnits(this.amount());
  } else if (this.selected() == 'full') {
    return +this.item.remaining();
  } else return +this.selected();
}

Gift.prototype.setItem = function(item,amount) {
  this.item = item;
  if (!amount) {
    if (item.remaining() <= 100 && item.remaining() > 0)
      this.selected('full')
    else this.selected(100);
  } else this.selected(amount);
}

Gift.prototype.getGift = function() {
  return {
    itemID: this.item.itemID,
    from: this.from(),
    email: this.email(),
    amount: this.getAmount(),
    message: this.message(),
  }
}

module.exports = new Gift();

