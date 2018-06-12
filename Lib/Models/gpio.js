const Gpio = require('onoff').Gpio,
  Config = require('../../Config');

let gpios = [];

module.exports.getValue = async (number) => {
  let gpio = await getGpioByNumber(number)
    .catch((err) => {
      throw err;
    });
  return gpio.readSync();
};

module.exports.getAllValues = async () => {
  let values = [];
  gpios.forEach((gp) => {
    values.push({
      number: gp.gpio,
      value: gp.readSync()
    });
  });
  return values;
};

module.exports.setValue = async (number, value) => {
  let gpio = await getGpioByNumber(number)
    .catch((err) => {
      throw err;
    });
  gpio.writeSync(value);
  return gpio.readSync();
};

const getGpioByNumber = async (number) => {
  if (!gpioNumberValidation(number)) {
    throw new Error('The GPIO number is not valid');
  }

  const gpioArray = gpios.filter((item) => {
    return item.gpio === number;
  });

  if (gpioArray.length !== 1) {
    throw new Error('Failed to find GPIO in the config file');
  }

  return (gpioArray[0]);
};

const gpioNumberValidation = (number) => {
  return gpios.some((gp) => {
    return gp.gpio == number;
  });
};

const createGpios = () => {
  Config.GPIO.GPIOs.forEach((item) => {
    if (item.gpioNumber !== 0) {
      gpios.push(new Gpio(item.gpioNumber, 'out'));
    }
  });
};

createGpios();
