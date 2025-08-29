const start_date = new Date().getTime()
const end_date =new Date("28 august,2025,23:49:00").getTime()




setInterval(function update_timer(X){
    const current_date = new Date().getTime();
    
    const distance_covered = current_date-start_date;

    // distance remaing

    const remaing=end_date-current_date;
    
    const days = Math.floor((remaing)/(24*60*60*1000))

    const hr = Math.floor((remaing%(24*60*60*1000))/(60*60*1000))

    const min = Math.floor((remaing%(60*60*1000))/(60*1000))

    const sec = Math.floor((remaing%(60*1000))/1000)

    if (days&&hr&&min&&sec <= 0){
        clearInterval();
        document.getElementById("timer").innerHTML="end";
        document.getElementById("progessbar").style.width="100%"
    }


    document.getElementById("day").innerHTML=days;
    document.getElementById("hr").innerHTML=hr;
    document.getElementById("min").innerHTML=min;
    document.getElementById("sec").innerHTML=sec;

    // precentage of progress bar

    const precentageforprogerss = (distance_covered/(end_date-start_date))*100;

    document.getElementById("progessbar").style.width = precentageforprogerss +"%";

    
},1000)