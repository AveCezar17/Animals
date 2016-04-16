/**
 * Created by oleksii on 13.04.16.
 */

var animalsApp = angular.module('animalsApp', [
    'ngRoute',
    'ngMessages'
]);

//config
animalsApp.config(['$routeProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
            when('/cats', {
                templateUrl: '/partials/cats.hbs'
            }).
            when('/dogs', {
                templateUrl: '/partials/dogs.hbs'
            }).
            when('/horses', {
                templateUrl: '/partials/horses.hbs'
            }).
            when('/contactUs', {
                templateUrl: '/partials/contactUs.hbs'
            }).
            otherwise({
                redirectTo: '/'
            });
        /*$locationProvider.html5Mode(true);*/
    }]);

//controllers
animalsApp.controller('AnimalsCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
}]);

animalsApp.controller('FormCtrl', function($scope) {
    $scope.beautifulForm = function () {
        var result = {
            email: $scope.email,
            message: $scope.text
        };
        if ($scope.email && $scope.text) {
            console.log(result);
        } else return false
    }
});

animalsApp.controller('SidebarController', function($scope) {

    $scope.state = false;

    $scope.toggleState = function() {
        $scope.state = !$scope.state;
    };

});

animalsApp.controller('MyCtrl', ['$scope', function($scope) {
    $scope.modalShown = false;
    $scope.toggleModal = function() {
        $scope.modalShown = !$scope.modalShown;
    };
    $scope.yesButton = function () {
        console.log('You clicked "Yes"');
    };
    $scope.noButton = function () {
        console.log('You clicked "No"');
    };
}]);

//directives
var INTEGER_REGEXP = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
animalsApp.directive('email', function() {
    return {
        require: 'ngModel',
        link: function(scope, elm, attrs, ctrl) {
            ctrl.$validators.email = function(modelValue, viewValue) {
                if (ctrl.$isEmpty(modelValue)) {
                    // consider empty models to be valid
                    return true;
                }

                if (INTEGER_REGEXP.test(viewValue)) {
                    // it is valid
                    return true;
                }

                // it is invalid
                return false;
            };
        }
    };
});

animalsApp.directive('sidebarDirective', function() {
    return {
        link : function(scope, element, attr) {
            scope.$watch(attr.sidebarDirective, function(newVal) {
                if(newVal)
                {
                    element.addClass('show');
                    return;
                }
                element.removeClass('show');
            });
        }
    };
});

animalsApp.directive('modalDialog', function() {
    return {
        restrict: 'E',
        scope: {
            show: '='
        },
        replace: true, // Replace with the template below
        transclude: true, // we want to insert custom content inside the directive
        link: function(scope, element, attrs) {
            scope.dialogStyle = {};
            if (attrs.width)
                scope.dialogStyle.width = attrs.width;
            if (attrs.height)
                scope.dialogStyle.height = attrs.height;
            scope.hideModal = function() {
                scope.show = false;
            };
        },
        template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
    };
});