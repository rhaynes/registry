
exports.configurePage = function($P) {
  return {
    name: $P.name,
    live: Const.live,
    scripts:$P.scripts,
    styles: $P.styles,
    bundled: Const.bundled,
  }
}

