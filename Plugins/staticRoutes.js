const Inert = require('inert');

//module.exports = async (server) => {
//  await server.register(Inert);
//
//  server.route({
//    method: 'GET',
//    path: '/Public/{fileName}',
//    handler: (request, h) => {
//      return h.file(request.params.fileName);
//    }
//  });
//};

module.exports = {
  name: 'staticRoutes',
  version: '1.0.0',
  register: async function (server) {
    await server.register(Inert);

    server.route({
      method: 'GET',
      path: '/public/{fileName}',
      handler: (request, h) => {
        return h.file(request.params.fileName);
      }
    });
  }
};
