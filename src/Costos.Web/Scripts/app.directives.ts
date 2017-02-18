/// <reference path="./typings/angularjs/angular.d.ts"/>
/// <reference path="./typings/lib.d.ts"/>

angular.module('app.directives', [])
    .directive('ngSpinnerBar', ['$rootScope',
    $rootScope => {
        return {
            link: (scope, element, attrs) => {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart',() => {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess',() => {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    //Layout.setSidebarMenuActiveLink('match'); // activate selected link in the main menu

                    // auto scorll to page top
                    /// TODO: Habilitar esto
                    /*
                    setTimeout(() => {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                    */
                });

                // handle errors
                $rootScope.$on('$stateNotFound',() => {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError',() => {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])
// Handle global LINK click
    .directive('a',() => {
    return {
        restrict: 'E',
        link: (scope, elem, attrs: any) => {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', e => {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
    })
    .directive('checklistModel', ['$parse', '$compile', ($parse, $compile) => {
        // contains
        function contains(arr, item, comparator) {
            if (angular.isArray(arr)) {
                for (var i = arr.length; i--;) {
                    if (comparator(arr[i], item)) {
                        return true;
                    }
                }
            }
            return false;
        }

        // add
        function add(arr, item, comparator) {
            arr = angular.isArray(arr) ? arr : [];
            if (!contains(arr, item, comparator)) {
                arr.push(item);
            }
            return arr;
        }  

        // remove
        function remove(arr, item, comparator) {
            if (angular.isArray(arr)) {
                for (var i = arr.length; i--;) {
                    if (comparator(arr[i], item)) {
                        arr.splice(i, 1);
                        break;
                    }
                }
            }
            return arr;
        }

        // http://stackoverflow.com/a/19228302/1458162
        function postLinkFn(scope, elem, attrs) {
            // compile with `ng-model` pointing to `checked`
            $compile(elem)(scope);

            // getter / setter for original model
            var getter = $parse(attrs.checklistModel);
            var setter = getter.assign;
            var checklistChange = $parse(attrs.checklistChange);

            // value added to list
            var value = $parse(attrs.checklistValue)(scope.$parent);


            var comparator = angular.equals;

            if (attrs.hasOwnProperty('checklistComparator')) {
                comparator = $parse(attrs.checklistComparator)(scope.$parent);
            }

            // watch UI checked change
            scope.$watch('checked', (newValue, oldValue) => {
                if (newValue === oldValue) {
                    return;
                }
                var current = getter(scope.$parent);
                if (newValue === true) {
                    setter(scope.$parent, add(current, value, comparator));
                } else {
                    setter(scope.$parent, remove(current, value, comparator));
                }

                if (checklistChange) {
                    checklistChange(scope);
                }
            });
    
            // declare one function to be used for both $watch functions
            function setChecked(newArr, oldArr) {
                scope.checked = contains(newArr, value, comparator);
            }

            // watch original model change
            // use the faster $watchCollection method if it's available
            if (angular.isFunction(scope.$parent.$watchCollection)) {
                scope.$parent.$watchCollection(attrs.checklistModel, setChecked);
            } else {
                scope.$parent.$watch(attrs.checklistModel, setChecked, true);
            }
        }

        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: (tElement, tAttrs) => {
                if (tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }

                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }

                // exclude recursion
                tElement.removeAttr('checklist-model');
      
                // local scope var storing individual checkbox model
                tElement.attr('ng-model', 'checked');

                return postLinkFn;
            }
        };
    }])
.directive('report-viewer', () => {
        return {
            restrict: 'E',
            templateUrl: 'app/directives/Report/template.html',
            link: (scope, element:any, attrs) => {
                element.telerik_ReportViewer(
                    {
                        error: (data) => {
                            alert(data);
                        },
                        reportSource: {
                            report: 'Reports.blankReport, Reports'
                        },
                        serviceUrl: '/api/reports/',
                        templateUrl: '/ReportViewer/templates/telerikReportViewerTemplate-9.0.15.324.html',
                        ready: () => {
                            this.refreshReport();
                        }
                    });
            },
            scope: {
                content: '=',
                reportname: '@reportname'
            }

        };
    });