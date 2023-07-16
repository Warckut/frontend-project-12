const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  loginPagePath: () => '/login',
  signUpPagePath: () => 'signUp',
  signUpPath: () => [apiPath, 'signup'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};
