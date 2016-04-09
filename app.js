new Vue({
  el: '#app',
  data: {
    days:[], month:12, year:1983, date:10, prevMonth:'', nextMonth:'',
    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    daysOfWeek:['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], day:0, first:0,
    events: []
  },
  
  ready: function() {
  
  // Get information about our current dates
  today = new Date();
  this.date = today.getDate();  
  this.day = today.getDay();
  this.month = today.getMonth() + 1;
  this.year = today.getFullYear();
  
  // Which day of the week is the 1st of this month?
  theFirst = new Date();
  theFirst.setDate(1);
  this.first = theFirst.getDay();
  
  for (var i = 0; i < this.first; ++ i) {
    this.days.push({day:null, today:false})
  }
  
  // How many days in this month?
  noOfDays = new Date(this.year, this.month, 0).getDate();
  
    // Build an array
    for (var n = 0; n < noOfDays; ++ n) {
        if(n + 1 === this.date) {
         this.days.push({day:n, today:true})
        } else {
        this.days.push({day:n, today:false})
        }
    }

  // Set our previous and next month buttons
  this.prevMonth = (this.month === 1) ? this.months[11] : this.months[this.month - 2]
  this.nextMonth = (this.month === 12) ? this.months[0] : this.months[this.month]  
  },
  

 methods: {

    changeMonth: function(direction) {
        
        this.days = []
        
        if(this.month === 12 && direction === 'next') {
            this.year = this.year + 1
        }        
        if(this.month === 1 && direction === 'prev') {
            this.year = this.year - 1
        }
        if(this.month === 12 && direction === 'next') {
            this.month = 1
        } else 
        if(this.month === 1 && direction === 'prev') {
            this.month = 12
        } else {
        this.month = (direction === 'prev') ? this.month - 1 : this.month + 1
        }
        
          this.prevMonth = (this.month === 1) ? this.months[11] : this.months[this.month - 2]
          this.nextMonth = (this.month === 12) ? this.months[0] : this.months[this.month]
          
          // Which day of the week is the 1st of this month?
          theFirst = new Date(this.year, this.month, 0);
          theFirst.setDate(1);
          this.first = theFirst.getDay();
          
          for (var i = 0; i < this.first; ++ i) {
            this.days.push({day:null, today:false})
          }
          
          // Get current Year
          date = new Date()
          month = date.getDate()
          
          // How many days in this month?
          noOfDays = new Date(this.year, this.month, 0).getDate();
          
            // Build an array
            for (var n = 0; n < noOfDays; ++ n) {
                if(n + 1 === this.date && this.month === month) {
                 this.days.push({day:n, today:true})
                } else {
                this.days.push({day:n, today:false})
                }
            }
    
    },
 }
})