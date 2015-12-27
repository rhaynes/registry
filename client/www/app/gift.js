
function Gift() {
  this.from = ko.observable();
  this.email = ko.observable();
  this.selected = ko.observable();
  this.amount = ko.observable();
  this.message = ko.observable();
}

Gift.prototype.getAmount = function() {
  if (this.selected() == 'custom') {
    return this.amount();
  } else if (this.selected() == 'full') {
    return this.item.remaining();
  } else return this.selected();
}

Gift.prototype.setItem = function(item) {
  this.item = item;
  if (item.remaining() <= 100)
    this.selected('full')
  else this.selected(100);
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

