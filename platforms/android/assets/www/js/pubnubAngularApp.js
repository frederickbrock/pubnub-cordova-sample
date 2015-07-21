angular.module('PubNubAngularApp', ['ngCordova','pubnub.angular.service'])

.controller('StockPriceController', function($rootScope,$scope,PubNub){

    
    if (!$rootScope.initialized) {
   			 // Initialize the PubNub service
    		PubNub.init({
      			subscribe_key: 'demo',
      			publish_key: 'demo',
      			uuid:"test-angular"
    		});

    		$rootScope.initialized = true;
  		}

      if(!$scope.stockquotes){
        $scope.stockquotes = [];
      }

  		if(!$rootScope.isSubscribed){

  			PubNub.ngSubscribe({channel : 'MSFT'});
  				
  			$rootScope.$on(PubNub.ngMsgEv("MSFT"), function(ngEvent, payload) {
   					 $scope.$apply(function() {
        					$scope.stockquotes.push(payload.message);
                  $scope.currentPrice = { price: payload.message.price, 
                                          perc: payload.message.perc,
                                          vol: payload.message.vol, 
                                          delta: payload.message.delta,
                                          time: payload.message.time };
    				});
			   });

  			$rootScope.isSubscribed = true;
  		}






});





