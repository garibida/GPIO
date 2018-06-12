'use strict'

const Hapi = require('hapi'),
  Inert = require('inert'),
  Vision = require('vision'),
  Handlebars = require('handlebars'),
  Config = require('./Config');

//const StaticRoutes = require('./Plugins/staticRoutes'),
//  ViewRoutes = require('./Plugins/viewsRoutes'),
//  GpioRoutes = require('./Plugins/gpioRoutes'),
//  GpioSocket = require('./Plugins/gpioSocket');

const Routes = require('./Lib/routes'),
  Socket = require('./Lib/socket');

// Init Server
const server = Hapi.Server(Config.Server);

//// Home Route
//server.route({
//  method: 'GET',
//  path: '/',
//  handler: (request, h) => {
//    return h.redirect('/raspi');
//  }
//});

const init = async () => {
  //  await server.register([StaticRoutes, GpioRoutes, ViewRoutes, GpioSocket]);
  await server.register([Inert, Vision, Socket]);

  server.views({
    engines: {
      html: Handlebars
    },
    path: Config.ViewsPath,
    helpersPath: 'helpers'
  });

  server.route(Routes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();
