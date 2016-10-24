FlowRouter.route('/', {
  name: 'layout',
  action() {
    BlazeLayout.render('layout', { content: 'uploadAdmin'})
  }
});
