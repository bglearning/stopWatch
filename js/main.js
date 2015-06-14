var rate = 10; //Once per 10 millisecond i.e 1 centisecond is the standard unit
var running = false; 
var counter = 0; //Unit is centisecond

var addZero = function(val){
        var str = "" + val;
        if(val<10){ str = "0" + val; }
        return str;
}

var start = function(){
        running = true;
        document.getElementById("startStop").textContent = "Stop";
        document.getElementById("startStop").onclick = function() { stop(); };
        document.getElementById("reset").disabled = true;
}

var stop = function(){
        running = false;
        document.getElementById("startStop").textContent = "Start";
        document.getElementById("startStop").onclick = function() { start(); };
        document.getElementById("reset").disabled = false;
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
        var centiseconds = cnt;


        hours = addZero(hours);
        minutes = addZero(minutes);
        seconds = addZero(seconds);
        centiseconds = addZero(centiseconds);

        document.getElementById("stopwatch").textContent = hours + ":" + minutes + ":" + seconds;
}

var reset = function(){
        running = false;
        counter = 0;
        document.getElementById("reset").disabled = true;
        updateDisplay();
}

updateDisplay();

setInterval(function() { if(running){ counter++; updateDisplay(); } }, rate);


