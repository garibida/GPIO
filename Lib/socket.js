const GpioControler = require('./Controlers/gpio'),
  Hapio = require('hapio');

module.exports = {
  name: 'gpioSocket',
  version: '1.0.0',
  register: async function (server) {

    await server.register(Hapio);
    const io = server.plugins.hapio.io;

    io.on('connection', async (socket) => {
      console.log(`${socket.id} connected !`);

      socket.on('writeGpio', GpioControler.socket.writeValue);
      
      // Send all GPIO status to all clients
      const updateGpioValues = setInterval(GpioControler.socket.writeValue(socket), 2000);
    });
  }
};
