FlowRouter.route('/', {
  name: 'layout',
  action() {
    BlazeLayout.render('layout', { content: 'uploadAdmin'})
  }
});


FlowRouter.route('/create-order', {
  name: 'layout',
  action() {
    BlazeLayout.render('layout', { content: 'createOrder'})
  }
});
