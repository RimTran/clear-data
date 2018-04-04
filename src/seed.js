const axios = require('axios');

//const dir = '../seed/Multi_freq_some_day_per_week_THANG_2Item_Use_1Schedule';
//const dir = '../seed/1240_one_freq_some_day_per_week';
const dir = '../seed/1240_one_freq_per_day_whole_week';

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
        resourceName: 'ProductionSuggestedThawQuantityJobLog',
        data: require(dir + '/thawlog.json')
    },
    {
        resourceName: 'ProductionSuggestedThawItemPull',
        data: require(dir + '/suggestpull.json')
    },
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
