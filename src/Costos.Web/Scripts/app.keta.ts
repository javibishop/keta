/// <reference path="./typings/jquery/jquery.d.ts"/>
/// <reference path="./typings/lodash/lodash.d.ts"/>
/// <reference path="./typings/angularjs/angular.d.ts"/>
/// <reference path="./typings/lib.d.ts"/>

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
    .config(['$stateProvider', ($stateProvider) => {
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
        })
        ;
}
])
    .controller('KetaMarcasListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.keta.marcanew');
        }
    }])
    .controller('KetaMarcaEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.marcaId;

        function load() {
            if (id) {
                Restangular.one('servicios').one('marcas', id).get().then(result => {
                    $scope.marca = result;
                });
            }
        }

        $scope.save = () => {
            if (id) {
                $scope.marca.put().then(() => { $state.go('app.keta.marcas'); });
            }
            else {
                var datos = $scope.marca;
                Restangular.service('servicios/marcas').post(datos).then(() => { $state.go('app.keta.marcas'); });
            }
        }

        load();
    }
    ])

    .controller('KetaClientesListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.keta.clientenew');
        }
    }])
    .controller('KetaClienteEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.clienteId;

        function load() {
            if (id) {
                Restangular.one('servicios').one('clientes', id).get().then(result => {
                    $scope.cliente = result;
                });
            }
        }

        $scope.save = () => {
            if (id) {
                $scope.cliente.put().then(() => { $state.go('app.keta.clientes'); });
            }
            else {
                var datos = $scope.cliente;
                Restangular.service('servicios/clientes').post(datos).then(() => { $state.go('app.keta.clientes'); });
            }
        }

        load();
    }
    ])

    .controller('KetaMovilAtencionesListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.keta.movilatencionnew');
        }
    }])
    .controller('KetaMovilAtencionEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.movilatencionId;

        function load() {
            if (id) {
                Restangular.one('servicios').one('movilatenciones', id).get().then(result => {
                    result.fecha = new Date(result.fecha);
                    $scope.movilatencion = result;
                });
            }
        }

        $scope.save = () => {
            var fecha = moment($scope.movilatencion.fecha).format('YYYY-MM-DD');
            $scope.movilatencion.fecha = fecha;

            if (id) {
                $scope.movilatencion.put().then(() => { $state.go('app.keta.movilatenciones'); });
            }
            else {
                var datos = $scope.movilatencion;
                Restangular.service('servicios/movilatenciones').post(datos).then(() => { $state.go('app.keta.movilatenciones'); });
            }
        }

        load();
    }
    ])


    .directive('ketaMarcasGrid', ($state, Restangular) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                var colModel: Array<any> = [
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: () => { return '<i class="fa fa-caret-right hand"></i>'; }
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    onCellSelect(rowId, iCol, cellcontent, e) {
                        if (iCol === 0) {
                            var stateName = 'app.keta.marcaedit';
                            $state.go(stateName, { marcaId: rowId });
                            return false;
                        }
                    },
                    beforeSelectRow(rowid, e) {
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

    .directive('ketaMarcaLookup', ['$location', $location => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione una Marca',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/marcas/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, data => {
                                    callback({ id: data.id, text: data.codigo });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/marcas/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: (term, page) => {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: (data, page) => {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };

                element.bind('change', () => {
                    scope.$apply(() => {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });

                attr.$observe('disabled', value => {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])

    .directive('ketaClientesGrid', ($state, Restangular) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                var colModel: Array<any> = [
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: () => { return '<i class="fa fa-caret-right hand"></i>'; }
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    onCellSelect(rowId, iCol, cellcontent, e) {
                        if (iCol === 0) {
                            var stateName = 'app.keta.clienteedit';
                            $state.go(stateName, { clienteId: rowId });
                            return false;
                        }
                    },
                    beforeSelectRow(rowid, e) {
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

    .directive('ketaClienteLookup', ['$location', $location => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione una Cliente',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/clientes/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, data => {
                                    callback({ id: data.id, text: data.nombreCompleto });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/clientes/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: (term, page) => {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: (data, page) => {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };

                element.bind('change', () => {
                    scope.$apply(() => {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });

                attr.$observe('disabled', value => {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])


    .directive('ketaMovilAtencionesGrid', ($state, Restangular) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                var colModel: Array<any> = [
                    {
                        name: 'editCommand',
                        index: 'editCommand',
                        width: 25,
                        align: 'center',
                        fixed: true,
                        sortable: false,
                        search: false,
                        formatter: () => { return '<i class="fa fa-caret-right hand"></i>'; }
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    onCellSelect(rowId, iCol, cellcontent, e) {
                        if (iCol === 0) {
                            var stateName = 'app.keta.movilatencionedit';
                            $state.go(stateName, { movilatencionId: rowId });
                            return false;
                        }
                    },
                    beforeSelectRow(rowid, e) {
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

    .directive('ketaMovilAtencionLookup', ['$location', $location => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione una Movil',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            if (ctrl.$modelValue) {
                                var url = '/api/servicios/movilatenciones/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, data => {
                                    callback({ id: data.id, text: data.codigo });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/servicios/movilatenciones/lookup?format=json',
                            dataType: 'json',
                            quietMillis: 100,
                            data: (term, page) => {
                                return {
                                    q: term,
                                    pageSize: 15,
                                    page: page
                                };
                            },
                            results: (data, page) => {
                                var more = (page * 10) < data.total;
                                return { results: data.data, more: more };
                            }
                        }
                    });
                };

                element.bind('change', () => {
                    scope.$apply(() => {
                        var data = element.select2('data');
                        ctrl.$setViewValue(data ? data.id : null);
                    });
                });

                attr.$observe('disabled', value => {
                    element.select2(value && 'disable' || 'enable');
                });
            }
        };
    }])

    ;