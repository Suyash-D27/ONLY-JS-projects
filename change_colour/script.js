function randomColor(){
    const hex ="0123456789ABCDEF"
    let color ="#"

 for (let i = 0; i <6; i++) {
       color = color + hex[Math.floor(Math.random()*16)]
    }

    return color
}

let interval;

function change_Background(){

   if (!interval){
     interval= setInterval(set_Background,1000) 
   }

    function set_Background(){
        document.body.style.backgroundColor=randomColor();
    }

    
}

function stop_Background(){
  clearInterval(interval);
  interval=null;
}




document.getElementById('start').addEventListener('click',change_Background)
document.getElementById('stop').addEventListener('click',stop_Background)