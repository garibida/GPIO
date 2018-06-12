let socket = io.connect('http://raspberrypi:8080');

socket.on('gpioUpdate', async (gpios) => {
  console.log('update');
  gpios.forEach((gp) => {
    document.getElementById(gp.number).checked = Boolean(gp.value);
  });
})

const checkboxChanged = (d) => {
  let value = 0;
  if (d.checked) {
    value = 1;
  }
  console.log('changing ' + d.id + ' to ' + value);
  socket.emit('writeGpio', d.id, value);
}
