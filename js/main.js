/* 
 * Globals *cringes*
 *
 */

var rate = 10;                          //Once per 10 millisecond i.e 1 centisecond is the standard unit
var running = false; 
var counter = 0;                        //Unit is centisecond
var initial = (new Date()).getTime();

/*
 * The window has been brought back into focus.
 * Compare the current time with the last "initial" time and adjust the counter.
 */

window.onfocus = function() {
        if(running){
                var current = (new Date()).getTime();
                counter += (current - initial - counter *rate)/rate;
        }
}

/*
 * Start and stop functions
 */

var start = function(){
        running = true;
        document.getElementById("startStop").textContent = "Stop";
        document.getElementById("startStop").onclick = function() { stop(); };
        document.getElementById("reset").disabled = true;

        if(counter == 0){
            initial = (new Date()).getTime();
        }
}

var stop = function(){
        running = false;
        document.getElementById("startStop").textContent = "Start";
        document.getElementById("startStop").onclick = function() { start(); };
        document.getElementById("reset").disabled = false;
}

/*
 * Add zero when required
 */

var addZero = function(val){
        var str = "" + val;
        if(val<10){ str = "0" + val; }
        return str;
}


/* 
 * Updates the display according to the value of counter
 */

var updateDisplay = function(){

        var cnt = counter;

        var hours = Math.floor(cnt/360000);
        cnt = cnt % 360000;
        var minutes = Math.floor(cnt/6000);
        cnt = cnt % 6000;
        var seconds = Math.floor(cnt/100);
        cnt = cnt % 100;
        var centiseconds = Math.floor(cnt);


        hours = addZero(hours);
        minutes = addZero(minutes);
        seconds = addZero(seconds);
        centiseconds = addZero(centiseconds);

        var clockStr = hours + ":" + minutes + ":" + seconds;

        document.getElementById("main").textContent = clockStr;
        document.getElementById("cs").textContent = " " + centiseconds;
        document.title = clockStr;
}

var reset = function(){
        running = false;
        counter = 0;
        document.getElementById("reset").disabled = true;       // Disable the reset button
        updateDisplay();
}

updateDisplay();

setInterval(function() { if(running){ counter++; updateDisplay(); } }, rate);


