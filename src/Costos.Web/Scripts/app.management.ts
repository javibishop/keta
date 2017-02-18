/// <reference path="./typings/jquery/jquery.d.ts"/>
/// <reference path="./typings/lodash/lodash.d.ts"/>
/// <reference path="./typings/angularjs/angular.d.ts"/>
/// <reference path="./typings/lib.d.ts"/>

angular.module('app.management', [
    'ngCookies',
    'ngStorage',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'restangular',
    'pascalprecht.translate',
    'app.core'
])
    .config(['$stateProvider', ($stateProvider) => {
    $stateProvider
        .state('app.management', {
        url: '/management',
        template: '<data-ui-view />',
        ncyBreadcrumb: {
            label: 'Gestiones'
        },
        abstract: true
    })
        .state('app.management.inbox', {
        url: '/bandeja',
        controller: 'ManagementInboxController',
        templateUrl: 'tpl/management/inbox.html',
        resolve: loadSequence('ui.grid', 'ui.grid.autoResize'),
        ncyBreadcrumb: {
            label: 'Bandeja'
        }
        })
        .state('app.management.report', {
        url: '/reporte',
        controller: 'ManagementReportController',
        templateUrl: 'tpl/management/report.html',
        resolve: loadSequence('ui.grid', 'ui.grid.autoResize'),
        ncyBreadcrumb: {
            label: 'Reporte'
        }
        })
        .state('app.management.dashboard', {
        url: '/consola',
        controller: 'ManagementDashboardController',
        templateUrl: 'tpl/management/dashboard.html',
        resolve: loadSequence('ui.grid', 'ui.grid.autoResize'),
        ncyBreadcrumb: {
            label: 'Consola'
        }
    })
        .state('app.management.start', {
        url: '/iniciar',
        controller: 'ManagementStartController',
        templateUrl: 'tpl/management/start.html',
        resolve: loadSequence('flow'),
        ncyBreadcrumb: {
            label: 'Iniciar Gestión'
        }
    });
}
])
    .controller('ManagementStartController', ['$scope', '$translate', '$state', '$log', ($scope, $translate, $state, $log) => {

    }])
    .controller('ManagementReportController', ['$scope', '$translate', '$state', '$log', ($scope, $translate, $state, $log) => {

    }])
    .controller('ManagementInboxController', ['$scope', '$translate', '$state', '$log', ($scope, $translate, $state, $log) => {

    }])
    .controller('ManagementDashboardController', ['$scope', '$translate', '$state', '$log', ($scope, $translate, $state, $log) => {

}]);