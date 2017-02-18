/// <reference path="./typings/angularjs/angular.d.ts"/>

angular.module('app.core', [])
    .constant('APP_MEDIAQUERY', {
    'desktopXL': 1200,
    'desktop': 992,
    'tablet': 768,
    'mobile': 480
});

var jsRequires: any = {
    //*** Scripts
    scripts: {
        'login-soft': 'content/css/login-soft.css',

        //*** Javascript Plugins
        'modernizr': ['vendor/modernizr/modernizr.js'],
        'spin': 'vendor/ladda/spin.min.js',

        //*** jQuery Plugins
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
        'kendoweb' : {files: ['Content/lib/kendoui/kendo.web.min.js']},

        //*** Filters
        'htmlToPlaintext': 'assets/js/filters/htmlToPlaintext.js'
    },
    //*** angularJS Modules
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

function loadSequence(...args: string[]) {
    return {
        deps: ['$ocLazyLoad', '$q',
            ($ocLL, $q) => {
                var promise = $q.when(1);
                for (var i = 0, len = args.length; i < len; i++) {
                    promise = promiseThen(args[i]);
                }
                return promise;

                function promiseThen(arg) {
                    if (typeof arg == 'function')
                        return promise.then(arg);
                    else
                        return promise.then(() => {
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
