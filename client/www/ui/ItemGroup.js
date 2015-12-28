
function ItemGroup(bind,args) {

  this.title = args.name;

  bind(this);

  for (var k in args.items) {
    fs.mixAppend($('.items',this.dom),'ui/Item',{
      item: args.items[k],
    })
  }
}

module.exports = ItemGroup;

