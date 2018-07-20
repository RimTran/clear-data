const environment = process.env._ENV.trim();
require('dotenv').config({
  path: `${process.cwd()}/env/${environment}.env`
});

const that = {
  namespace: process.env.NAMESPACE,
  baseUrl: process.env.BASE_URL,
  token: process.env.TOKEN,
  storeKey: process.env.STORE_KEY
};

require('./clear')
  .call(that)
  .then(() => {
    console.log('======== CLEAR DONE ========');

    require('./seed')
      .call(that)
      .then(() => {
        console.log('======== SEED DONE ========');
      })
      .catch((err) => {
        console.log('======== SEED ERROR =======');
        console.log('err : ', err);
      });

  })
  .catch((err) => {
    console.log('======== ERROR =======');
    console.log('err : ', err);
  });