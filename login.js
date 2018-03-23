/* eslint-disable import/no-extraneous-dependencies */
const request = require('request');
const colors = require('colors/safe');
const Q = require('q');

const getToken = ({ env, username, password }) => {
  const q = Q.defer();
  let PAGE;
  switch (env) {
    case 'dev': PAGE = 'https://login.bodhi-dev.io'; break;
    case 'qa': PAGE = 'https://login.bodhi-qa.io'; break;
    case 'stg': PAGE = 'https://login.bodhi-stg.io'; break;
    case 'prd': PAGE = 'https://login.hotschedules.io'; break;
    default: q.reject('Invalid environment'); return q.promise;
  }
  PAGE = `${PAGE}/auth/realms/hotschedules/protocol/openid-connect/token`;
  console.log('Verifying username and password...');
  console.log(`${colors.red('POST')} ${colors.green(PAGE)}`);
  request({
    method: 'POST',
    uri: PAGE,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'password',
      client_id: 'admin-cli',
      username,
      password
    }
  }, (err, response, body) => {
    const objBody = JSON.parse(body);
    if (!objBody || !objBody.error) {
      q.resolve(objBody.id_token);
    } else {
      q.reject(objBody.error_description);
    }
  });
  return q.promise;
};

module.exports = getToken;
