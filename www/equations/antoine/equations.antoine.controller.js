/**
 * Created by Andreas on 12/27/15.
 */
angular.module('chemCalc').controller('AntoineCtrl', ['$scope', '$cordovaKeyboard', function($scope, $cordovaKeyboard) {
  MathJax.Hub.Queue(["Typeset", MathJax.Hub]);

  var antoineExpression = math.parse('10 ^ (A  - (B / (T + C)))').compile();
  var kelvinToCelsius = math.parse('K - 273.15').compile();

  $scope.antoineMessage = 'Test Antoine Message';

  $scope.hydrocarbons = [{
    name: 'Water',
    minTemp: 379,
    maxTemp: 573,
    A: 3.55959,
    B: 643.748,
    C: -198.043
  }, {
    name: 'n-Hexane',
    minTemp: 379,
    maxTemp: 573,
    A: 3.45604,
    B: 1044.038,
    C: -53.893
  }];

  $scope.currentHydrocarbon = $scope.hydrocarbons[0];

  $scope.temperatureFields = [{
    longName: 'Kelvin',
    abbreviation: 'K',
    currentMinTemp: $scope.currentHydrocarbon.minTemp,
    currentMaxTemp: $scope.currentHydrocarbon.maxTemp
  }, {
    longName: 'Celsius',
    abbreviation: 'C',
    currentMinTemp: math.format(kelvinToCelsius.eval({K: $scope.currentHydrocarbon.minTemp}), {precision: 5}),
    currentMaxTemp: math.format(kelvinToCelsius.eval({K: $scope.currentHydrocarbon.maxTemp}), {precision: 5})
  }];

  $scope.currentTemperatureUnit = $scope.temperatureFields[0];

  $scope.selectHydrocarbon = function(hydrocarbon) {
    $scope.currentHydrocarbon = hydrocarbon;
  };

  $scope.selectTemperatureUnit = function(temperatureUnit) {
    $scope.currentTemperatureUnit = temperatureUnit;
  };

  $scope.antoineForm = {};
  $scope.antoineForm.inputT = null;

  $scope.outputP = null;

  $scope.isCollapsed = true;
  $scope.showResult = false;

  $scope.resetInputs = function() {
    $scope.antoineForm = {};
    $scope.outputP = null;
    $scope.showResult = false;
  }

  $scope.submitAntoine = function () {
    // \log_{10} (P) = A - \frac{B}{T+C}

    var evalScope = {
      A: $scope.currentHydrocarbon.A,
      B: $scope.currentHydrocarbon.B,
      C: $scope.currentHydrocarbon.C,
      T: $scope.antoineForm.inputT
    };

    $cordovaKeyboard.close();

    $scope.outputP = antoineExpression.eval(evalScope);
    $scope.showResult = true;

    console.log('Antoine Result: ', $scope.outputP);

  };

}]);
