import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';

//https://guide.meteor.com/accounts.html#useraccounts-flexibility

if (Meteor.isServer) {
  Meteor.startup(function() {
    const users = [
      {
        username: 'admin',
        email: 'admin@admin.com',
        password: 'password',
        /*profile: {
          name: { first: 'Teresa', last: 'Sakurada' },
        },*/
        roles: ['admin'],
      },
      {
        username: 'honowai',
        email: 'librarian@honowai.edu',
        password: 'honowai',
        roles: ['public-schools'],
      },
      {
        username: 'punahou',
        email: 'librarian@punahou.edu',
        password: 'punahou',
        roles: ['private-schools'],
      },
      {
        username: 'wheeler',
        email: 'librarian@wheeler.edu',
        password: 'wheeler',
        roles: ['military'],
      },
      {
        username: 'hiStateLib',
        email: 'librarian@histatelibrary.com',
        password: 'library',
        roles: ['state-library'],
      }
    ];

    users.forEach(({username, email, password, roles}) => {
      const userExists = Meteor.users.findOne({ 'emails.address': email });

      if (!userExists) {
        const userId = Accounts.createUser({username, email, password});
        Roles.addUsersToRoles(userId, roles);
      }
    });

  });
}
