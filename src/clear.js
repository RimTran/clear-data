const axios = require('axios');

const resourceAsClear = [
  'ProductionInvBaseUnit',
  'ProductionInvCategory',
  'ProductionItemDefinition',
  // 'InventoryItem',
  'ProductionSchedule',
  // 'ProductionItemThawSetup',
  // 'InventoryOnHand',
];

function clear() {
  const baseUrl = this.baseUrl;
  const token = this.token;
  const storeKey = this.storeKey;

  const singleClear = ({resourceName}) => {
    // const url = `${baseUrl}/${resourceName}?where={"store_key":"${storeKey}"}`;
    const url = `${baseUrl}/${resourceName}`;
    return axios({
      method: 'DELETE',
      url,
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `ID_TOKEN=${token}`
      }
    })
  };

  const clearsAsPromise = resourceAsClear.map(resourceName => {
    return singleClear({resourceName});
  });

  return Promise.all(
    clearsAsPromise
  )
}

module.exports = clear;
