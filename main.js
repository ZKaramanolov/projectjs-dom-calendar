var Calendar = {
    year: 2018,
    month: 1,
    days: [],

    setupCalendar: function() {
        $$('#body').addChild('div').selectChild().editId('controls').addStyles({position: 'relative', padding: '10px', textAlign: 'center'});

        $$('#controls').addChild('select').selectChild().editId('select');
        var opt = $$('#select').getElement();
        for (var i = 1; i <= 12; i++) {
            opt.options[i] = new Option(i);
        }
        $$('#select').addEvent('change', function() {
            Calendar.setMonth(this.value);
        });

        $$('#controls').addChild('div').selectChild().editId('month').addStyles({display:'inline', padding: '10px'});
        $$('#month').addChild('button').selectChild().editText('>').addEvent('click', this.changeToNextMonth);
        $$('#month').addChild('span').selectChild().editText('Month').addStyles({padding: '10px'});
        $$('#month').addChild('button').selectChild().editText('<').addEvent('click', this.changeToPreviousMonth);

        $$('#controls').addChild('div').selectChild().editId('year').addStyles({display:'inline'});
        $$('#year').addChild('button').selectChild().editText('>').addEvent('click', this.changeToNextYear);
        $$('#year').addChild('span').selectChild().editText('Year').addStyles({padding: '10px'});
        $$('#year').addChild('button').selectChild().editText('<').addEvent('click', this.changeToPreviousYear);


        this.setupTable();
    },

    setupTable: function() {
        $$('#body').addChild('table')
            .selectChild(0).addStyles({border: 'solid', position: 'relative'}).addChild('tbody').editId('table')
            .selectChild(0).editId('t');
        $$('#body').addChild('span').selectChild(0).editId('title').addStyles({fontSize: '45px', fontWeight:'700'});;
        this.setupTableHead();
    },

    setupTableHead: function() {
        var tableHeadTemplate = `
        <thead>
            <tr id='table-head'>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
                <th>Sunday</th>
            </tr>
        </thead>`;
        $$('#t').selectParent().appendHTML(tableHeadTemplate);

        for (var i = 0; i < $$('#table-head').getChildren().length; i++) {
            $$('#table-head').selectChild(i).addStyles({fontSize:'18px', border: 'solid'});
        }
        this.fillTableBody();
    },

    fillTableBody: function() {
        this.getDaysInMonth();
        var title = (Calendar.year + 1) + ' - ' + (Calendar.month + 1);
        $$('#title').editText(title);

        var index = 0;
        while (index < this.days.length) {
            var tableRow = '<tr>';

            var createRowResult = this.createRowWithDays(index);

            tableRow += createRowResult[0];
            index = createRowResult[1];

            tableRow += '</tr>';

            $$('#t').appendHTML(tableRow);
        }
    },

    createRowWithDays: function(index) {
        var row = ``;
        var daysInWeek = 0;
        var dayCSS = 'style=\'width: 125px; border-style:solid; border-width:1px; text-align: center; height:100px; font-size: 20px;\'';
        var todayCSS = 'style=\'width: 125px; border-style:solid; border-width:2px; text-align: center; height:100px; color: red; font-size: 24px;\'';
        var today = new Date();

        while (daysInWeek < 7 ) {
            var dayFromWeekAsString = $$('#table-head').selectChild(daysInWeek).getText();

            if (dayFromWeekAsString == this.days[index].dayAsString) {
                if (today.getDate() == this.days[index].dayFromMonth &&
                    today.getMonth() == Calendar.month &&
                    today.getFullYear() == (Calendar.year + 1)) {
                    row += `<td ${todayCSS}>${this.days[index].dayFromMonth}</td>`;
                    index++;
                } else {
                    row += `<td ${dayCSS}>${this.days[index].dayFromMonth}</td>`;
                    index++;
                }
            } else {
                row += '<td></td>';
            }
            daysInWeek++;

            if (index == this.days.length) {
                return [row, index];
            }
        }
        return [row, index];
    },

    getDaysInMonth: function() {
        var date = new Date(this.year, this.month, 1);
        var daysAsStrings = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        while (date.getMonth() === this.month) {
            this.days.push({
                dayFromMonth: new Date(date).getDate(),
                dayFromWeek: new Date(date).getDay() + 1,
                dayAsString: daysAsStrings[new Date(date).getDay()],
            });
            date.setDate(date.getDate() + 1);
        }
    },

    changeToNextMonth: function() {
        Calendar.month++;
        if (Calendar.month == 12) {
            Calendar.year++;
            Calendar.month = 0;
        }
        Calendar.resetTBody();
    },

    changeToPreviousMonth: function() {
        Calendar.month--;
        if (Calendar.month == -1) {
            Calendar.year--;
            Calendar.month = 11;
        }
        Calendar.resetTBody();
    },

    changeToNextYear: function() {
        Calendar.year++;
        Calendar.resetTBody();
    },

    changeToPreviousYear: function() {
        Calendar.year--;
        Calendar.resetTBody();
    },

    setMonth: function(m) {
        Calendar.month = m - 1;
        Calendar.resetTBody();
    },

    resetTBody: function() {
        Calendar.days = [];
        $$('#t').deleteElement();
        $$('#table').addChild('tbody').selectChild(0).editId('t');
        Calendar.fillTableBody();
    },
}

//console.log(Calendar.getDaysInMonth());
Calendar.setupCalendar();
