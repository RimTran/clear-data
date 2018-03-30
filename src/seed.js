const axios = require('axios');

const dir = '../seed/Fetch_Forecast_And_Transaction__THANG_V1';

const documents = [
  {
    resourceName: 'InventoryItem',
    data: require(dir + '/item.json')
  },
  {
    resourceName: 'ProductionSchedule',
    data: require(dir + '/schedule.json')
  },
  {
    resourceName: 'ProductionItemThawSetup',
    data: require(dir + '/thawsetup.json')
  },
  {
    resourceName: 'InventoryOnHand',
    data: require(dir + '/onhand.json')
  },
  {
    resourceName: 'InventoryForecastQuantity',
    data: require(dir + '/forecast.json')
  }
];

module.exports = function seed() {
  const baseUrl = this.baseUrl;
  const token = this.token;

  const singlePost = ({ resourceName, data }) => {

    const url = `${baseUrl}/${resourceName}`;
    return axios({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `ID_TOKEN=${token}`
      },
      data
    });
  };

  const postAsPromises = documents.map(doc => {
    return singlePost({
      resourceName: doc.resourceName,
      data: doc.data
    })
  });


  return Promise.all(postAsPromises);
};
