import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

//https://guide.meteor.com/accounts.html#useraccounts-flexibility

if (Meteor.isServer) {
  Meteor.startup(function() {
    const users = [{
      username: 'admin',
      email: 'admin@admin.com',
      password: 'password',
      /*profile: {
        name: { first: 'Teresa', last: 'Sakurada' },
      },*/
      roles: ['admin'],
    }];

    users.forEach(({username, email, password, roles}) => {
      const userExists = Meteor.users.findOne({ 'emails.address': email });

      if (!userExists) {
        const userId = Accounts.createUser({username, email, password});
        Roles.addUsersToRoles(userId, roles);
      }
    });

  });
}
