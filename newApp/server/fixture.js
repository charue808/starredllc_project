import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

if (Meteor.isServer) {
  Meteor.startup(function() {
    const users = [{
      username: 'admin',
      email: 'admin@admin.com',
      password: 'password',
      profile: {
        name: { first: 'Teresa', last: 'Sakurada' },
      },
      roles: ['admin'],
    }];

    users.forEach(({username, email, password, profile, roles}) => {
      const userExists = Meteor.users.findOne({ 'emails.address': email });

      if (!userExists) {
        const userId = Accounts.createUser({username, email, password, profile});
        Roles.addUsersToRoles(userId, roles);
      }
    });

  });
}
