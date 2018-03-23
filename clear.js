const axios = require('axios');
const getToken = require('./login');

const env = process.env.NODE_ENV || 'dev';
const namespace = process.env.NAMESPACE || 'kmsdev5';
const BASE_URL = `https://api.bodhi-${env}.io/${namespace}/resources`;

const documents = [
  'ProductionSuggestedThawQuantityJobLog',
  'ProductionSuggestedThawItemQuantity'
];

const clear = ({ resourceName, method = 'DELETE', token }) => axios({
  url: `${BASE_URL}/${resourceName}`,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `ID_TOKEN=${token}`
  }
});

const clearAll = token => documents.map(doc => {
  return clear({
    resourceName: doc,
    token
  });
});

getToken({
  env,
  username: `admin__${namespace}`,
  password: `admin__${namespace}`
}).then((token) => {
  Promise.all(
    clearAll(token)
  ).then(resp => {
    console.log('CLEAR DONE!!!!!!!!!!!!!!!!!!');
  }).catch(err => {
    console.log('err: ', err);
  });
}).catch(loginError => {
  console.log('loginError: ', loginError);
});
