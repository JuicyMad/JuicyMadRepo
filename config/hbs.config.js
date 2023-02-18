const hbs = require('hbs');
const path = require('path');

hbs.registerPartials(path.join(__dirname, '../views/partials'));

hbs.registerHelper('isAdmin', function (options) {
  const { currentUser } = options.hash;

  if (currentUser.role === "Admin") {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
})