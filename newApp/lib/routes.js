FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('layout', { content: 'homePage'})
  }
});

FlowRouter.route('/account/update', {
  name: 'update-account',
  action() {
    BlazeLayout.render('layout', { content: 'updateAccount'})
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

FlowRouter.route('/upload', {
  name: 'upload',
  action() {
    BlazeLayout.render('layout', { content: 'uploadAdmin'})
  }
});

//AccountsTemplate Routes
AccountsTemplates.configure({
  defaultLayout: 'layout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'content',
  showForgotPasswordLink: true,
  overrideLoginErrors: true,
  enablePasswordChange: true,
  //sendVerifcationEmail: true,
  //enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,
  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,
  //Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});

AccountsTemplates.addFields([
  {
    _id: 'organization',
    type: 'text',
    displayName: "Organization Name"
  }
]);


AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('enrollAccount');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
