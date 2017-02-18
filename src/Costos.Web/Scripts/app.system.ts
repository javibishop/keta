/// <reference path="./typings/jquery/jquery.d.ts"/>
/// <reference path="./typings/lodash/lodash.d.ts"/>
/// <reference path="./typings/angularjs/angular.d.ts"/>
/// <reference path="./typings/lib.d.ts"/>

angular.module('app.system', [])
    .config(['$stateProvider', $stateProvider => {
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
            })
        ;
    }
    ])

    .controller('SystemCompanyImportListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.system.companyimportnew');
        }

        $scope.app.title = $translate.instant('system.companyimports');
    }
    ])
    .controller('SystemCompanyImportEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.companyImportId;

        function load() {
            if (id) {
                Restangular.one('system').one('companyimports', id).get().then(result => {
                    $scope.companyimport = result;
                });
            }
        }

        $scope.save = () => {
            if (id) {
                $scope.companyimport.save().then(() => { $state.go('app.system.companyimports'); });
            }
            else {
                //si el email tiene formato incorrecto viene en null!.
                var datos = $scope.companyimport;
                Restangular.service('system/companyimports').post(datos).then(() => { $state.go('app.system.companyimports'); });
            }
        }

        load();
    }
    ])

    .controller('SystemTenantsListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.system.tenantnew');
        }

        $scope.app.title = $translate.instant('system.tenants');
    }
    ])
    .controller('SystemTenantEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.tenantId;

        function load() {
            if (id) {
                Restangular.one('system').one('tenants', id).get().then(result => {
                    $scope.tenant = result;
                });
            }

            Restangular.one('system').all('users').getList().then(result => {
                $scope.users = result;
            });

        }

        $scope.save = () => {
            if (id) {
                $scope.tenant.save().then(() => { $state.go('app.system.tenants'); });
            }
            else {
                //si el email tiene formato incorrecto viene en null!.
                var datos = $scope.tenant;
                Restangular.service('system/tenants').post(datos).then(() => { $state.go('app.system.tenants'); });
            }
        }

        load();
    }
    ])

    .controller('SystemModulesListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.system.modulenew');
        }

        $scope.app.title = $translate.instant('system.modules');
    }
    ])
    .controller('SystemModuleEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.moduleId;

        function load() {
            if (id) {
                Restangular.one('system').one('modules', id).get().then(result => {
                    $scope.module = result;
                });
            }
        }

        $scope.save = () => {
            if (id) {
                $scope.module.put().then(() => { $state.go('app.system.modules'); });
            }
            else {
                var datos = $scope.module;
                Restangular.service('system/modules').post(datos).then(() => { $state.go('app.system.modules'); });
            }
        }

        load();
    }
    ])

    .directive('systemCompanyImportsGrid', ($state, $log, $filter, Restangular) => {

        return {
            restrict: 'AEC',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
                var gridElementName = 'systemCompanyImportsGrid';
                var pagerElementName = gridElementName + 'Pager';
                var gridElement = angular.element('<table></table>');
                gridElement.attr('id', gridElementName);
                var pagerElement = angular.element('<div></div>');
                pagerElement.attr('id', pagerElementName);
                element.append(gridElement);
                element.append(pagerElement);

                scope.height = scope.height || 450;

                var colNames = ['','', 'Compania', 'Nomina', 'Compras', 'Ventas', 'Produccion','Impuestos'];
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
                    { name: 'id', index: 'id', hidden: true, editable: false },
                    { name: 'companyName', index: 'companyName', search: false, width: 150, fixed: true },
                    { name: 'nomina', index: 'nomina', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No' } },
                    { name: 'compras', index: 'compras', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No' } },
                    { name: 'ventas', index: 'ventas', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No' } },
                    { name: 'produccion', index: 'produccion', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No' } },
                    { name: 'impuestos', index: 'impuestos', width: 80, fixed: true, search: false, formatter: function (value) { return value ? 'Sí' : 'No' } }
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
                        page: obj => {
                            var page = (obj.offset / 100) + 1;
                            return page;
                        },
                        total: obj => {
                            var total = (obj.total <= 100) ? 1 : (((obj.total / 100) >> 0) + (obj.total % 100 > 0 ? 1 : 0));
                            return total;
                        },
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
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

                scope.$on('refresh', () => {
                    $log.info('refresh');
                    gridElement.trigger('reloadGrid');
                });
            }
        }
    })

    .directive('systemTenantsGrid', ($state) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
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

    .controller('SystemRolesListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.system.rolenew');
        }

        $scope.app.title = $translate.instant('system.roles');
    }
    ])
    .controller('SystemRoleEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.roleId;

        function load() {
            if (id) {
                Restangular.one('system').one('role', id).get().then(result => {
                    $scope.role = result;
                });
            }
        }

        $scope.save = () => {
            if (id) {
                $scope.role.save().then(() => { $state.go('app.system.roles'); });
            }
            else {
                //si el email tiene formato incorrecto viene en null!.
                var datos = $scope.role;
                Restangular.service('system/role').post(datos).then(() => { $state.go('app.system.roles'); });
            }
        }

        load();
    }
    ])
    .directive('systemRolesGrid', ($state) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
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
    .directive('systemTenantLookup', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    var model = scope.$eval(attr.ngModel);
                    if (model) {
                        element.val(model);
                    }

                    element.select2({
                        placeholder: 'Seleccione un tenant',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            var url = '/api/system/tenants/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, data => {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/tenants/lookup?format=json',
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
    .controller('SystemUsersListController', ['$scope', '$state', '$translate', ($scope, $state, $translate) => {
        $scope.params = {
            selectedItems: []
        };

        $scope.new = () => {
            $state.go('app.system.usernew');
        }

        $scope.app.title = $translate.instant('system.users');
    }
    ])
    .controller('SystemUserEditController', ['$scope', '$translate', '$state', '$stateParams', 'Restangular', ($scope, $translate, $state, $stateParams, Restangular) => {

        var id = $stateParams.userId;

        function load() {
            if (id) {
                Restangular.one('system').one('users', id).get().then(result => {
                    $scope.user = result;
                    $scope.app.title = $translate.instant('system.user.edit') + ': ' + $scope.user.lastName + ', ' + $scope.user.firstName;
                });
            }
        }

        load();

        $scope.save = () => {
            if (id) {
                $scope.user.put().then(() => { $state.go('app.system.users'); });
            }
            else {
                var datos = $scope.user;
                Restangular.service('system/users').post(datos).then(() => { $state.go('app.system.users'); });
            }
        }
    }
    ])
    .directive('systemUsersGrid', ($state, $document) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
                var gridElementName = 'systemUsersGrid';
                var pagerElementName = gridElementName + 'Pager';
                var gridElement: any = angular.element('<table></table>');
                gridElement.attr('id', gridElementName);
                var pagerElement: any = angular.element('<div></div>');
                pagerElement.attr('id', pagerElementName);
                element.append(gridElement);
                element.append(pagerElement);

                scope.height = scope.height || 450;

                var colNames = ['', 'Nombre', 'Apellido', 'Usuario', 'Email'];
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
                    { name: 'firstName', index: 'firstName', search: true, width: 200, fixed: true  },
                    { name: 'lastName', index: 'lastName', search: true, width: 200, fixed: true  },
                    { name: 'userName', index: 'userName', search: true, width: 200, fixed: true  },
                    { name: 'email', index: 'email', search: true, width: 200, fixed: true  }
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
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
    .directive('systemUserLookup', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione un usuario',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, data => {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/lookup?format=json',
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
    .filter('systemBatchState', () => input => {
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
    })
    .directive('systemBatchesGrid', ($state, $log, $filter, Restangular, dialogs, toaster, alertify, BlockUi, UnBlockUi) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=', moduleId: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                };

                if (parseInt(scope.moduleId) == Modules.Payroll) {
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
                if (scope.moduleId === Modules.Procurement) {
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
                        page: obj => {
                            var page = (obj.offset / 100) + 1;
                            return page;
                        },
                        total: obj => {
                            var total = (obj.total <= 100) ? 1 : (((obj.total / 100) >> 0) + (obj.total % 100 > 0 ? 1 : 0));
                            return total;
                        },
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
                        if (iCol === 0) {
                            switch (parseInt(scope.moduleId)) {
                                case Modules.Payroll:
                                    $state.go('app.payroll.resourcebatchedit', { batchId: rowId });
                                    break;
                                case Modules.Procurement:
                                    $state.go('app.procurement.resourcebatchedit', { batchId: rowId });
                                    break;
                                case Modules.Sales:
                                    $state.go('app.sale.saleimportedit', { batchId: rowId });
                                    break;
                                    case Modules.Production:
                                    $state.go('app.production.productionimportedit', { batchId: rowId });
                                    break;
                            }
                        }
                        if (iCol === 1) {
                            switch (parseInt(scope.moduleId)) {
                                case Modules.Payroll:
                                case Modules.Procurement:
                                    var batch = gridElement.jqGrid('getRowData', rowId);
                                    var data = { moduleId: scope.moduleId , batchId: rowId};
                                    if (batch.state === 'Pre-importado') {
                                        alertify.confirm("Desea eliminar el registro?.", function (e) {
                                            if (e) {

                                                Restangular.service('system/batches/delete').post(data).then(() => {
                                                    $state.reload();
                                                });

                                                //Restangular.one('system').one('batches').post(data, 'delete').then(result => {
                                                //    $state.go('app.payroll.resourcebatches');
                                                //});
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
                                //case Modules.Procurement:
                                //    var dlg = dialogs.wait(undefined, undefined, 50);
                                //    Restangular.one("system").one('batches', rowId).post('distribute').then(result => {
                                //        if (result) {
                                //            dlg.close();
                                //        }
                                //    });
                                //    break;
                            }
                        }
                        if (parseInt(scope.moduleId) == Modules.Payroll && iCol === 2) {
                            switch (parseInt(scope.moduleId)) {
                                case Modules.Payroll:
                                    var batch = gridElement.jqGrid('getRowData', rowId);
                                    var data = { moduleId: scope.moduleId, batchId: rowId };
                                    if (batch.state === 'Pre-importado') {
                                        alertify.confirm("Desea importar el lote?.", function (e) {
                                            if (e) {
                                                BlockUi('Importando Lotes de Mano de Obra. Esto puede demorar varios minutos. Esta pantalla desaparecerá cuando termine el proceso.');        
                                                Restangular.one('system').one('batches', rowId).post('import').then(result => {
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

                scope.$on('refresh', () => {
                    $log.info('refresh');
                    gridElement.trigger('reloadGrid');
                });
            }
        };
    })
    .directive('systemModulesGrid', ($state) => {
        return {
            restrict: 'A',
            scope: { height: '@', selectedItems: '=' },
            link(scope: any, element, attrs, ctrl) {
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
                        page: obj => ((obj.offset / 100) + 1),
                        total: obj => ((obj.total / 100) + (obj.total % 100 > 0 ? 1 : 0)),
                        records: 'total',
                        repeatitems: false,
                        root: 'results'
                    },
                    beforeRequest: () => {
                        var currentPage = gridElement.jqGrid('getGridParam', 'page');
                        gridElement.jqGrid('setGridParam', { postData: { skip: (currentPage - 1) * 100, take: 100 } });
                    },
                    beforeSelectRow() {
                        return false;
                    },
                    onCellSelect(rowId, iCol) {
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

    .directive('systemModuleLookup', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione el Origen del Gasto',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            var url = '/api/system/modules/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, data => {
                                callback({ id: data.id, text: data.name });
                            });
                        },
                        ajax: {
                            url: '/api/system/modules/lookup?format=json',
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

    .directive('systemUsersLookup', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione el Usuario',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, data => {
                                callback({ id: data.id, text: data.userName });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/lookup?format=json',
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

    .directive('systemUsersProcuradorLookup', [() => {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: (scope, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione el Procurador',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            var url = '/api/system/users/' + ctrl.$modelValue;
                            $.getJSON(url, { format: 'json' }, data => {
                                callback({ id: data.id, text: data.userName });
                            });
                        },
                        ajax: {
                            url: '/api/system/users/procurador/lookup?format=json',
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

    .directive('systemCompanyLookupByModule', ['$location', $location => {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: { moduleId: '=' },
            link: (scope: any, element, attr: any, ctrl) => {
                if (!ctrl) return;

                var required = attr.required ? attr.required : false;
                ctrl.$render = () => {
                    element.val(scope.$eval(attr.ngModel));

                    element.select2({
                        placeholder: 'Seleccione una empresa',
                        allowClear: !required,
                        initSelection: (element1, callback) => {
                            if (ctrl.$modelValue) {
                                var url = '/api/organization/companies/' + ctrl.$modelValue;
                                $.getJSON(url, { format: 'json' }, data => {
                                    callback({ id: data.id, text: data.name });
                                });
                            }
                        },
                        ajax: {
                            url: '/api/system/companyimports/' + scope.moduleId + '/lookup?format=json',
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
