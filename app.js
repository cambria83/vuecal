new Vue({
  el: '#app',

  props: {
    disabled: { type: Boolean, default: false },
  },

  data: {
    dis:false,
    days:[], month:12, year:1983, date:10, prevMonth:'', nextMonth:'',
    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], day:0, first:0,
    events:[{"id": 1, "name":"Test Event 3", "dateTime":"2016-04-09 07:30:00"}, {"id": 2, "name":"Test Event 2", "dateTime":"2016-04-09 14:07:00"},{"id":3, "name":"Test Event", "dateTime":"2016-03-10 00:00:00"}],
    dayEvents:'', currentEvent:{"name":"Test Event", "stage":"Interested", "firstName":"Dave", "email": "ns@soletrader.com"}
  },

        filters: {

         timeOnly: function(val) {

          var timestamp = new Date(Date.parse(val.replace('-','/','g')));
          var hour = timestamp.getHours();
          var hour = (hour < 10) ? '0' + hour : hour;
          var minutes = timestamp.getMinutes();
          var minutes = (minutes < 10) ? '0' + minutes : minutes;

          return hour + ':' + minutes;

      },
      ukDate: function(val) {

      var date = new Date(val);
      var year =  date.getFullYear();
      var month =  date.getMonth() + 1;
      var day = date.getDate();

      return day + "/" + month + "/" + year;

      }
  },

  created: function() {

    this.currentMonth();
    this.dayFilter(this.date - 1);

  },


 methods: {

    currentMonth: function() {

        this.days = [];

    // Get information about our current dates
  var today = new Date();
  this.date = today.getDate();
  this.day = today.getDay();
  this.month = today.getMonth() + 1;
  this.year = today.getFullYear();

    this.$nextTick(function () {
      this.fetchEvents();
    });

  },

    changeMonth: function(direction) {

      this.dis = true;

        this.days = [];
        if(this.month === 12 && direction === 'next') {
            this.year = this.year + 1;
        }
        if(this.month === 1 && direction === 'prev') {
            this.year = this.year - 1;
        }
        if(this.month === 12 && direction === 'next') {
            this.month = 1;
        } else
        if(this.month === 1 && direction === 'prev') {
            this.month = 12;
        } else {
        this.month = (direction === 'prev') ? this.month - 1 : this.month + 1;
        }
        this.$nextTick(function () {
        this.fetchEvents();
    });
  },

    fetchEvents: function() {

      // GET request (fetch leads by month and year)
      // this.$http.get('/leads/import-leads', {"year":this.year, "month":this.month}).then(function (response) {
        // this.events = {}
        // this.events = response.data.result
        this.dis = false;

        this.prevMonth = (this.month === 1) ? this.months[11] : this.months[this.month - 2];
        this.nextMonth = (this.month === 12) ? this.months[0] : this.months[this.month];

        // Which day of the week is the 1st of this month?
        var theFirst = new Date(this.year, this.month, 0);
        theFirst.setDate(1);
        this.first = theFirst.getDay();

        for (var i = 0; i < this.first; ++ i) {
          this.days.push({day:null, today:false});
        }

        // Get current Year
        var date = new Date();
        var month = date.getMonth();
        var year = date.getFullYear();

        // How many days in this month?
        var noOfDays = new Date(this.year, this.month, 0).getDate();

          // Build an array
          for (var n = 0; n < noOfDays; ++ n) {
              if(n + 1 === this.date && this.month === month + 1 && this.year === year) {
               this.days.push({day:n, today:true});
              } else {
              this.days.push({day:n, today:false});
              }
          }

        // L0ads Events into our current month
        var obj = [];
        for(var event of this.events) {
        var nullDays = this.days.length - noOfDays;
        var timestamp = new Date(Date.parse(event.dateTime.replace('-','/','g')));
        var eventMonth = timestamp.getMonth();
        var eventYear = timestamp.getFullYear();
        var arrayKey = timestamp.getDate() + nullDays - 1;


        if(eventMonth + 1 === this.month && eventYear === this.year) {

        obj.push({"day": arrayKey, "name":event.name, "id":event.id});
        // Add Events to Days Array
        var array = [];

        for(var item of obj) {
        if(item.day === arrayKey) {
          array.push({"name":item.name, "id":item.id});
          this.days[arrayKey].events = array;
              }
            }
          }
        }

      }, function (response) {
          // error callback
      // });

    },

    dayFilter: function(day) {
    if(day !== null) {

      var day = day + 1;
      var today = (day < 10) ? ("0" + day) : day;
      var month = (this.month < 10) ? ("0" + this.month) : this.month;

     var search = this.year + '-' + month + '-' + today;
     this.dayEvents = search;
    }
    },
  },

});
