const axios = require('axios');
const getToken = require('./login');

const env = process.env.NODE_ENV || 'qa';
const namespace = process.env.NAMESPACE || 'kms_qa5';
const BASE_URL = `https://api.bodhi-${env}.io/${namespace}/resources`;

const documents = [
  {
    resourceName: 'InventoryItem',
    data: require('./seed/item.json')
  },
  {
    resourceName: 'ProductionSchedule',
    data: require('./seed/schedule.json')
  },
  {
    resourceName: 'ProductionItemThawSetup',
    data: require('./seed/thawsetup.json')
  },
  {
    resourceName: 'InventoryOnHand',
    data: require('./seed/onhand.json')
  }
];

const post = ({ resourceName, method = 'POST', token, data }) => axios({
  url: `${BASE_URL}/${resourceName}`,
  method,
  headers: {
    'Content-Type': 'application/json',
    'Cookie': `ID_TOKEN=${token}`
  },
  data
});

const seedAll = token => documents.map(doc => {
  return post({
    resourceName: doc.resourceName,
    token,
    data: doc.data
  })
});

getToken({
  env,
  username: `admin__${namespace}`,
  password: `admin__${namespace}`
}).then((token) => {
  Promise.all(
    seedAll(token)
  ).then(resp => {
    console.log('========================');
    console.log('  SEED DONE !!!!!!!!!!!!');
  }).catch(err => {
    console.log('err: ', err);
  });
}).catch(loginError => {
  console.log('loginError: ', loginError);
});
