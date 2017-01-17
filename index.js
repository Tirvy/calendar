/**
 * Created by root on 17.01.17.
 */
window.onload = function () {

    var monthNamesArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    var weekDatesArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    var theCalendarNode = document.getElementById('the_calendar');
    theCalendarNode.className = 'wholeCalendar';

    var monthChooser = document.createElement('div');

    var curDate = new Date(Date.now());
    var curMonth = curDate.getMonth();
    var curYear = curDate.getFullYear();
    var monthYear = document.createElement('div');
    var calendarDaysTable = document.createElement('div');

    addSwipes();

    initMonthYear();
    initMonthList();

    theCalendarNode.appendChild(calendarDaysTable);

    initWeekDates();

    var datesField = calendarDaysTable.appendChild(document.createElement('div'));
    drawThisMonth();

    function drawThisMonth() {
        var tempDate = new Date(curYear, curMonth, 1);
        var drawnDayDate = -((tempDate.getDay() + 6) % 7);
        console.log(drawnDayDate);

        tempDate.setMonth(curMonth + 1);
        tempDate.setDate(0);
        var thisMaxDate = tempDate.getDate();

        tempDate.setMonth(curMonth);
        tempDate.setDate(0);
        var prevMaxDate = tempDate.getDate();

        for (var i = 0; i < 6; i++) {
            var drawnWeek = datesField.appendChild(document.createElement('div'));
            for (var j = 0; j < 7; j++) {
                var drawnDay = document.createElement('div');
                if (drawnDayDate < 0) {
                    drawnDay.appendChild(document.createTextNode(prevMaxDate + drawnDayDate + 1 + ''));
                    drawnDay.className = 'enotherMonth';
                } else if ((drawnDayDate >= thisMaxDate) && (j === 6)) {
                    drawnDay.appendChild(document.createTextNode(drawnDayDate - thisMaxDate + 1 + ''));
                    drawnDay.className = 'enotherMonthHoliday';
                } else if (drawnDayDate >= thisMaxDate) {
                    drawnDay.appendChild(document.createTextNode(drawnDayDate - thisMaxDate + 1 + ''));
                    drawnDay.className = 'enotherMonth';
                } else if (j === 6) {
                    drawnDay.appendChild(document.createTextNode(drawnDayDate + 1 + ''));
                    drawnDay.className = 'thisMonthHoliday';
                } else {
                    drawnDay.appendChild(document.createTextNode(drawnDayDate + 1 + ''));
                    drawnDay.className = 'thisMonth';
                }

                drawnDay.classList.add('mainPart');
                drawnDay.classList.add('date');
                drawnDayDate++;
                drawnWeek.appendChild(drawnDay);
            }
            if (drawnDayDate >= thisMaxDate) {
                break;
            }
        }
    }

    function initWeekDates() {
        for (var i = 0; i < weekDatesArray.length; i++) {
            var weekElem = document.createElement('div');
            weekElem.appendChild(document.createTextNode(weekDatesArray[i]));
            weekElem.className = 'weekDate';
            weekElem.classList.add('mainPart');
            calendarDaysTable.appendChild(weekElem);
        }
        weekElem.classList.add('thisMonthHoliday')
    }

    function resetMonthYear() {
        curMonth = curDate.getMonth();
        curYear = curDate.getFullYear();
        drawThisMonth();
        monthYear.removeChild(monthYear.firstChild);
        setMonthYear();
    }

    function initMonthYear() {
        setMonthYear();

        theCalendarNode.appendChild(monthYear);
    }

    function setMonthYear() {
        var monthYearText = document.createElement('div');
        if (calendarDaysTable.className == 'hiddenField') {
            monthYearText.appendChild(document.createTextNode('' + curDate.getFullYear()));
        } else {
            monthYearText.appendChild(document.createTextNode(monthNamesArray[curDate.getMonth()]
                + ' ' + curDate.getFullYear()));
        }
        monthYearText.className = 'monthYearText';
        monthYearText.onclick = showMonthList;

        monthYear.appendChild(monthYearText);
        monthYear.className = 'monthYear';
    }

    // MONTH LIST

    function showMonthList() {
        monthChooser.className = 'unhiddenField';

        calendarDaysTable.className = 'hiddenField';
    }

    function hideMonthList() {
        monthChooser.className = 'hiddenField';

        calendarDaysTable.className = '';
    }

    function initMonthList() {
        theCalendarNode.appendChild(monthChooser);
        monthChooser.className = 'hiddenField';
        for (var i = 0; i < monthNamesArray.length; i++) {
            var monthElem = document.createElement('div');
            monthElem.appendChild(document.createTextNode(monthNamesArray[i]));
            monthElem.className = 'monthChoosing';
            monthElem.onclick = monthChosen;
            monthChooser.appendChild(monthElem);
        }
    }

    function monthChosen(elem) {
        console.log(elem.target.innerHTML);
        var monthNum = monthNamesArray.indexOf(elem.target.innerHTML);
        curDate.setMonth(monthNum);
        hideMonthList();
        resetMonthYear();
        clearMonth();
        drawThisMonth();
    }

    //END MONTH LIST

    function addSwipes() {
        var placeHolder = document.createElement('div');
        placeHolder.className = 'swipeLeft';
        placeHolder.onclick = monthBack;
        theCalendarNode.appendChild(placeHolder);

        placeHolder = document.createElement('div');
        placeHolder.className = 'swipeRight';
        placeHolder.onclick = monthForward;
        theCalendarNode.appendChild(placeHolder);
    }

    function monthForward() {
        if (calendarDaysTable.className == 'hiddenField') {
            curDate.setFullYear(curDate.getFullYear() + 1);
        } else {
            curDate.setMonth(curDate.getMonth() + 1);
        }
        resetMonthYear();
        clearMonth();
        drawThisMonth();
    }

    function monthBack() {
        if (calendarDaysTable.className == 'hiddenField') {
            curDate.setFullYear(curDate.getFullYear() - 1);
        } else {
            curDate.setMonth(curDate.getMonth() - 1);
        }
        resetMonthYear();
        clearMonth();
        drawThisMonth();
    }

    function clearMonth() {
        while (datesField.hasChildNodes()) {
            datesField.removeChild(datesField.firstChild);
        }
    }
};