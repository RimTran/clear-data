const axios = require('axios');

//const dir = '../seed/Multi_freq_some_day_per_week_THANG_2Item_Use_1Schedule';
//const dir = '../seed/1240_one_freq_some_day_per_week';
const dir = '../seed/Demo_S13_Recipe';

const documents = [
  {
    resourceName: 'ProductionInvBaseUnit',
    data: require(dir + '/production-baseunit.json')
  },
  {
    resourceName: 'ProductionInvCategory',
    data: require(dir + '/production-category.json')
  },
  {
    resourceName: 'ProductionItemDefinition',
    data: require(dir + '/production-item.json')
  },
  {
    resourceName: 'ProductionSchedule',
    data: require(dir + '/production-schedule.json')
  }
  // {
  //     resourceName: 'ProductionSuggestedThawQuantityJobLog',
  //     data: require(dir + '/thawlog.json')
  // },
  // {
  //     resourceName: 'ProductionSuggestedThawItemPull',
  //     data: require(dir + '/itempull.json')
  // },
];

module.exports = function seed() {
  const token = this.token;

  const singlePost = ({ resourceName, data }) => {

    const url = 'http://localhost:5000/inv_dev_uat/exeCommand';
    return axios({
      url,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `ID_TOKEN=${token}`
      },
      data: {
        service: "debugService",
        funcName: "bulkInsert",
        args: [{
          namespace: this.namespace,
          type: resourceName,
          reqData: data
        }],
        isCallbackFunc: false
      }
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
