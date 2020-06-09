exports.config = {
  'seleniumAddress': 'http://hub-cloud.browserstack.com/wd/hub',

  'commonCapabilities': {
    'browserstack.user': 'ericwang11',
    'browserstack.key': 'y8pJzxhu1ZVYw6zyxqqs',
    'name': 'SE Onboard Webcrawler Parallel Test'
  },

  'multiCapabilities': [{
    'browserName': 'Chrome'
  },{
    'browserName': 'Safari'
  },{
    'browserName': 'Firefox'
  }]
};

// Code to support common capabilities
exports.config.multiCapabilities.forEach(function(caps){
  for(var i in exports.config.commonCapabilities) caps[i] = caps[i] || exports.config.commonCapabilities[i];
});