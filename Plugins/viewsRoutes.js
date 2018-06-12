const Vision = require('vision'),
  Handlebars = require('handlebars'),
  Config = require('../Config');
//
//module.exports = async (server) => {
//  await server.register(Vision);
//  server.views({
//    engines: {
//      html: Handlebars
//    },
//    path: Config.ViewsPath,
//    helpersPath: 'helpers'
//  });
//
//  server.route({
//    method: 'GET',
//    path: '/raspi',
//    handler: {
//      view: {
//        template: 'index',
//        context: Config.GPIO
//      }
//    }
//  });
//};

module.exports = {
  name: 'viewsRoutes',
  version: '1.0.0',
  register: async function (server) {
    await server.register(Vision);
    server.views({
      engines: {
        html: Handlebars
      },
      path: Config.ViewsPath,
      helpersPath: 'helpers'
    });

    server.route({
      method: 'GET',
      path: '/raspi',
      handler: {
        view: {
          template: 'index',
          context: Config.GPIO
        }
      }
    });
  }
};
