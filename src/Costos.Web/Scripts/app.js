angular.module('app.keta', [
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
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.keta', {
            url: '/root',
            template: '<data-ui-view />',
            ncyBreadcrumb: {
                label: 'CMG'
            },
            abstract: true
        })
            .state('app.keta.marcas', {
            url: '/marcas',
            controller: 'KetaMarcasListController',
            templateUrl: 'tpl/marcas/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.keta',
                label: 'keta.marcas'
            }
        })
            .state('app.keta.marcanew', {
            url: '/marcas/new',
            controller: 'KetaMarcaEditController',
            templateUrl: 'tpl/marcas/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.marcas',
                label: 'entity.new'
            }
        })
            .state('app.keta.marcaedit', {
            url: '/marcas/{marcaId}',
            controller: 'KetaMarcaEditController',
            templateUrl: 'tpl/marcas/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.marcas',
                label: 'entity.edit'
            }
        })
            .state('app.keta.clientes', {
            url: '/clientes',
            controller: 'KetaClientesListController',
            templateUrl: 'tpl/clientes/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.keta',
                label: 'keta.clientes'
            }
        })
            .state('app.keta.clientenew', {
            url: '/clientes/new',
            controller: 'KetaClienteEditController',
            templateUrl: 'tpl/clientes/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.clientes',
                label: 'entity.new'
            }
        })
            .state('app.keta.clienteedit', {
            url: '/clientes/{clienteId}',
            controller: 'KetaClienteEditController',
            templateUrl: 'tpl/clientes/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.clientes',
                label: 'entity.edit'
            }
        })
            .state('app.keta.movilatenciones', {
            url: '/movilatenciones',
            controller: 'KetaMovilAtencionesListController',
            templateUrl: 'tpl/movilatenciones/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.keta',
                label: 'keta.movilatenciones'
            }
        })
            .state('app.keta.movilatencionnew', {
            url: '/movilatenciones/new',
            controller: 'KetaMovilAtencionEditController',
            templateUrl: 'tpl/movilatenciones/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.movilatenciones',
                label: 'entity.new'
            }
        })
            .state('app.keta.movilatencionedit', {
            url: '/movilatenciones/{movilatencionId}',
            controller: 'KetaMovilAtencionEditController',
            templateUrl: 'tpl/movilatenciones/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.keta.movilatenciones',
                label: 'entity.edit'
            }
        });
    }
])
    .controller('KetaMarcasListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.keta.marcanew');
        };
    }])
    .controller('KetaMarcaEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.marcaId;
        function load() {
            if (id) {
                Restangular.one('servicios').one('marcas', id).get().then(function (result) {
                    $scope.marca = result;
                });
            }
        }
        $scope.save = function () {
            if (id) {
                $scope.marca.put().then(function () { $state.go('app.keta.marcas'); });
            }
            else {
                var datos = $scope.marca;
                Restangular.service('servicios/marcas').post(datos).then(function () { $state.go('app.keta.marcas'); });
            }
        };
        load();
    }
])
    .controller('KetaClientesListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.keta.clientenew');
        };
    }])
    .controller('KetaClienteEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.clienteId;
        function load() {
            if (id) {
                Restangular.one('servicios').one('clientes', id).get().then(function (result) {
                    $scope.cliente = result;
                });
            }
        }
        $scope.save = function () {
            if (id) {
                $scope.cliente.put().then(function () { $state.go('app.keta.clientes'); });
            }
            else {
                var datos = $scope.cliente;
                Restangular.service('servicios/clientes').post(datos).then(function () { $state.go('app.keta.clientes'); });
            }
        };
        load();
    }
])
    .controller('KetaMovilAtencionesListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.keta.movilatencionnew');
        };
    }])
    .controller('KetaMovilAtencionEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.movilatencionId;
        function load() {
            if (id) {
                Restangular.one('servicios').one('movilatenciones', id).get().then(function (result) {
                    result.fecha = new Date(result.fecha);
                    $scope.movilatencion = result;
                });
            }
        }
        $scope.save = function () {
            var fecha = moment($scope.movilatencion.fecha).format('YYYY-MM-DD');
            $scope.movilatencion.fecha = fecha;
            if (id) {
                $scope.movilatencion.put().then(function () { $state.go('app.keta.movilatenciones'); });
            }
            else {
                var datos = $scope.movilatencion;
                Restangular.service('servicios/movilatenciones').post(datos).then(function () { $state.go('app.keta.movilatenciones'); });
            }
        };
        load();
    }
])
    .directive('ketaMarcasGrid', function ($state, Restangular) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'ketaMarcasGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            var colNames = ['', 'Codigo', 'Descripcion'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'codigo', index: 'codigo', search: true, width: 150, fixed: true },
                { name: 'descripcion', index: 'descripcion', search: true, width: 400, fixed: true }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/servicios/marcas.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                rowNum: 100,
                scroll: false,
                loadonce: 'false',
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                onCellSelect: function (rowId, iCol, cellcontent, e) {
                    if (iCol === 0) {
                        var stateName = 'app.keta.marcaedit';
                        $state.go(stateName, { marcaId: rowId });
                        return false;
                    }
                },
                beforeSelectRow: function (rowid, e) {
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('ketaMarcaLookup', ['$location', function ($location) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione una Marca',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/marcas/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, function (data) {
                                    callback({ id: data.id, text: data.codigo });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/marcas/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .directive('ketaClientesGrid', function ($state, Restangular) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'ketaClientesGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            var colNames = ['', 'Apellido', 'Nombre', 'Telefono', 'Direccion'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'apellido', index: 'apellido', search: true, width: 150, fixed: true },
                { name: 'nombre', index: 'nombre', search: true, width: 150, fixed: true },
                { name: 'telefono', index: 'telefono', search: true, width: 150, fixed: true },
                { name: 'direccion', index: 'direccion', search: true, width: 150, fixed: true }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/servicios/clientes.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                rowNum: 100,
                scroll: false,
                loadonce: 'false',
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                onCellSelect: function (rowId, iCol, cellcontent, e) {
                    if (iCol === 0) {
                        var stateName = 'app.keta.clienteedit';
                        $state.go(stateName, { clienteId: rowId });
                        return false;
                    }
                },
                beforeSelectRow: function (rowid, e) {
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('ketaClienteLookup', ['$location', function ($location) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione una Cliente',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/clientes/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, function (data) {
                                    callback({ id: data.id, text: data.nombreCompleto });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/clientes/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .directive('ketaMovilAtencionesGrid', function ($state, Restangular) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'ketaMovilAtencionesGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            var colNames = ['', 'Patente', 'Marca', 'Modelo', 'Nombre', 'Apellido', 'Telefono', 'Fecha'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'patente', index: 'patente', search: true, width: 150, fixed: true },
                { name: 'marcaCodigo', index: 'marcaCodigo', search: true, width: 150, fixed: true },
                { name: 'modelo', index: 'modelo', search: true, width: 150, fixed: true },
                { name: 'clienteNombre', index: 'clienteNombre', search: true, width: 150, fixed: true },
                { name: 'clienteApellido', index: 'clienteApellido', search: true, width: 150, fixed: true },
                { name: 'clienteTelefono', index: 'clienteTelefono', search: true, width: 150, fixed: true },
                { name: 'fecha', index: 'fecha', search: true, width: 150, fixed: true },
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/servicios/movilatenciones.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                rowNum: 100,
                scroll: false,
                loadonce: 'false',
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                onCellSelect: function (rowId, iCol, cellcontent, e) {
                    if (iCol === 0) {
                        var stateName = 'app.keta.movilatencionedit';
                        $state.go(stateName, { movilatencionId: rowId });
                        return false;
                    }
                },
                beforeSelectRow: function (rowid, e) {
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('ketaMovilAtencionLookup', ['$location', function ($location) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione una Movil',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/movilatenciones/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, function (data) {
                                    callback({ id: data.id, text: data.codigo });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/movilatenciones/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }]);
var _this = this;
angular.module('app.directives', [])
    .directive('ngSpinnerBar', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                element.addClass('hide');
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide');
                });
                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('hide');
                    $('body').removeClass('page-on-load');
                });
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide');
                });
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide');
                });
            }
        };
    }
])
    .directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault();
                });
            }
        }
    };
})
    .directive('checklistModel', ['$parse', '$compile', function ($parse, $compile) {
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
        function add(arr, item, comparator) {
            arr = angular.isArray(arr) ? arr : [];
            if (!contains(arr, item, comparator)) {
                arr.push(item);
            }
            return arr;
        }
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
        function postLinkFn(scope, elem, attrs) {
            $compile(elem)(scope);
            var getter = $parse(attrs.checklistModel);
            var setter = getter.assign;
            var checklistChange = $parse(attrs.checklistChange);
            var value = $parse(attrs.checklistValue)(scope.$parent);
            var comparator = angular.equals;
            if (attrs.hasOwnProperty('checklistComparator')) {
                comparator = $parse(attrs.checklistComparator)(scope.$parent);
            }
            scope.$watch('checked', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                var current = getter(scope.$parent);
                if (newValue === true) {
                    setter(scope.$parent, add(current, value, comparator));
                }
                else {
                    setter(scope.$parent, remove(current, value, comparator));
                }
                if (checklistChange) {
                    checklistChange(scope);
                }
            });
            function setChecked(newArr, oldArr) {
                scope.checked = contains(newArr, value, comparator);
            }
            if (angular.isFunction(scope.$parent.$watchCollection)) {
                scope.$parent.$watchCollection(attrs.checklistModel, setChecked);
            }
            else {
                scope.$parent.$watch(attrs.checklistModel, setChecked, true);
            }
        }
        return {
            restrict: 'A',
            priority: 1000,
            terminal: true,
            scope: true,
            compile: function (tElement, tAttrs) {
                if (tElement[0].tagName !== 'INPUT' || tAttrs.type !== 'checkbox') {
                    throw 'checklist-model should be applied to `input[type="checkbox"]`.';
                }
                if (!tAttrs.checklistValue) {
                    throw 'You should provide `checklist-value`.';
                }
                tElement.removeAttr('checklist-model');
                tElement.attr('ng-model', 'checked');
                return postLinkFn;
            }
        };
    }])
    .directive('report-viewer', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/directives/Report/template.html',
        link: function (scope, element, attrs) {
            element.telerik_ReportViewer({
                error: function (data) {
                    alert(data);
                },
                reportSource: {
                    report: 'Reports.blankReport, Reports'
                },
                serviceUrl: '/api/reports/',
                templateUrl: '/ReportViewer/templates/telerikReportViewerTemplate-9.0.15.324.html',
                ready: function () {
                    _this.refreshReport();
                }
            });
        },
        scope: {
            content: '=',
            reportname: '@reportname'
        }
    };
});
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
    .config(['$stateProvider', function ($stateProvider) {
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
    .controller('ManagementStartController', ['$scope', '$translate', '$state', '$log', function ($scope, $translate, $state, $log) {
    }])
    .controller('ManagementReportController', ['$scope', '$translate', '$state', '$log', function ($scope, $translate, $state, $log) {
    }])
    .controller('ManagementInboxController', ['$scope', '$translate', '$state', '$log', function ($scope, $translate, $state, $log) {
    }])
    .controller('ManagementDashboardController', ['$scope', '$translate', '$state', '$log', function ($scope, $translate, $state, $log) {
    }]);
angular.module('app.dashboard', [
    'ngCookies',
    'ngStorage',
    'ui.bootstrap',
    'ngAnimate',
    'ngSanitize',
    'ui.router',
    'restangular',
    'pascalprecht.translate',
    'app.core'
]).config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.dashboard', {
            templateUrl: '/tpl/dashboard.html',
            url: '/dashboard',
            resolve: loadSequence('jquery-sparkline', 'sparkline'),
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: 'Consola'
            }
        });
    }
])
    .controller('SparklineCtrl', function ($scope) {
    $scope.sales = [600, 923, 482, 1211, 490, 1125, 1487];
    $scope.earnings = [400, 650, 886, 443, 502, 412, 353];
    $scope.referrals = [4879, 6567, 5022, 5890, 9234, 7128, 4811];
})
    .controller('VisitsCtrl', function ($scope) {
    $scope.data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40, 84, 64, 120, 132, 87]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90, 102, 123, 145, 60, 161]
            }
        ]
    };
    $scope.options = {
        maintainAspectRatio: false,
        responsive: true,
        scaleShowGridLines: true,
        scaleGridLineColor: 'rgba(0,0,0,.05)',
        scaleGridLineWidth: 1,
        bezierCurve: false,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        onAnimationProgress: function () { },
        onAnimationComplete: function () { },
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
})
    .controller('SalesCtrl', function ($scope) {
    $scope.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.5)',
                strokeColor: 'rgba(220,220,220,0.8)',
                highlightFill: 'rgba(220,220,220,0.75)',
                highlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.5)',
                strokeColor: 'rgba(151,187,205,0.8)',
                highlightFill: 'rgba(151,187,205,0.75)',
                highlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 86, 27, 90]
            }
        ]
    };
    $scope.options = {
        maintainAspectRatio: false,
        responsive: true,
        scaleBeginAtZero: true,
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        barShowStroke: true,
        barStrokeWidth: 2,
        barValueSpacing: 5,
        barDatasetSpacing: 1,
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].fillColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
})
    .controller('OnotherCtrl', function ($scope) {
    $scope.data = [
        {
            value: 300,
            color: '#F7464A',
            highlight: '#FF5A5E',
            label: 'Red'
        },
        {
            value: 50,
            color: '#46BFBD',
            highlight: '#5AD3D1',
            label: 'Green'
        },
        {
            value: 100,
            color: '#FDB45C',
            highlight: '#FFC870',
            label: 'Yellow'
        }
    ];
    $scope.total = 450;
    $scope.options = {
        responsive: false,
        segmentShowStroke: true,
        segmentStrokeColor: '#fff',
        segmentStrokeWidth: 2,
        percentageInnerCutout: 50,
        animationSteps: 100,
        animationEasing: 'easeOutBounce',
        animateRotate: true,
        animateScale: false,
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<segments.length; i++){%><li><span style="background-color:<%=segments[i].fillColor%>"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>'
    };
})
    .controller('LastCtrl', function ($scope) {
    $scope.data = {
        labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
        datasets: [
            {
                label: 'My First dataset',
                fillColor: 'rgba(220,220,220,0.2)',
                strokeColor: 'rgba(220,220,220,1)',
                pointColor: 'rgba(220,220,220,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(220,220,220,1)',
                data: [65, 59, 90, 81, 56, 55, 40]
            },
            {
                label: 'My Second dataset',
                fillColor: 'rgba(151,187,205,0.2)',
                strokeColor: 'rgba(151,187,205,1)',
                pointColor: 'rgba(151,187,205,1)',
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(151,187,205,1)',
                data: [28, 48, 40, 19, 96, 27, 100]
            }
        ]
    };
    $scope.options = {
        responsive: true,
        scaleShowLine: true,
        angleShowLineOut: true,
        scaleShowLabels: false,
        scaleBeginAtZero: true,
        angleLineColor: 'rgba(0,0,0,.1)',
        angleLineWidth: 1,
        pointLabelFontFamily: '"Arial"',
        pointLabelFontStyle: 'normal',
        pointLabelFontSize: 10,
        pointLabelFontColor: '#666',
        pointDot: true,
        pointDotRadius: 3,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
    };
});
angular.module('app.system', [])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('app.system', {
            url: '/system',
            abstract: true,
            template: '<ui-view/>',
            ncyBreadcrumb: {
                skip: false,
                parent: 'app.dashboard',
                label: 'system'
            }
        })
            .state('app.system.tenants', {
            url: '/tenants',
            controller: 'SystemTenantsListController',
            templateUrl: 'tpl/system/tenants/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.system',
                label: 'system.tenants'
            }
        })
            .state('app.system.tenantnew', {
            url: '/tenants/new',
            controller: 'SystemTenantEditController',
            templateUrl: 'tpl/system/tenants/edit.html',
            ncyBreadcrumb: {
                parent: 'app.system.tenants',
                label: 'system.tenant.new'
            }
        })
            .state('app.system.tenantedit', {
            url: '/tenants/{tenantId}',
            controller: 'SystemTenantEditController',
            templateUrl: 'tpl/system/tenants/edit.html',
            ncyBreadcrumb: {
                parent: 'app.system.tenants',
                label: 'system.tenant.edit'
            }
        })
            .state('app.system.users', {
            url: '/users',
            controller: 'SystemUsersListController',
            templateUrl: 'tpl/system/users/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.system',
                label: 'system.users'
            }
        })
            .state('app.system.usernew', {
            url: '/users/new',
            controller: 'SystemUserEditController',
            templateUrl: 'tpl/system/users/edit.html',
            ncyBreadcrumb: {
                parent: 'app.system.users',
                label: 'system.user.edit'
            }
        })
            .state('app.system.useredit', {
            url: '/users/{userId}',
            controller: 'SystemUserEditController',
            templateUrl: 'tpl/system/users/edit.html',
            ncyBreadcrumb: {
                parent: 'app.system.users',
                label: 'system.user.edit'
            }
        })
            .state('app.system.roles', {
            url: '/roles',
            controller: 'SystemRolesListController',
            templateUrl: 'tpl/system/roles/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.system',
                label: 'system.roles'
            }
        })
            .state('app.system.rolenew', {
            url: '/roles/new',
            controller: 'SystemRoleEditController',
            templateUrl: 'tpl/system/roles/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.roles',
                label: 'system.role.new'
            }
        })
            .state('app.system.roleedit', {
            url: '/roles/{roleId}',
            controller: 'SystemRoleEditController',
            templateUrl: 'tpl/system/roles/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.roles',
                label: 'system.role.edit'
            }
        })
            .state('app.system.modules', {
            url: '/modules',
            controller: 'SystemModulesListController',
            templateUrl: 'tpl/system/modules/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.system',
                label: 'system.modules'
            }
        })
            .state('app.system.modulenew', {
            url: '/modules/new',
            controller: 'SystemModuleEditController',
            templateUrl: 'tpl/system/modules/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.module',
                label: 'system.module.new'
            }
        })
            .state('app.system.moduleedit', {
            url: '/modules/{moduleId}',
            controller: 'SystemModuleEditController',
            templateUrl: 'tpl/system/modules/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.module',
                label: 'system.module.edit'
            }
        })
            .state('app.system.companyimports', {
            url: '/companyimports',
            controller: 'SystemCompanyImportListController',
            templateUrl: 'tpl/system/companyimports/list.html',
            resolve: loadSequence('jqueryui', 'jqGrid'),
            ncyBreadcrumb: {
                parent: 'app.system',
                label: 'system.companyimports'
            }
        })
            .state('app.system.companyimportnew', {
            url: '/companyimports/new',
            controller: 'SystemCompanyImportEditController',
            templateUrl: 'tpl/system/companyimports/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.companyimports',
                label: 'system.companyimport.new'
            }
        })
            .state('app.system.companyimportedit', {
            url: '/companyimports/{companyImportId}',
            controller: 'SystemCompanyImportEditController',
            templateUrl: 'tpl/system/companyimports/edit.html',
            resolve: loadSequence('select2'),
            ncyBreadcrumb: {
                parent: 'app.system.companyimports',
                label: 'system.companyimport.edit'
            }
        });
    }
])
    .controller('SystemCompanyImportListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.system.companyimportnew');
        };
        $scope.app.title = $translate.instant('system.companyimports');
    }
])
    .controller('SystemCompanyImportEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.companyImportId;
        function load() {
            if (id) {
                Restangular.one('system').one('companyimports', id).get().then(function (result) {
                    $scope.companyimport = result;
                });
            }
        }
        $scope.save = function () {
            if (id) {
                $scope.companyimport.save().then(function () { $state.go('app.system.companyimports'); });
            }
            else {
                var datos = $scope.companyimport;
                Restangular.service('system/companyimports').post(datos).then(function () { $state.go('app.system.companyimports'); });
            }
        };
        load();
    }
])
    .controller('SystemTenantsListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.system.tenantnew');
        };
        $scope.app.title = $translate.instant('system.tenants');
    }
])
    .controller('SystemTenantEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.tenantId;
        function load() {
            if (id) {
                Restangular.one('system').one('tenants', id).get().then(function (result) {
                    $scope.tenant = result;
                });
            }
            Restangular.one('system').all('users').getList().then(function (result) {
                $scope.users = result;
            });
        }
        $scope.save = function () {
            if (id) {
                $scope.tenant.save().then(function () { $state.go('app.system.tenants'); });
            }
            else {
                var datos = $scope.tenant;
                Restangular.service('system/tenants').post(datos).then(function () { $state.go('app.system.tenants'); });
            }
        };
        load();
    }
])
    .controller('SystemModulesListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.system.modulenew');
        };
        $scope.app.title = $translate.instant('system.modules');
    }
])
    .controller('SystemModuleEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.moduleId;
        function load() {
            if (id) {
                Restangular.one('system').one('modules', id).get().then(function (result) {
                    $scope.module = result;
                });
            }
        }
        $scope.save = function () {
            if (id) {
                $scope.module.put().then(function () { $state.go('app.system.modules'); });
            }
            else {
                var datos = $scope.module;
                Restangular.service('system/modules').post(datos).then(function () { $state.go('app.system.modules'); });
            }
        };
        load();
    }
])
    .directive('systemCompanyImportsGrid', function ($state, $log, $filter, Restangular) {
    return {
        restrict: 'AEC',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemCompanyImportsGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            var colNames = ['', '', 'Compania', 'Nomina', 'Compras', 'Ventas', 'Produccion', 'Impuestos'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'id', index: 'id', hidden: true, editable: false },
                { name: 'companyName', index: 'companyName', search: false, width: 150, fixed: true },
                { name: 'nomina', index: 'nomina', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No'; } },
                { name: 'compras', index: 'compras', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No'; } },
                { name: 'ventas', index: 'ventas', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No'; } },
                { name: 'produccion', index: 'produccion', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No'; } },
                { name: 'impuestos', index: 'impuestos', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No'; } }
            ];
            var url = '/api/system/companyimports.json';
            gridElement.jqGrid({
                regional: 'es-ar',
                url: url,
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                rowNum: 100,
                jsonReader: {
                    page: function (obj) {
                        var page = (obj.offset / 100) + 1;
                        return page;
                    },
                    total: function (obj) {
                        var total = (obj.total <= 100) ? 1 : (((obj.total / 100) >> 0) + (obj.total % 100 > 0 ? 1 : 0));
                        return total;
                    },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        var stateName = 'app.system.companyimportedit';
                        $state.go(stateName, { companyImportId: rowId });
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
            scope.$on('refresh', function () {
                $log.info('refresh');
                gridElement.trigger('reloadGrid');
            });
        }
    };
})
    .directive('systemTenantsGrid', function ($state) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemTenantsGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 250;
            var colNames = ['', 'Nombre', 'Email'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'name', index: 'name' },
                { name: 'email', index: 'email', width: 250, fixed: true, search: true }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/system/tenants.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        var stateName = 'app.system.tenantedit';
                        $state.go(stateName, { tenantId: rowId });
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .controller('SystemRolesListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.system.rolenew');
        };
        $scope.app.title = $translate.instant('system.roles');
    }
])
    .controller('SystemRoleEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.roleId;
        function load() {
            if (id) {
                Restangular.one('system').one('role', id).get().then(function (result) {
                    $scope.role = result;
                });
            }
        }
        $scope.save = function () {
            if (id) {
                $scope.role.save().then(function () { $state.go('app.system.roles'); });
            }
            else {
                var datos = $scope.role;
                Restangular.service('system/role').post(datos).then(function () { $state.go('app.system.roles'); });
            }
        };
        load();
    }
])
    .directive('systemRolesGrid', function ($state) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemRolesGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 250;
            var colNames = ['', 'Nombre', 'Descripcion', 'Tenant'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'name', index: 'name', width: 250, fixed: true },
                { name: 'description', index: 'description' },
                { name: 'tenantName', index: 'tenantName', search: true }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/system/roles.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        var stateName = 'app.system.roleedit';
                        $state.go(stateName, { roleId: rowId });
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('systemTenantLookup', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    var model = scope.$eval(attr.ngModel);
                    if (model) {
                        element.val(model);
                    }
                    element.select2({
                        placeholder: 'Seleccione un tenant',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            var url = '/api/system/tenants/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, function (data) {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/tenants/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .controller('SystemUsersListController', ['$scope', '$state', '$translate', function ($scope, $state, $translate) {
        $scope.params = {
            selectedItems: []
        };
        $scope.new = function () {
            $state.go('app.system.usernew');
        };
        $scope.app.title = $translate.instant('system.users');
    }
])
    .controller('SystemUserEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', function ($scope, $translate, $state, $stateParams, Restangular) {
        var id = $stateParams.userId;
        function load() {
            if (id) {
                Restangular.one('system').one('users', id).get().then(function (result) {
                    $scope.user = result;
                    $scope.app.title = $translate.instant('system.user.edit') + ': ' + $scope.user.lastName + ', ' + $scope.user.firstName;
                });
            }
        }
        load();
        $scope.save = function () {
            if (id) {
                $scope.user.put().then(function () { $state.go('app.system.users'); });
            }
            else {
                var datos = $scope.user;
                Restangular.service('system/users').post(datos).then(function () { $state.go('app.system.users'); });
            }
        };
    }
])
    .directive('systemUsersGrid', function ($state, $document) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemUsersGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            var colNames = ['', 'Nombre', 'Apellido', 'Usuario', 'Email'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'firstName', index: 'firstName', search: true, width: 200, fixed: true },
                { name: 'lastName', index: 'lastName', search: true, width: 200, fixed: true },
                { name: 'userName', index: 'userName', search: true, width: 200, fixed: true },
                { name: 'email', index: 'email', search: true, width: 200, fixed: true }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/system/users.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        var stateName = 'app.system.useredit';
                        $state.go(stateName, { userId: rowId });
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('systemUserLookup', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione un usuario',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, function (data) {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .filter('systemBatchState', function () { return function (input) {
    switch (input) {
        case '0':
            return 'Preimportandose';
        case '1':
            return 'Pre-importado';
        case '2':
            return 'Importado';
        case '5':
            return 'Eliminado';
    }
    return '';
}; })
    .directive('systemBatchesGrid', function ($state, $log, $filter, Restangular, dialogs, toaster, alertify, BlockUi, UnBlockUi) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=', moduleId: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemBatchesGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 450;
            function systemBatchStateFormatter(cellvalue) {
                return $filter('systemBatchState')(cellvalue);
            }
            ;
            if (parseInt(scope.moduleId) == 2) {
                var colNames = ['', '', '', 'Año', 'Mes', 'Empresa', 'Tipo Lote', 'Registros', 'Estado'];
                var colModel = [
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                    },
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: function () { return '<i class="fa fa-trash-o hand"></i>'; }
                    },
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: function () { return '<i class="fa fa-step-forward"></i>'; }
                    },
                    { name: 'periodYear', index: 'periodYear', width: 80, fixed: true, search: true },
                    { name: 'periodMonth', index: 'periodMonth', width: 80, fixed: true, search: true },
                    { name: 'companyName', index: 'companyName', width: 150, fixed: true, search: true },
                    { name: 'type', index: 'type', width: 80, fixed: true, search: true },
                    { name: 'items', index: 'items', search: true, width: 80, fixed: true },
                    { name: 'state', index: 'state', search: false, width: 100, fixed: true, formatter: systemBatchStateFormatter },
                ];
            }
            else {
                var colNames = ['', '', 'Año', 'Mes', 'Empresa', 'Tipo Lote', 'Registros', 'Estado'];
                var colModel = [
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                    },
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: function () { return '<i class="fa fa-trash-o hand"></i>'; }
                    },
                    { name: 'periodYear', index: 'periodYear', width: 80, fixed: true, search: true },
                    { name: 'periodMonth', index: 'periodMonth', width: 80, fixed: true, search: true },
                    { name: 'companyName', index: 'companyName', width: 150, fixed: true, search: true },
                    { name: 'type', index: 'type', width: 80, fixed: true, search: true },
                    { name: 'items', index: 'items', search: true, width: 80, fixed: true },
                    { name: 'state', index: 'state', search: false, width: 100, fixed: true, formatter: systemBatchStateFormatter },
                ];
            }
            var url = '';
            if (scope.moduleId === 3) {
                url = '/api/system/batchesprocurement.json?moduleId=' + scope.moduleId;
            }
            else {
                url = '/api/system/batches.json?moduleId=' + scope.moduleId;
            }
            gridElement.jqGrid({
                regional: 'es-ar',
                url: url,
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                rowNum: 100,
                jsonReader: {
                    page: function (obj) {
                        var page = (obj.offset / 100) + 1;
                        return page;
                    },
                    total: function (obj) {
                        var total = (obj.total <= 100) ? 1 : (((obj.total / 100) >> 0) + (obj.total % 100 > 0 ? 1 : 0));
                        return total;
                    },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        switch (parseInt(scope.moduleId)) {
                            case 2:
                                $state.go('app.payroll.resourcebatchedit', { batchId: rowId });
                                break;
                            case 3:
                                $state.go('app.procurement.resourcebatchedit', { batchId: rowId });
                                break;
                            case 4:
                                $state.go('app.sale.saleimportedit', { batchId: rowId });
                                break;
                            case 5:
                                $state.go('app.production.productionimportedit', { batchId: rowId });
                                break;
                        }
                    }
                    if (iCol === 1) {
                        switch (parseInt(scope.moduleId)) {
                            case 2:
                            case 3:
                                var batch = gridElement.jqGrid('getRowData', rowId);
                                var data = { moduleId: scope.moduleId, batchId: rowId };
                                if (batch.state === 'Pre-importado') {
                                    alertify.confirm("Desea eliminar el registro?.", function (e) {
                                        if (e) {
                                            Restangular.service('system/batches/delete').post(data).then(function () {
                                                $state.reload();
                                            });
                                        }
                                    });
                                }
                                else {
                                    toaster.warning('No se puede eliminar el lote.');
                                }
                                break;
                            default:
                                toaster.warning('No habilitado para éste modulo.');
                                break;
                        }
                    }
                    if (parseInt(scope.moduleId) == 2 && iCol === 2) {
                        switch (parseInt(scope.moduleId)) {
                            case 2:
                                var batch = gridElement.jqGrid('getRowData', rowId);
                                var data = { moduleId: scope.moduleId, batchId: rowId };
                                if (batch.state === 'Pre-importado') {
                                    alertify.confirm("Desea importar el lote?.", function (e) {
                                        if (e) {
                                            BlockUi('Importando Lotes de Mano de Obra. Esto puede demorar varios minutos. Esta pantalla desaparecerá cuando termine el proceso.');
                                            Restangular.one('system').one('batches', rowId).post('import').then(function (result) {
                                                UnBlockUi();
                                                toaster.info('El lote se importó con éxito.');
                                                $state.reload();
                                            });
                                        }
                                    });
                                }
                                else {
                                    toaster.warning('No se puede importar el lote.');
                                }
                                break;
                            default:
                                toaster.warning('No habilitado para éste modulo.');
                                break;
                        }
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
            scope.$on('refresh', function () {
                $log.info('refresh');
                gridElement.trigger('reloadGrid');
            });
        }
    };
})
    .directive('systemModulesGrid', function ($state) {
    return {
        restrict: 'A',
        scope: { height: '@', selectedItems: '=' },
        link: function (scope, element, attrs, ctrl) {
            var gridElementName = 'systemModulesGrid';
            var pagerElementName = gridElementName + 'Pager';
            var gridElement = angular.element('<table></table>');
            gridElement.attr('id', gridElementName);
            var pagerElement = angular.element('<div></div>');
            pagerElement.attr('id', pagerElementName);
            element.append(gridElement);
            element.append(pagerElement);
            scope.height = scope.height || 250;
            var colNames = ['', 'Nombre', 'Indice'];
            var colModel = [
                {
                    name: 'editCommand',
                    index: 'editCommand',
                    width: 25,
                    align: 'center',
                    fixed: true,
                    sortable: false,
                    search: false,
                    formatter: function () { return '<i class="fa fa-caret-right hand"></i>'; }
                },
                { name: 'name', index: 'name' },
                { name: 'listIndex', index: 'listIndex', width: 150, fixed: true, search: false }
            ];
            gridElement.jqGrid({
                regional: 'es-ar',
                url: '/api/system/modules.json',
                datatype: 'json',
                height: scope.height,
                autowidth: true,
                colNames: colNames,
                colModel: colModel,
                mtype: 'GET',
                gridview: true,
                pager: pagerElementName,
                viewrecords: true,
                jsonReader: {
                    page: function (obj) { return ((obj.offset / 100) + 1); },
                    total: function (obj) { return ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)); },
                    records: 'total',
                    repeatitems: false,
                    root: 'results'
                },
                beforeRequest: function () {
                    var currentPage = gridElement.jqGrid('getGridParam', 'page');
                    gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                },
                beforeSelectRow: function () {
                    return false;
                },
                onCellSelect: function (rowId, iCol) {
                    if (iCol === 0) {
                        var stateName = 'app.system.moduleedit';
                        $state.go(stateName, { moduleId: rowId });
                    }
                    return false;
                }
            });
            gridElement.jqGrid('navGrid', '#' + pagerElementName, {
                del: false,
                add: false,
                edit: false
            }, {}, {}, {}, { multipleSearch: false });
            gridElement.jqGrid('filterToolbar', { autosearch: true, searchOperators: false });
            gridElement.jqGrid('bindKeys');
        }
    };
})
    .directive('systemModuleLookup', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione el Origen del Gasto',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            var url = '/api/system/modules/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, function (data) {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/modules/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .directive('systemUsersLookup', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione el Usuario',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, function (data) {
                                callback({ id: data.id, text: data.userName });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .directive('systemUsersProcuradorLookup', [function () {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione el Procurador',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, function (data) {
                                callback({ id: data.id, text: data.userName });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/procurador/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])
    .directive('systemCompanyLookupByModule', ['$location', function ($location) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: { moduleId: '=' },
            link: function (scope, element, attr, ctrl) {
                if (!ctrl)
                    return;
                var required = attr.required ? attr.required : false;
                ctrl.$render = function () {
                    element.val(scope.$eval(attr.ngModel));
                    element.select2({
                        placeholder: 'Seleccione una empresa',
                        allowClear: !required,
                        initSelection: function (element1, callback) {
                            if (ctrl.$modelValue) {
                                var url = '/api/organization/companies/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, function (data) {
                                    callback({ id: data.id, text: data.name });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/system/companyimports/' + scope.moduleId + '/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: function (term, page) {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: function (data, page) {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };
                element.bind('change', function () {
                    scope.$apply(function () {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });
                attr.$observe('disabled', function (value) {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }]);
angular.module('app.core', [])
    .constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});
var jsRequires = {
    scripts: {
        'login-soft': 'content/css/login-soft.css',
        'modernizr': ['vendor/modernizr/modernizr.js'],
        'spin': 'vendor/ladda/spin.min.js',
        'perfect-scrollbar-plugin': ['vendor/perfect-scrollbar/perfect-scrollbar.min.js', 'vendor/perfect-scrollbar/perfect-scrollbar.min.css'],
        'ladda': ['vendor/ladda/spin.min.js', 'vendor/ladda/ladda.min.js', 'vendor/ladda/ladda-themeless.min.css'],
        'sweet-alert': ['vendor/sweet-alert/sweet-alert.min.js', 'vendor/sweet-alert/sweet-alert.css'],
        'chartjs': 'vendor/chartjs/Chart.min.js',
        'jquery-sparkline': 'vendor/sparkline/jquery.sparkline.min.js',
        'ckeditor-plugin': 'vendor/ckeditor/ckeditor.js',
        'jquery-nestable-plugin': ['vendor/ng-nestable/jquery.nestable.js', 'vendor/ng-nestable/jquery.nestable.css'],
        'touchspin-plugin': 'vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js',
        'bootstrapjs': 'bower_components/bootstrap/dist/js/bootstrap.min.js',
        'jqueryui': ['bower_components/jquery-ui/jquery-ui.min.js', 'bower_components/jquery-ui/themes/smoothness/jquery-ui.min.css'],
        'jqGrid': ['scripts/grid.locale-es-ar.js', 'bower_components/jqgrid/js/jquery.jqGrid.min.js', 'bower_components/jqgrid/css/ui.jqgrid.css', 'Content/css/jqGrid.css'],
        'select2': { files: ['bower_components/select2/select2.min.js', 'bower_components/select2/select2_locale_es.js', 'bower_components/select2/select2.css', 'Content/css/select2.css'], serie: true },
        'kendoweb': { files: ['Content/lib/kendoui/kendo.web.min.js'] },
        'htmlToPlaintext': 'assets/js/filters/htmlToPlaintext.js'
    },
    modules: [
        {
            name: 'dialogs.main',
            insertBefore: '#ng_load_plugins_before',
            files: ['bower_components/angular-dialog-service/dist/dialogs.min.css', 'bower_components/angular-dialog-service/dist/dialogs.min.js']
        },
        {
            name: 'ng-backstretch',
            files: ['bower_components/ng-backstretch/dist/ng-backstretch.min.js']
        },
        {
            name: 'perfect_scrollbar',
            files: ['vendor/perfect-scrollbar/angular-perfect-scrollbar.js']
        },
        {
            name: 'alertify',
            files: ['bower_components/ngAlertify/ngAlertify.js', 'bower_components/ngAlertify/alertify.min.css', 'bower_components/ngAlertify/alertify.default.css']
        },
        {
            name: 'toaster',
            files: ['bower_components/AngularJS-Toaster/toaster.js', 'bower_components/AngularJS-Toaster/toaster.css']
        }, {
            name: 'angularBootstrapNavTree',
            files: ['vendor/angular-bootstrap-nav-tree/abn_tree_directive.js', 'vendor/angular-bootstrap-nav-tree/abn_tree.css']
        }, {
            name: 'angular-ladda',
            files: ['vendor/ladda/angular-ladda.min.js']
        }, {
            name: 'ngTable',
            files: ['vendor/ng-table/ng-table.min.js', 'vendor/ng-table/ng-table.min.css']
        }, {
            name: 'ui.select',
            files: ['vendor/ui-select/select.min.js', 'vendor/ui-select/select.min.css', 'vendor/ui-select/select2.css', 'vendor/ui-select/select2-bootstrap.css', 'vendor/ui-select/selectize.bootstrap3.css']
        }, {
            name: 'ui.mask',
            files: ['vendor/ui-utils/mask/mask.js']
        }, {
            name: 'angular-bootstrap-touchspin',
            files: ['vendor/bootstrap-touchspin/angular.bootstrap-touchspin.js', 'vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css']
        }, {
            name: 'ngImgCrop',
            files: ['vendor/ngImgCrop/ng-img-crop.js', 'vendor/ngImgCrop/ng-img-crop.css']
        }, {
            name: 'angularFileUpload',
            files: ['vendor/angular-file-upload/angular-file-upload.min.js', 'vendor/angular-file-upload/directives.js']
        }, {
            name: 'ngAside',
            files: ['vendor/angular-aside/angular-aside.min.js', 'vendor/angular-aside/angular-aside.min.css']
        }, {
            name: 'truncate',
            files: ['vendor/angular-truncate/truncate.js']
        }, {
            name: 'oitozero.ngSweetAlert',
            files: ['vendor/sweet-alert/ngSweetAlert.min.js']
        }, {
            name: 'monospaced.elastic',
            files: ['vendor/angular-elastic/elastic.js']
        }, {
            name: 'ngMap',
            files: ['vendor/angular-google-maps/ng-map.min.js']
        }, {
            name: 'tc.chartjs',
            files: ['vendor/chartjs/tc-angular-chartjs.min.js']
        }, {
            name: 'sparkline',
            files: ['vendor/sparkline/angular-sparkline.js']
        }, {
            name: 'flow',
            files: ['vendor/ng-flow/ng-flow-standalone.min.js']
        }, {
            name: 'uiSwitch',
            files: ['vendor/angular-ui-switch/angular-ui-switch.min.js', 'vendor/angular-ui-switch/angular-ui-switch.min.css']
        }, {
            name: 'ckeditor',
            files: ['vendor/ckeditor/angular-ckeditor.min.js']
        }, {
            name: 'mwl.calendar',
            files: ['vendor/angular-bootstrap-calendar/angular-bootstrap-calendar.js', 'vendor/angular-bootstrap-calendar/angular-bootstrap-calendar-tpls.js', 'vendor/angular-bootstrap-calendar/angular-bootstrap-calendar.min.css']
        }, {
            name: 'ng-nestable',
            files: ['vendor/ng-nestable/angular-nestable.js']
        }, {
            name: 'vAccordion',
            files: ['vendor/v-accordion/v-accordion.min.js', 'vendor/v-accordion/v-accordion.min.css']
        }, {
            name: 'xeditable',
            files: ['vendor/angular-xeditable/xeditable.min.js', 'vendor/angular-xeditable/xeditable.css']
        }, {
            name: 'config-xeditable',
            files: ['vendor/angular-xeditable/config-xeditable.js']
        }, {
            name: 'checklist-model',
            files: ['vendor/checklist-model/checklist-model.js']
        }, {
            name: 'telerikreport',
            files: ['ReportViewr/js/telerikReportViewer-9.1.15.731.min.js', 'ReportViewr/js/telerikReportViewer-9.1.15.731.min.css']
        }]
};
function loadSequence() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    return {
        deps: ['$ocLazyLoad', '$q',
            function ($ocLL, $q) {
                var promise = $q.when(1);
                for (var i = 0, len = args.length; i < len; i++) {
                    promise = promiseThen(args[i]);
                }
                return promise;
                function promiseThen(arg) {
                    if (typeof arg == 'function')
                        return promise.then(arg);
                    else
                        return promise.then(function () {
                            var nowLoad = requiredData(arg);
                            if (!nowLoad)
                                return $.error('Route resolve: Bad resource name [' + arg + ']');
                            return $ocLL.load(nowLoad);
                        });
                }
                function requiredData(name) {
                    if (jsRequires.modules)
                        for (var m in jsRequires.modules)
                            if (jsRequires.modules[m].name && jsRequires.modules[m].name === name)
                                return jsRequires.modules[m];
                    return jsRequires.scripts && jsRequires.scripts[name];
                }
            }]
    };
}
'use strict';
angular.element(document).ready(function ($http) {
    $http.get('/api/sessions/mysession.json').then(function (data) {
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
    .factory('session', function ($rootScope, $state, Restangular, sessionData) {
    var session;
    function buildSession() {
        if (!session) {
            session = {};
        }
        angular.extend(session, {
            logOut: function (success, error) {
                Restangular.all('auth').one('logout').get().then(function (data) {
                    session = data.plain();
                    buildSession();
                    if (success) {
                        success(null);
                    }
                    else {
                        $state.go('login.signin');
                    }
                });
            },
            impersonate: function (id, name, rol, success, error) {
                Restangular.all('session').one('impersonate').post(id).then(function (data) {
                    session = data.plain();
                    buildSession();
                    $rootScope.$broadcast('session:impersonate');
                    success();
                });
            },
            isAdmin: function () { return session && session.isInRole('admin'); },
            reload: function (success, error) {
                Restangular.all('sessions').one('mysession').get().then(function (data) {
                    session = data.plain();
                    buildSession();
                    success();
                });
            },
            isInRole: function (roleName) {
                return true;
            }
        });
        $rootScope.session = session;
    }
    buildSession();
    angular.extend(session, sessionData);
    return $rootScope.session;
})
    .factory('settings', ['$rootScope', function ($rootScope) {
        var settings = {
            layout: {
                pageSidebarClosed: false,
                pageBodySolid: false,
                pageAutoScrollOnLoad: 1000
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
        };
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
        };
    }])
    .factory('UnBlockUi', [function () {
        return function () {
            $.unblockUI();
        };
    }])
    .constant('angularMomentConfig', {
    preprocess: 'utc',
})
    .config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$ocLazyLoadProvider', '$locationProvider',
    function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide, $ocLazyLoadProvider, $locationProvider) {
        app.controller = $controllerProvider.register;
        app.directive = $compileProvider.directive;
        app.filter = $filterProvider.register;
        app.factory = $provide.factory;
        app.service = $provide.service;
        app.constant = $provide.constant;
        app.value = $provide.value;
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
            modules: jsRequires.modules
        });
        $urlRouterProvider.otherwise("/app/dashboard");
        $locationProvider.html5Mode(true).hashPrefix('!');
        $stateProvider.state('app', {
            url: '/app',
            templateUrl: 'tpl/app.html',
            abstract: true,
            ncyBreadcrumb: {
                skip: true
            }
        }).state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'tpl/management/dashboard.html',
            controller: 'DashboardController',
            title: 'Dashboard',
            ncyBreadcrumb: {
                label: '<i class="fa fa-home" > </i>Inicio'
            }
        })
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
    '$rootScope', '$state', '$stateParams', '$location', '$document', '$window', 'amMoment', 'session', function ($rootScope, $state, $stateParams, $location, $document, $window, amMoment, session) {
        FastClick.attach($document[0].body);
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.session = session;
        amMoment.changeLocale('es');
        $rootScope.app = {
            name: 'CMG',
            author: '',
            description: 'CMG Inyeccion',
            version: '1.0',
            year: ((new Date()).getFullYear()),
            isMobile: (function () {
                var check = false;
                if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test($window.navigator.userAgent.userAgent)) {
                    check = true;
                }
                ;
                return check;
            })(),
            layout: {
                isNavbarFixed: true,
                isSidebarFixed: true,
                isSidebarClosed: false,
                isFooterFixed: false,
                theme: 'theme-3',
                logo: 'assets/images/logo.png'
            }
        };
        $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
            if (!angular.isDefined($rootScope.session) || !$rootScope.session.isAuthenticated) {
                $location.url('/login/signin');
            }
        });
        $rootScope.user = {
            name: '',
            job: '',
            picture: 'app/img/user/02.jpg'
        };
    }
])
    .config(function ($breadcrumbProvider) {
    $breadcrumbProvider.setOptions({
        includeAbstract: true,
        template: '<ol class="page-breadcrumb"><li ng-repeat="step in steps" ng-class="{active: $last}" ng-switch="$last || !!step.abstract"><i class="fa fa-angle-right" data-ng-show="!$first"> </i><a ng-switch-when="false" href="{{step.ncyBreadcrumbLink}}" ng-bind-html="step.ncyBreadcrumbLabel | translate"></a><span ng-switch-when="true" ng-bind-html="step.ncyBreadcrumbLabel | translate"></span></li></ol>'
    });
})
    .config([
    'RestangularProvider', function (RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
        RestangularProvider.setRequestSuffix('.json');
    }
])
    .config([
    '$translateProvider',
    function ($translateProvider) {
        $translateProvider.useUrlLoader('api/localization/resources.json');
        $translateProvider.useSanitizeValueStrategy('sanitizeParameters');
        $translateProvider.preferredLanguage('es');
    }
])
    .config([
    'cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.includeSpinner = false;
    }
])
    .controller('AppController', ['$rootScope', '$scope', '$state', '$translate', '$log', '$localStorage', '$window', '$document', '$timeout', 'cfpLoadingBar',
    function ($rootScope, $scope, $state, $translate, $log, $localStorage, $window, $document, $timeout, cfpLoadingBar) {
        var $win = $($window);
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            cfpLoadingBar.start();
        });
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            event.targetScope.$watch('$viewContentLoaded', function () {
                cfpLoadingBar.complete();
            });
            $document.scrollTo(0, 0);
            if (angular.element('.email-reader').length) {
                angular.element('.email-reader').animate({
                    scrollTop: 0
                }, 0);
            }
            $rootScope.currTitle = $state.current.title;
        });
        $rootScope.$on('$stateNotFound', function (event, unfoundState) {
            $log.error(unfoundState.to);
            $log.error(unfoundState.toParams);
            $log.error(unfoundState.options);
        });
        $rootScope.pageTitle = function () {
            return $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
        };
        if (angular.isDefined($localStorage.layout)) {
            $scope.app.layout = $localStorage.layout;
        }
        else {
            $localStorage.layout = $scope.app.layout;
        }
        $scope.$watch('app.layout', function () {
            $localStorage.layout = $scope.app.layout;
        }, true);
        $scope.toTheTop = function () {
            $document.scrollTopAnimated(0, 600);
        };
        $scope.language = {
            listIsOpen: false,
            available: {
                'en': 'English',
                'it_IT': 'Italiano',
                'de_DE': 'Deutsch'
            },
            init: function () {
                var proposedLanguage = $translate.proposedLanguage() || $translate.use();
                var preferredLanguage = $translate.preferredLanguage();
                $scope.language.selected = $scope.language.available[(proposedLanguage || preferredLanguage)];
            },
            set: function (localeId) {
                $translate.use(localeId);
                $scope.language.selected = $scope.language.available[localeId];
                $scope.language.listIsOpen = !$scope.language.listIsOpen;
            }
        };
        $scope.language.init();
        var viewport = function () {
            var e = window, a = 'inner';
            if (!('innerWidth' in window)) {
                a = 'client';
                e = $document[0].documentElement || $document[0].body;
            }
            return {
                width: e[a + 'Width'],
                height: e[a + 'Height']
            };
        };
        $scope.getWindowDimensions = function () {
            return {
                'h': viewport().height,
                'w': viewport().width
            };
        };
        $scope.$watch($scope.getWindowDimensions, function (newValue) {
            $scope.windowHeight = newValue.h;
            $scope.windowWidth = newValue.w;
            if (newValue.w >= 992) {
                $scope.isLargeDevice = true;
            }
            else {
                $scope.isLargeDevice = false;
            }
            if (newValue.w < 992) {
                $scope.isSmallDevice = true;
            }
            else {
                $scope.isSmallDevice = false;
            }
            if (newValue.w <= 768) {
                $scope.isMobileDevice = true;
            }
            else {
                $scope.isMobileDevice = false;
            }
        }, true);
        $win.on('resize', function () {
            $scope.$apply();
        });
    }
])
    .controller('SignInController', ['$rootScope', '$scope', '$state', '$log', 'Restangular', function ($rootScope, $scope, $state, $log, Restangular) {
        $scope.images = [
            'content/img/bg/1.jpg',
            'content/img/bg/2.jpg',
            'content/img/bg/3.jpg',
            'content/img/bg/4.jpg'
        ];
        $scope.login = function () {
            Restangular.all('auth').all('credentials').post({ userName: $scope.email, password: $scope.password }).then(function () {
                $scope.session.reload(function () {
                    $state.go('app.dashboard');
                });
            });
        };
    }
])
    .controller('HeaderController', ['$scope', '$state', function ($scope, $state) {
        $scope.logOut = function () {
            $scope.session.logOut(function () { $state.go('login.signin'); });
        };
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader();
        });
    }])
    .controller('SidebarController', ['$scope', '$state', function ($scope, $state) {
        $scope.$state = $state;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initSidebar();
        });
    }])
    .controller('QuickSidebarController', ['$scope', '$timeout', function ($scope, $timeout) {
        $scope.$on('$includeContentLoaded', function () {
            $timeout(function () {
                QuickSidebar.init();
            }, 2000);
        });
    }])
    .controller('ThemePanelController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
        });
    }])
    .controller('FooterController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter();
        });
    }])
    .controller('DashboardController', ['$scope', function ($scope) {
    }]);
