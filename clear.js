const axios = require('axios');
const getToken = require('./login');

const env = process.env.NODE_ENV || 'qa';
const namespace = process.env.NAMESPACE || 'kms_qa5';
const BASE_URL = `https://api.bodhi-${env}.io/${namespace}/resources`;

const documents = [
  'ProductionSuggestedThawQuantityJobLog',
  'ProductionSuggestedThawItemQuantity',
  'InventoryItem',
  'ProductionSchedule',
  'ProductionItemThawSetup',
  'InventoryOnHand'
];

const storeKey = 'store_test_07';

const clear = ({ resourceName, method = 'DELETE', token, storeKey }) => axios({
  url: `${BASE_URL}/${resourceName}?where`,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `ID_TOKEN=${token}`
  }
});

const clearAll = (token) => documents.map(doc => {
  const storeKeyCondition = encodeURI(`where = { store_key: {$eq: '${storeKey}'}}`);
  return clear({
    resourceName: `${doc}?${storeKeyCondition}`,
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
