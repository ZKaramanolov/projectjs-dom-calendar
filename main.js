var Calendar = {
    year: 2018,
    month: 1,
    days: [],
    selectedDay: 0,

    setupCalendar: function() {
        $$('*').addStyles({boxSizing: 'border-box', display: 'flex'});
        $$('#body').addStyles({margin: '0px'});
        $$('#body').addChild('div').editId('controls').addStyles({position: 'relative', padding: '10px', textAlign: 'center'});

        $$('#body').addChild('div').editId('overlay').addStyles({
            top: '0px',
            left: '0px',
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'grey',
            opacity: '0.5',
            textAlign: 'center',
            zIndex: '1',
            display: 'none'
        }).addEvent('click', function() {
            $$('#overlay').addStyles({display: 'none'});
            $$('#fileInputWrapper').addStyles({display: 'none'});
        });

        $$('#body').addChild('div').editId('fileInputWrapper').addStyles({
            position: 'absolute',
            width: '300px',
            height: '200px',
            background: '#1b2433',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '2',
            borderRadius: '10%',
        }).addChild('input').setAttr('type', 'file').editId('file').addEvent('change', function() {
            Calendar.readJSON();
        });;

        $$('#controls').addChild('select').editId('select');
        var opt = $$('#select').getElement();
        for (var i = 1; i <= 12; i++) {
            opt.options[i] = new Option(i);
        }
        $$('#select').addEvent('change', function() {
            Calendar.setMonth(this.value);
        });

        $$('#controls').addChild('div').editId('month').addStyles({display:'inline', padding: '10px'});
        $$('#month').addChild('button').editText('>').addEvent('click', this.changeToNextMonth);
        $$('#month').addChild('span').editText('Month').addStyles({padding: '10px'});
        $$('#month').addChild('button').editText('<').addEvent('click', this.changeToPreviousMonth);

        $$('#controls').addChild('div').editId('year').addStyles({display:'inline'});
        $$('#year').addChild('button').editText('>').addEvent('click', this.changeToNextYear);
        $$('#year').addChild('span').editText('Year').addStyles({padding: '10px'});
        $$('#year').addChild('button').editText('<').addEvent('click', this.changeToPreviousYear);


        this.setupTable();
    },

    setupTable: function() {
        $$('#body').addChild('table').addStyles({border: 'solid', position: 'relative', margin: '10px'}).editId('table').addChild('tbody').editId('t');

        $$('#body').addChild('span').editId('title');
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
        $$('#title').addStyles({fontSize: '45px', fontWeight:'700', margin: '20px'}).editText(title);

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
        var dayCSS = 'style=\'width: 125px; height: 100px; border-style:solid; border-width:1px; font-size: 20px; cursor: pointer;\'';
        var todayCSS = 'style=\'width: 125px; height: 100px; border-style:solid; border-width:2px; color: red; font-size: 24px; cursor: pointer;\'';
        var today = new Date();

        while (daysInWeek < 7 ) {
            var dayFromWeekAsString = $$('#table-head').selectChild(daysInWeek).getText();
            var day = this.days[index].dayFromMonth;

            if (dayFromWeekAsString == this.days[index].dayAsString) {

                if (today.getDate() == this.days[index].dayFromMonth &&
                    today.getMonth() == Calendar.month &&
                    today.getFullYear() == (Calendar.year + 1)) {

                    row += `<td><div onClick='Calendar.displayFileInput(this)' ${todayCSS}>${day}</div></td>`;
                    index++;

                } else {
                    row += `<td><div onClick='Calendar.displayFileInput(this)' ${dayCSS}>${day}</div></td>`;
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

    displayFileInput: function(t){
        Calendar.selectedDay = t;
        $$('#overlay').addStyles({display: 'block'});
        $$('#fileInputWrapper').addStyles({display: 'flex'})
    },

    readJSON: function() {
        var f = $$('#file').getElement().files[0];

        var r = new FileReader();
        r.readAsText(f);
        r.addEventListener('load', function(e) {
            var file = e.target.result;
            var o = JSON.parse(file);

            Calendar.selectedDay.innerHTML += '<br>' + o.Events[0].Name;
            
            $$('#overlay').addStyles({display: 'none'});
            $$('#fileInputWrapper').addStyles({display: 'none'});
        });
        $$('#file').getElement().value = '';
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
        $$('#table').addChild('tbody').editId('t');
        Calendar.fillTableBody();
    },
}

//console.log(Calendar.getDaysInMonth());
Calendar.setupCalendar();
