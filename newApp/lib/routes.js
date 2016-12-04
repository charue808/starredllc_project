FlowRouter.route('/', {
  name: 'layout',
  action() {
    BlazeLayout.render('layout', { content: 'uploadAdmin'})
  }
});


FlowRouter.route('/create-order', {
  name: 'create-order',
  action() {
    BlazeLayout.render('layout', { content: 'createOrder'})
  }
});


FlowRouter.route('/edit-order', {
  name: 'edit-order',
  action(params, queryParams) {
    BlazeLayout.render('layout', { content: 'editOrderContextSet'})
  }
});

FlowRouter.route('/view-orders', {
  name: 'view-orders',
  action() {
    BlazeLayout.render('layout', { content: 'viewOrders' })
  }
});
