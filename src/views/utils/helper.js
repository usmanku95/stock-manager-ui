import moment from 'moment'
export const rolesarray = (arr) => {

    var emptystring = '';
    for (let index = 0; index <= arr.length - 1; index++) {
        emptystring += arr[index] + ',';
    }
    emptystring = emptystring.replace(/,\s*$/, "");
    return emptystring;
}
///////////////////////////AlterModal////////////////////////////////
export const multiRolesInput = (arr) => {

    var newArray = [];
    arr.map((element, index) => {
        newArray.push({ value: element, label: element });
    });
    return newArray;
}

export const labeledArray = (arr) => {
    var newArray = [];
    arr.map((element, index) => {
        newArray.push({ value: element.name, label: element.name });
    });
    return newArray;

}
///////////////////////////UserModal////////////////////////////////
export const PrivelegesArray = (arr) => {
    var newArray = [];
    arr.map((element, index) => {
        newArray.push({ value: element._id, label: element.name });
    });

    return newArray;

}
export const rolesInput = (obj) => {
    let newobj = {
        value: obj._id,
        label: obj.name
    }
    return newobj;

}
///////////////////////////RiderModal////////////////////////////////
export const Licensed = (arr) => {
    var newArray = [];
    arr.map((element, index) => {
        newArray.push({ value: element._id, label: element.name });
    });

    return newArray;

}
export const licenseInput = (obj) => {    
    let newobj = {
        value: 'obj',
        label: 'obj'
    }
    if (obj == true) {
        newobj.value = true
        newobj.label = 'Yes'
    }
    else {
        newobj.value = false
        newobj.label = 'No'
    }
    return newobj;

}
export const PartnerTypeInput = (obj) => {    
    let newobj = {
        value: 'obj',
        label: 'obj'
    } 
        newobj.value = obj
        newobj.label = obj     
    return newobj;
}
///////////////////////////DATE Component////////////////////////////////
export const get24hours = (date) => {
    return { from: moment(date).subtract(24, "h"), to: moment(date) }
}
export const formatDate = (date, format) => {
    return moment(new Date(date)).format(format ? format : "MMM Do YY, h:mm a");
}
export const dateFormats = {
    f1: "MMM Do, YY"//Do MMM, YYYY"
}
function GetLastWeekStart() {
    var today = moment();
    var daystoLastSunday = 0 - (1 - today.isoWeekday()) + 8;

    var lastSunday = today.subtract('days', daystoLastSunday);

    return lastSunday;
}


function GetLastWeekEnd() {
    var lastSunday = GetLastWeekStart();
    var lastSaturday = lastSunday.add('days', 6);

    return lastSaturday;
}
export function getThisMonthFilter() {
    var result = [];
    var startDate = new Date();
    var endDate = new Date();
    if (startDate.getDate() > 25) {
        startDate.setDate(26);
    }
    else {
        startDate.setMonth(startDate.getMonth() - 1);
        startDate.setDate(26);
    }
    if (startDate.getMonth() == 11) {
        endDate.setMonth(0);
        endDate.setFullYear(startDate.getFullYear() + 1);
    }
    else {
        endDate.setMonth(startDate.getMonth() + 1);
    }

    endDate.setDate(25)

    result[0] = startDate.setHours(0, 0);
    // result[1] = new Date();
    result[1] = endDate.setHours(23, 59);
    result[2] = endDate.setHours(23, 59);

    return result;
}
export function getLastMonthFilter() {
    var result = getThisMonthFilter();
    var startDate = new Date(result[0]);
    var endDate = new Date(result[2]);
    startDate.setMonth(startDate.getMonth() - 1);
    endDate.setMonth(endDate.getMonth() - 1);
    endDate.setDate(25)
    result[0] = startDate.setHours(0, 0);
    result[1] = endDate.setHours(23, 59);
    result[2] = endDate.setHours(23, 59);
    return result;
}
function compareDate(d1, d2) {
    return formatDate(d1, dateFormats.f1) == formatDate(d2, dateFormats.f1)
}
function isLastWeek(startDate, endDate) {
    return compareDate(startDate, GetLastWeekStart()) && compareDate(endDate, GetLastWeekEnd())
}
function isThisMonth(startDate, endDate) {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    firstDay = moment(firstDay)
    lastDay = moment(lastDay)
    return compareDate(startDate, firstDay) && compareDate(endDate, lastDay)

}
 
function isLastMonth(startDate, endDate) {
    let lastMonthStartDate = moment().subtract(1, 'months').startOf('month')
    let lastMonthEndDate = moment().subtract(1, 'months').endOf('month')
    return compareDate(startDate, lastMonthStartDate) && compareDate(endDate, lastMonthEndDate)
}
export const formatDateTimeRange = (startDate, endDate) => {
    startDate = moment(startDate);
    endDate = moment(endDate);
    let dayDifferenceCurrentDate = moment().diff(startDate, 'days');
    let dayDiffernce = endDate.diff(startDate, 'days');
    // let hourDifferenceCurrentDate = moment().diff(startDate, 'hours');
    // let hourDiffernce = moment().diff(endDate, 'hours');
    //var mins = moment.utc(moment(endDate, "HH:mm:ss").diff(moment(startDate, "HH:mm:ss"))).format("HH:mm")
    var ms = Math.abs(moment(startDate, "DD/MM/YYYY HH:mm:ss").diff(moment(endDate, "DD/MM/YYYY HH:mm:ss")));
    var d = moment.duration(ms);
    var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm");





    if (isLastWeek(startDate, endDate)) {
        return 'Last Week';
    }
    if (isThisMonth(startDate, endDate)) {
        return 'This Month';
    }
    if (isLastMonth(startDate, endDate)) {
        return 'Last Month';
    }

    if (dayDiffernce == 6 && startDate.weekday() == 0 && endDate.weekday() == 6 && moment().isBetween(startDate, endDate)) {
        return "This Week";
    }
    if (dayDifferenceCurrentDate == 1 && dayDiffernce == 1 && parseFloat(s) <= 24.00) {
        return s + ' Hours';
    }
    switch (dayDifferenceCurrentDate) {
        case 0: return "Today"
        case 1: return "Yesterday"
        case 3: return "Last 3 Days"
        case 7: return "Last 7 Days"
        case 30: return "Last 30 Days"
        default: {

            return `${formatDate(startDate, dateFormats.f1)} - ${formatDate(endDate, dateFormats.f1)}`
        }
    }
}