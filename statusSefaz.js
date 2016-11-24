$http({
  method: 'GET',
  url: 'https://webmaniabr.com/api/1/nfe/sefaz/',
  headers: {
      'Content-Type' : 'application/json; charset=utf-8',
      'X-Consumer-Key' : SEU_CONSUMER_KEY,
      'X-Consumer-Secret' : SEU_CONSUMER_SECRET,
      'X-Access-Token' : SEU_ACCESS_TOKEN,
      'X-Access-Token-Secret' : SEU_ACCESS_TOKEN_SECRET,
  },
}).then(function successCallback(response) {

    response = angular.fromJson(response);
    status = response['data']['status'];
    console.log(status);

}, function errorCallback(response) {

    console.log('Erro');
    console.log(response);

});