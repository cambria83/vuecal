new Vue({
  el: '#app',
  data: {
    days:0, month:12, year:1983, day:10, prevMonth:'', nextMonth:'',
    months:['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    days:['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    events: []
  },
  
  ready: function() {
  
  today = new Date();
  this.day = today.getDate();
  this.month = today.getMonth() + 1;
  this.year = today.getFullYear();
  
  this.days = new Date(this.year, this.month, 0).getDate();
  
  this.prevMonth = (this.month === 1) ? this.months[11] : this.months[this.month - 2]
  this.nextMonth = (this.month === 12) ? this.months[0] : this.months[this.month]  
  },
  

 methods: {

    changeMonth: function(direction) {
        
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
          this.days = new Date(this.year, this.month, 0).getDate();
    },
 }
})