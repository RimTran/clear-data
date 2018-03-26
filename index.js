const clearAll = require('./clear');
const seedAll = require('./seed');
const getToken = require('./login');


const env = process.env.NODE_ENV || 'qa';
const namespace = process.env.NAMESPACE || 'kms_qa5';
const BASE_URL = `https://api.bodhi-${env}.io/${namespace}/resources`;
const {token} = require('./token');

Promise.all(
  clearAll(token)
)
  .then(() => {
    console.log('CLEAR DONE!!!!!!!!!!!!!!!!!!');
  }).then(() => {
  Promise.all(seedAll(token))
    .then(() => {
      console.log('SEED DONE!!!!!!!!!!!!!!!!!!');
    })
    .catch((err) => {
      console.log('Seed Error: ', err);
    })
})
  .catch(err => {
    console.log('err: ', err);
  });


