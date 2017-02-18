/// <reference path="./typings/jquery/jquery.d.ts"/>
/// <reference path="./typings/angularjs/angular.d.ts"/>
/// <reference path="./typings/lodash/lodash.d.ts"/>
/// <reference path="./typings/lib.d.ts"/>
/// <reference path="./app.core.ts"/>

'use strict';

angular.element(document).ready($http => {
    $http.get('/api/sessions/mysession.json').then(data => {
        angular.module('app').value('sessionData', data);
        angular.bootstrap(document, ['app']);
    });
});

var app = angular.module('app', [ 
    'ngAnimate',
    'ngCookies',
    'ngStorage',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.router.tabs',
    'ui.bootstrap',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ncy-angular-breadcrumb',
    'duScroll',
    'pascalprecht.translate',
    'restangular',
    'angularMoment',
    'app.core',
    'app.directives',
    'app.keta',
    'app.system'
])
    .factory('session',($rootScope, $state, Restangular, sessionData) => {
    var session: ISession;

    function buildSession() {
        if (!session) {
            session = <ISession>{};
        }

        angular.extend(session, {
            logOut: (success, error) => {
                Restangular.all('auth').one('logout').get().then(data => {
                    session = data.plain();
                    buildSession();
                    if (success) {
                        success(null);
                    } else {
                        $state.go('login.signin');
                    }
                });
            },
            impersonate: (id, name, rol, success, error) => {
                Restangular.all('session').one('impersonate').post(id).then(data => {
                    session = data.plain();
                    buildSession();
                    $rootScope.$broadcast('session:impersonate');
                    success();
                });
            },
            isAdmin: () => session && session.isInRole('admin'),
            reload: (success, error) => {
                Restangular.all('sessions').one('mysession').get().then(data => {
                    session = data.plain();
                    buildSession();
                    success();
                });
            },
            isInRole(roleName) {
                return true;
            }
        });

        $rootScope.session = session;
    }

    buildSession();

    angular.extend(session, sessionData);
    return $rootScope.session;
})
    .factory('settings', ['$rootScope', $rootScope => {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        layoutImgPath: 'Content/img/',
        layoutCssPath: 'Content/css/'
    };

    $rootScope.settings = settings;
    return settings;
    }])

    .factory('Excel', ['$window', function (route) {
        return function (route) {
            window.open(route);
            return true;
        }
    }])

    .factory('BlockUi', [function (mensaje) {
         return function (mensaje) {
            $.blockUI({
                css: {
                    border: 'none',
                    padding: '15px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff',
                    baseZ: 20000
                },
                message: mensaje,
             });
            return true;
        }
    }])

    .factory('UnBlockUi', [function () {
    return function () {
        $.unblockUI();
        }
    }])

    .constant('angularMomentConfig', {
    preprocess: 'utc',
})
    .config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', '$locationProvider',
    ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, $locationProvider) => {

        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;

        // LAZY MODULES

        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });

        // APPLICATION ROUTES
        // -----------------------------------
        // For any unmatched url, redirect to /app/dashboard
        $urlRouterProvider.otherwise("/app/dashboard");

        $locationProvider.html5Mode(true).hashPrefix('!');

        //
        // Set up the states
        $stateProvider.state('app', {
            url: '/app',
            templateUrl: 'tpl/app.html',
            //resolve: loadSequence('modernizr', 'moment', 'angularMoment', 'uiSwitch', 'perfect-scrollbar-plugin', 'perfect_scrollbar', 'toaster', 'ngAside', 'vAccordion', 'sweet-alert', 'chartjs', 'tc.chartjs', 'oitozero.ngSweetAlert', 'chatCtrl'),
            abstract: true,
            ncyBreadcrumb: {
                skip: true
            }
        }).state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'tpl/management/dashboard.html',
            controller: 'DashboardController',
            //resolve: loadSequence('jquery-sparkline', 'sparkline'),
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: '<i class="fa fa-home" > </i>Inicio'
            }
        })
        // Login routes
            .state('login', {
            url: '/login',
            template: '<div ui-view class="fade-in-right-big smooth"></div>',
            abstract: true
        }).state('login.signin', {
            url: '/signin',
            controller: 'SignInController',
            resolve: loadSequence('ng-backstretch', 'login-soft'),
            templateUrl: 'tpl/login/signin.html',
        }).state('login.forgot', {
            url: '/forgot',
            templateUrl: 'tpl/login/forgot.html'
        }).state('login.registration', {
            url: '/registration',
            templateUrl: 'tpl/login/registration.html'
        }).state('login.lockscreen', {
            url: '/lock',
            templateUrl: 'tpl/login/lock_screen.html'
        });
    }])
    .run([
    '$rootScope', '$state', '$stateParams', '$location', '$document', '$window', 'amMoment', 'session', ($rootScope, $state, $stateParams, $location, $document, $window, amMoment, session) => {
        // Attach Fastclick for eliminating the 300ms delay between a physical tap and the firing of a click event on mobile browsers
        FastClick.attach($document[0].body);

        // Set some reference to access them from any scope
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.session = session;

        amMoment.changeLocale('es');

        // GLOBAL APP SCOPE
        // set below basic information
        $rootScope.app = {
            name: 'CMG', // name of your project
            author: '', // author's name or company name
            description: 'CMG Inyeccion', // brief description
            version: '1.0', // current version
            year: ((new Date()).getFullYear()), // automatic current year (for copyright information)
            isMobile: (() => { // true if the browser is a mobile device
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test($window.navigator.userAgent.userAgent)) {
                    check = true;
                };
                return check;
            })(),
            layout: {
                isNavbarFixed: true, //true if you want to initialize the template with fixed header
                isSidebarFixed: true, // true if you want to initialize the template with fixed sidebar
                isSidebarClosed: false, // true if you want to initialize the template with closed sidebar
                isFooterFixed: false, // true if you want to initialize the template with fixed footer
                theme: 'theme-3', // indicate the theme chosen for your project
                logo: 'assets/images/logo.png' // relative path of the project logo
            }
        };

        $rootScope.$on('$stateChangeStart', (ev, to, toParams, from, fromParams) => {
            if (!angular.isDefined($rootScope.session) || !$rootScope.session.isAuthenticated) {
                $location.url('/login/signin');
            }

            /*
            var demandsUser = _.contains(to.data.auth, Roles.User);
            var demandsAdmin = _.contains(to.data.auth, Roles.Admin);
            if ((demandsUser || demandsAdmin) && !session.isAuthenticated) {
                $location.url('/login/signin');
            }
            */
        });

        $rootScope.user = {
            name: '',
            job: '',
            picture: 'app/img/user/02.jpg'
        };
    }
])

    .config(($breadcrumbProvider) => {
    $breadcrumbProvider.setOptions({
		includeAbstract: true,
        template: '<ol class="page-breadcrumb"><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><i class="fa fa-angle-right" data-ng-show="!$first"> </i><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}" ng-bind-html="step.ncyBreadcrumbLabel | translate"></a><span ng-switch-when="true" ng-bind-html="step.ncyBreadcrumbLabel | translate"></span></li></ol>'
    });
})

    .config([
    'RestangularProvider', RestangularProvider => {
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRequestSuffix('.json');
    }
])
    .config([
    '$translateProvider',
    ($translateProvider) => {
        $translateProvider.useUrlLoader('api/localization/resources.json');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.preferredLanguage('es');
    }
])
    .config([
    'cfpLoadingBarProvider', (cfpLoadingBarProvider) => {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
    }
])
    .controller('AppController', ['$rootScope', '$scope', '$state', '$translate', '$log', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar',
    ($rootScope, $scope, $state, $translate, $log, $localStorage, $window, $document, $timeout, cfpLoadingBar) => {
        // Loading bar transition
        // -----------------------------------
        var $win = $($window);

        $rootScope.$on('$stateChangeStart',(event, toState, toParams, fromState, fromParams) => {
            //start loading bar on stateChangeStart
            cfpLoadingBar.start();

        });
        $rootScope.$on('$stateChangeSuccess',(event, toState, toParams, fromState, fromParams) => {

            //stop loading bar on stateChangeSuccess
            event.targetScope.$watch('$viewContentLoaded',() => {
                cfpLoadingBar.complete();
            });

            // scroll top the page on change state

            $document.scrollTo(0, 0);

            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop: 0
                }, 0);
            }

            // Save the route title
            $rootScope.currTitle = $state.current.title;
        });

        // State not found
        $rootScope.$on('$stateNotFound',(event, unfoundState) => {
            //$rootScope.loading = false;
            $log.error(unfoundState.to);
            // "lazy.state"
            $log.error(unfoundState.toParams);
            // {a:1, b:2}
            $log.error(unfoundState.options);
            // {inherit:false} + default options
        });

        $rootScope.pageTitle = () => {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };

        // save settings to local storage
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;

        } else {
            $localStorage.layout = $scope.app.layout;
        }
        $scope.$watch('app.layout',() => {
            // save to local storage
            $localStorage.layout = $scope.app.layout;
        }, true);

        //global function to scroll page up
        $scope.toTheTop = () => {

            $document.scrollTopAnimated(0, 600);

        };

        // angular translate
        // ----------------------

        $scope.language = {
            // Handles language dropdown
            listIsOpen: false,
            // list of available languages
            available: {
                'en': 'English',
                'it_IT': 'Italiano',
                'de_DE': 'Deutsch'
            },
            // display always the current ui language
            init: () => {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                // we know we have set a preferred one in app.config
                $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: (localeId) => {
                $translate.use(localeId);
                $scope.language.selected = $scope.language.available[localeId];
                $scope.language.listIsOpen = !$scope.language.listIsOpen;
            }
        };

        $scope.language.init();

        // Function that find the exact height and width of the viewport in a cross-browser way
        var viewport = () => {
            var e: any = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = $document[0].documentElement || $document[0].body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        };
        // function that adds information in a scope of the height and width of the page
        $scope.getWindowDimensions = () => {
            return {
                'h': viewport().height,
                'w': viewport().width
            };
        };
        // Detect when window is resized and set some variables
        $scope.$watch($scope.getWindowDimensions,(newValue) => {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;
            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            } else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            } else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            } else {
                $scope.isMobileDevice = false;
            }
        }, true);
        // Apply on resize
        $win.on('resize',() => {
            $scope.$apply();
        });
    }
])
    .controller('SignInController', ['$rootScope', '$scope', '$state', '$log', 'Restangular', ($rootScope, $scope, $state, $log, Restangular) => {
    $scope.images = [
        'content/img/bg/1.jpg',
        'content/img/bg/2.jpg',
        'content/img/bg/3.jpg',
        'content/img/bg/4.jpg'
    ];

    $scope.login = () => {
        Restangular.all('auth').all('credentials').post({ userName: $scope.email, password: $scope.password }).then(() => {
            $scope.session.reload(() => {
                $state.go('app.dashboard');
            });
        });
    }
}
])
    .controller('HeaderController', ['$scope', '$state', ($scope, $state) => {
    $scope.logOut = () => {
        $scope.session.logOut(() => { $state.go('login.signin'); });
    };

    $scope.$on('$includeContentLoaded',() => {
        Layout.initHeader(); // init header
    });
}])
    .controller('SidebarController', ['$scope', '$state', ($scope, $state) => {
    $scope.$state = $state;

    $scope.$on('$includeContentLoaded',() => {
        Layout.initSidebar(); // init sidebar
    });
}])
    .controller('QuickSidebarController', ['$scope', '$timeout', ($scope, $timeout) => {
    $scope.$on('$includeContentLoaded',() => {
        $timeout(() => {
            QuickSidebar.init(); // init quick sidebar        
        }, 2000);
    });
}])
    .controller('ThemePanelController', ['$scope', $scope => {
    $scope.$on('$includeContentLoaded',() => {
        //Demo.init(); // init theme panel
    });
}])
    .controller('FooterController', ['$scope', $scope => {
    $scope.$on('$includeContentLoaded',() => {
        Layout.initFooter(); // init footer
    });
}])
    .controller('DashboardController', ['$scope', $scope => {
    }]);
