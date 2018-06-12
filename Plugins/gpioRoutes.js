const Raspi = require('../raspi');
//
//
//module.exports = async (server) => {
//  server.route({
//    method: 'GET',
//    path: '/GPIO/{number}',
//    handler: (request, h) => {
//      const number = Number(request.params.number);
//      return raspi.getValue(number)
//        .catch((err) => {
//          console.error(err);
//          return 'error';
//        });
//    }
//  });
//
//  server.route({
//    method: 'POST',
//    path: '/GPIO/{number}',
//    handler: async (request, h) => {
//      const value = Number(request.payload.value),
//        number = Number(request.params.number);
//      return await raspi.setValue(number, value)
//        .catch((err) => {
//          console.error(err);
//          return 'error';
//        });
//    }
//  });
//};

module.exports = {
  name: 'gpioRoutes',
  version: '1.0.0',
  register: async function (server) {

    server.route({
      method: 'GET',
      path: '/gpio/{number}',
      handler: (request, h) => {
        const number = Number(request.params.number);
        return Raspi.getValue(number)
          .catch((err) => {
            console.error(err);
            return 'error';
          });
      }
    });

    server.route({
      method: 'POST',
      path: '/gpio/{number}',
      handler: async (request, h) => {
        const value = Number(request.payload.value),
          number = Number(request.params.number);
        return await Raspi.setValue(number, value)
          .catch((err) => {
            console.error(err);
            return 'error';
          });
      }
    });
  }
};
