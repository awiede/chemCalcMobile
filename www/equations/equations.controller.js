/**
 * Created by Andreas on 12/27/15.
 */
angular.module('chemCalc').controller('EquationsCtrl', ['$scope', function($scope) {

  $scope.tabs = [{
    title: 'Antoine Equation',
    equationView: 'antoine',
    url: '/antoine'
  }
    /*, {
    title: 'Relativity',
    equationView: 'relativity'
  }, {
    title: 'Ideal Gas Law',
    equationView: 'idealGasLaw'
  }*/
  ];

  $scope.message = 'Equations Controller Message!';
}]);

