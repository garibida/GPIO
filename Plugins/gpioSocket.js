const Raspi = require('../raspi'),
  Hapio = require('hapio');

module.exports = {
  name: 'gpioSocket',
  version: '1.0.0',
  register: async function (server) {

    await server.register(Hapio);

    const io = server.plugins.hapio.io;

    io.on('connection', async (socket) => {
      console.log(`${socket.id} connected !`);

      socket.on('writeGpio', async (number, value) => {
        number = Number(number);
        value = Number(value);
        return await Raspi.setValue(number, value)
          .catch((err) => {
            console.error(err);
          });
      });

      const updateGpioValues = setInterval(async () => {
        const gpios = await Raspi.getAllValues();
        socket.emit('gpioUpdate', gpios);
      }, 2000);
    });
  }
};
