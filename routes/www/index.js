
module.exports = {
  // Default title that shows up on a page when none is specified
  defaultTitle: 'Allonsy',

  // Default template used for rendering pages
  defaultApp: 'common',

  // Handler for setting up and routing all HTTP requests
  request: 'request',

  // Roles defines permissions for various server requests
  require: 'Roles',
//  require: require('./config/Roles'),

  // Handler for broadcasting synchronization messages across
  // multiple client instances
//  sync: require('./config/sync'),
  sync: 'sync',

  // Directory that contains RESTful api definitions
//  apiDir: 'routes/rest',

  sharedModules: Const.framework.sharedModules,

  // Tab routes
  tabRoutes: {},

  // Custom routes
  customRouters: {get: {
    '/www/*': '/srcrouter',
    '/style/*': '/cssrouter',
  }},
}

