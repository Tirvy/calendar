/**
 * Created by root on 17.01.17.
 */
window.onload = function () {

    var monthNamesArray = ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July',
        'August', 'September', 'October', 'November', 'December'];
    var weekDatesArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    var theCalendarNode = document.getElementById('the_calendar');

    var curDate = new Date(Date.now());
    var curMonth = curDate.getMonth();
    var curYear = curDate.getFullYear();

    addSwipes();

    var monthYear = document.createElement('div');
    initMonthYear();

    initWeekDates();

    var datesField = theCalendarNode.appendChild(document.createElement('div'));
    drawThisMonth();

    function drawThisMonth(){
        var monthStart = new Date(curYear,curMonth + 1,1);
        var drawnDayDate = monthStart.getDay() - 6;
        console.log(drawnDayDate);
        if (drawnDayDate === -6){
            drawnDayDate = 0;
        }

        for (var i = 0; i < 6; i++){
            var drawnWeek = datesField.appendChild(document.createElement('div'));
            //drawnWeek.className = 'mainPart';
            for (var j = 0; j < 7; j++){
                var drawnDay = document.createElement('div');
                drawnDay.appendChild(document.createTextNode(drawnDayDate + ''));
                if (drawnDayDate < 0) {
                    drawnDay.className = 'enotherMonth';
                }else if (j === 6) {
                    drawnDay.className = 'thisMonthHoliday';
                }else{
                    drawnDay.className = 'thisMonth';
                }
                drawnDay.classList.add('mainPart');
                drawnDay.classList.add('date');
                drawnDayDate++;
                drawnWeek.appendChild(drawnDay);
            }
        }
    }

    function initWeekDates() {
       for (var i=0; i<weekDatesArray.length; i++) {
           var weekElem = document.createElement('div');
           weekElem.appendChild(document.createTextNode(weekDatesArray[i]));
           weekElem.className = 'weekDate';
           weekElem.classList.add('mainPart');
           theCalendarNode.appendChild(weekElem);
       }
       weekElem.classList.add('thisMonthHoliday')
    }

    function resetMonthYear(){
        monthYear.removeChild();
        monthYear.appendChild(document.createTextNode(monthNamesArray[curDate.getMonth()]
            + ' ' + curDate.getFullYear()));
    };

    function initMonthYear() {
        monthYear.appendChild(document.createTextNode(monthNamesArray[curDate.getMonth()]
            + ' ' + curDate.getFullYear()));
        monthYear.className = 'monthYear';
        theCalendarNode.appendChild(monthYear);
    };

    function addSwipes() {
        var placeHolder = document.createElement('div');
        placeHolder.appendChild(document.createTextNode('<'));
        //placeHolder.value = '<';
        placeHolder.className = 'swipeLeft';
        theCalendarNode.appendChild(placeHolder);

        placeHolder = document.createElement('div');
        placeHolder.appendChild(document.createTextNode('>'));
        //placeHolder.value = '>';
        placeHolder.className = 'swipeRight';
        theCalendarNode.appendChild(placeHolder);
    };
}