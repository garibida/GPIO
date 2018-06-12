const HomeControler = require('./Controlers/Home');
const GpioControler = require('./Controlers/gpio');

module.exports = [
// Home Route
  {
    method: 'GET',
    path: '/',
    handler: HomeControler.home
  },
// Main Route  
  {
    method: 'GET',
    path: '/raspi',
    handler: HomeControler.main
  },
// GPIO Routes  
  {
    method: 'GET',
    path: '/gpio',
    handler: GpioControler.http.readAllValues
  },
  {
    method: 'GET',
    path: '/gpio/{number}',
    handler: GpioControler.http.readValue
  },
  {
    method: 'POST',
    path: '/gpio/{number}',
    handler: GpioControler.http.writeValue
  },
// Static Files
  {
    method: 'GET',
    path: '/{fileName}',
    handler: (request, h) => {
      return h.file(request.params.fileName);
    }
}];
