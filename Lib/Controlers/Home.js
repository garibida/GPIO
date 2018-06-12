const Config = require('../../Config');

module.exports = {

  home: (request, h) => {
    return h.redirect(Config.Server.homePage);
  },

  main: {
    view: {
      template: 'index',
      context: Config.GPIO
    }
  }
};
