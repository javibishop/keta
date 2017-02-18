interface JQuery {
    jqGrid: any;
    kendoDatePicker: any;
    kendoDateTimePicker: any;
    kendoNumericTextBox: any;
    fileinput: any;
    kendoMaskedTextBox: any;
    CKFinder: any;

    size: any;
    slimScroll: any;
    confirmation: any;
    tabdrop: any;
    fancybox: any;
    dropdownHover: any;
    tooltip: any;
    uniform: any;
    iCheck: any;
    block: any;
    blockUI: any;
    unblock: any;
    unblockUI: any;
    bootstrapSwitch: any;
}

interface JQueryStatic {
    jqGrid: any;
    cookie: any;
    fancybox: any;
    notific8: any;
    blockUI: any;
    unblockUI: any;
    uniform: any;
    jgrid: any;
}

interface IAugmentedJQuery {
    select2: any;
}

interface Window { mui: any; }

interface IGridModel {
    colNames: string[];
    colModel: Array<any>;
}

interface IHasId {
    id: number;
}

interface IUser {
    id: number;
}

interface ISession {
    //user: IUser;
    //profile: any;
    isInRole: (roleName: string) => boolean;
    logOut: (success: any, error: any) => void;
    impersonate: (id: any, name: any, rol: any, success: any, error: any) => void;
    isAdmin: () => boolean;
    reload: (success: any, error: any) => void;
}

declare var document: Document;
declare var FastClick: any;
declare var navigaror: any;
declare var jsRequires: any;
declare var Flow: any;
declare var location: Location;
declare var toastr: any;
declare var moment: any;
declare var Layout: any
declare var Metronic: any;
declare var QuickSidebar: any;

declare enum Roles { Public = 0, User = 1, Admin = 2 }

declare const enum Modules {
    System = 1,
    Payroll = 2,
    Procurement = 3,
    Sales = 4,
    Production = 5,
    Taxes = 6,
    Cost = 7
}

declare const enum StateBatch {
    Create = 0,
    PreImported = 1,
    Imported = 2,
    Deleted = 5
}