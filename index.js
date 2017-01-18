/**
 * Created by root on 17.01.17.
 */

window.onload = function () {

    theCalendarNode = document.getElementById('the_calendar');
    theCalendarNode.className = 'wholeCalendar';

    monthChooser = document.createElement('div');
    curDate = new Date(Date.now());
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    monthYear = document.createElement('div');
    calendarDaysTable = document.createElement('div');
    taskManager = document.getElementById('task_manager');
    taskStored = [];

    window.addEventListener('click', bodyClick);


    addSwipes();

    initMonthYear();
    initMonthList();
    initTaskManager();
    initWeekDates();
    theCalendarNode.appendChild(calendarDaysTable);
    datesField = calendarDaysTable.appendChild(document.createElement('div'));


    drawThisMonth();

    function drawThisMonth() {
        var tempDate = new Date(curYear, curMonth, 1);
        var drawnDayDate = -((tempDate.getDay() + 6) % 7);

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
                } else{
                    if (j === 6) {
                        drawnDay.appendChild(document.createTextNode(drawnDayDate + 1 + ''));
                        drawnDay.className = 'thisMonthHoliday';
                        drawnDay.classList.add('thisMonth');

                    } else {
                        drawnDay.appendChild(document.createTextNode(drawnDayDate + 1 + ''));
                        drawnDay.className = 'thisMonth';
                    }

                    drawnDay.onclick = showTaskKeeper;
                    drawnDay.setAttribute("day",drawnDayDate);

                    if (countDaysTasks(curYear,curMonth,drawnDayDate) > 0){
                        var taskNumber = document.createElement('div');
                        taskNumber.className = 'tasksNumber';
                        taskNumber.appendChild(document.createTextNode('' + countDaysTasks(curYear,curMonth,drawnDayDate)));
                        drawnDay.appendChild(taskNumber);
                    }
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
        resetMonthYear();
    }

    function hideMonthList() {
        monthChooser.className = 'hiddenField';

        calendarDaysTable.className = '';
    }

    function initMonthList() {
        while (monthChooser.firstChild) {
            monthChooser.removeChild(monthChooser.firstChild);
        }
        theCalendarNode.appendChild(monthChooser);
        monthChooser.className = 'hiddenField';
        for (var i = 0; i < monthNamesArray.length; i++) {
            var monthElem = document.createElement('div');
            monthElem.appendChild(document.createTextNode(monthNamesArray[i]));
            monthElem.className = 'monthChoosing';
            monthElem.onclick = monthChosen;
            monthElem.setAttribute('monthNumber', i)
            monthChooser.appendChild(monthElem);


            if (countDaysTasks(curYear,i) === 0){
                continue;
            }
            var taskNumber = document.createElement('div');
            taskNumber.className = 'tasksNumber';
            taskNumber.appendChild(document.createTextNode('' + countDaysTasks(curYear,i)));
            monthElem.appendChild(taskNumber);
        }
    }

    function monthChosen(elem) {
        var monthNum = elem.target.getAttribute('monthNumber');
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
        placeHolder.onclick = monthForwardBack;
        theCalendarNode.appendChild(placeHolder);

        placeHolder = document.createElement('div');
        placeHolder.className = 'swipeRight';
        placeHolder.onclick = monthForwardBack;
        theCalendarNode.appendChild(placeHolder);
    }

    function monthForwardBack(elem) {
        var shift;
        if (elem.target.className === "swipeRight"){
            shift = 1;
        }else{
            shift = -1;
        }
        if (calendarDaysTable.className == 'hiddenField') {
            curDate.setFullYear(curDate.getFullYear() + shift);
        } else {
            curDate.setMonth(curDate.getMonth() + shift);
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

    function bodyClick(elem) {
        if (!(elem.target.hasAttribute('day'))
            &&((!elem.target.parentNode)||(!elem.target.parentNode.hasAttribute('day')))
            &&(taskManager.className.indexOf('taskManager') >= 0)){
            hideTaskManager();
        }
    }

    function initTaskManager(){
        taskManager.className = 'hiddenField';
        var tempDiv = document.createElement('div');
        tempDiv.appendChild(document.createTextNode('ToDo list:'));
        taskManager.appendChild(tempDiv);

        taskList = document.createElement('ol');
        taskList.className = 'taskList';
        taskManager.appendChild(taskList);

        taskText = document.createElement('input');
        taskManager.appendChild(taskText);

        taskButton = document.createElement('button');
        taskButton.appendChild(document.createTextNode('Add Task'));
        taskButton.style.flow = 'right';
        taskButton.onclick = addTaskToStore;
        taskManager.appendChild(taskButton);
    }

    function showTaskKeeper(elem) {
        taskManager.className = 'taskManager';
        if (elem.target.offsetLeft + elem.target.offsetWidth + taskManager.offsetWidth <
            theCalendarNode.offsetLeft + theCalendarNode.offsetWidth) {
            taskManager.style.left = (elem.target.offsetLeft + elem.target.offsetWidth) + 'px';
            taskManager.classList.add('taskManagerL');
        }else{
            taskManager.style.left = (elem.target.offsetLeft - taskManager.offsetWidth) + 'px';
            taskManager.classList.add('taskManagerR');
        }
        taskManager.style.top = elem.target.offsetTop + 'px';
        taskManager.setAttribute('day',elem.target.getAttribute('day'));
        loadDaysTasks();
    }

    function hideTaskManager(){
        taskManager.className = 'hiddenField';
    }

    function addTaskToStore() {
        var task = [];
        task.push(taskText.value);
        task.push(curYear);
        task.push(curMonth);
        task.push(taskManager.getAttribute('day'));

        taskStored.push(task);
        taskText.value = '';
        loadDaysTasks();
        clearMonth();
        drawThisMonth();
        initMonthList();
    }

    function loadDaysTasks() {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
        for (var i = 0; i < taskStored.length; i++){
            if ((taskStored[i][1] == curYear)&&
                (taskStored[i][2] == curMonth)&&
                (taskStored[i][3] == taskManager.getAttribute('day'))){
                var tempDiv = document.createElement('li');
                tempDiv.appendChild(document.createTextNode(taskStored[i][0]));
                taskList.appendChild(tempDiv);
            }
        }
    }

    function countDaysTasks(year,month,day) {
        var result = 0;
        if (day >= 0) {
            for (var i = 0; i < taskStored.length; i++) {
                if ((taskStored[i][1] == year) &&
                    (taskStored[i][2] == month) &&
                    (taskStored[i][3] == day)) {
                    result ++;
                }
            }
        }else{
            for (var i = 0; i < taskStored.length; i++) {
                if ((taskStored[i][1] == year) &&
                    (taskStored[i][2] == month)) {
                    result ++;
                }
            }
        }
        return result;
    }
};