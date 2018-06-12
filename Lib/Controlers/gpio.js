const Config = require('../../Config'),
  GpioModels = require('../Models/gpio');

module.exports = {

  http: {

    readValue: async (request, h) => {
      const number = Number(request.params.number);
      const result = await GpioModels.getValue(number)
        .catch((err) => {
          console.error(err);
          h.response('error');
        });
      h.response(result);
    },

    readAllValues: async (request, h) => {
      const result = await GpioModels.getAllValue()
        .catch((err) => {
          console.error(err);
          h.response('error');
        });
      h.response(result);
    },

    writeValue: async (request, h) => {
      const value = Number(request.payload.value),
        number = Number(request.params.number);
      const result = await GpioModels.setValue(number, value)
        .catch((err) => {
          console.error(err);
          h.response('error');
        });
      h.response(result);
    }
  },

  socket: {

    readAllValues: (socket) => {
      return async () => {
        const result = await GpioModels.getAllValue()
        socket.emit('gpioUpdate', gpios);
      }
    },

    writeValue: async (number, value) => {
      number = Number(number);
      value = Number(value);
      return await Models.gpio.setValue(number, value)
        .catch((err) => {
          console.error(err);
          throw err;
        });
    }
  }
}
