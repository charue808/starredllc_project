Template.header.events({
  'click a[data-action=logout]': function(e) {
    e.preventDefault();
    AccountsTemplates.logout();
  }
});
