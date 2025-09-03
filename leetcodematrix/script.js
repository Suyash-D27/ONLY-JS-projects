document.addEventListener("DOMContentLoaded",function(){

    const user_input = document.getElementById('user-input');
    const Search_button = document.getElementById('search-button');
    const stat_container = document.querySelector('.Stats-container');

    const easyprogresscircle= document.querySelector('.easy-progress circle');
    const midprogresscircle= document.querySelector('.medium-progress circle');
    const hardprogresscircle= document.querySelector('.hard-progress circle');

    const easylable=document.getElementById('easy-lable');
    const midlable=document.getElementById('medium-lable');
    const hardlable=document.getElementById('hard-lable');
    const cardstat=document.querySelector('.stats-cards');

    function validateusername(username){
        if(username.trim() === ""){
            alert("Please Enter username")
            return false;
        }

        const regex =/^[a-zA-Z][a-zA-Z0-9_-]{3,14}$/;
        const isMatched = regex.test(username)
        if (!isMatched){
            alert("Invalid username")
        }

        return isMatched;
    }



    Search_button.addEventListener("click",function(){
        console.log("Button clicked");
        console.log("user_input:", user_input);
        const username = user_input.value;
        console.log(`username is ${username}`)

        if(validateusername(username)){
            fetchuserdata(username);
            // console.log(`username is ${username}`)
        }
    });



    async function fetchuserdata(username) {
        const url = `https://leetcode-stats-api.vercel.app/api?username=${username}`


        try{
            const response = await fetch(url)
            if(!response.ok){

                throw new Error("unable to fetch");
                
            }     
            
            const pdata = await response.json();
            console.log('logging data :', pdata);

            displayuserdata(pdata);

            Search_button.textContent="searching...";
            Search_button.disabled=true;
            
        }

        catch(error){
            stat_container.innerHTML="NO Data Found"
        }
        finally{
            Search_button.textContent="search";
            Search_button.disabled=false;
        }
        
    }

    function displayuserdata(data){
        
        const totalSolved = data.totalSolved;
        const totalQuestions = data.totalQuestions;

        const easySolved = data.easySolved;
        const totalEasy = data.totalEasy;

        const mediumSolved = data.mediumSolved;
        const totalMedium = data.totalMedium;

        const hardSolved = data.hardSolved;
        const totalHard = data.totalHard
        

        // console.log(totalSolved);
        // console.log(easySolved);
        // console.log(hardSolved);
        // console.log(mediumSolved);

        // console.log(totalEasy);
        // console.log(totalHard);
        // console.log(totalMedium);
        // console.log(totalQuestions);

        // console.log(midlable);
        // console.log(hardlable);


        update_progress(easySolved, totalEasy, easylable, easyprogresscircle);
        update_progress(mediumSolved, totalMedium, midlable, midprogresscircle);
        update_progress(hardSolved, totalHard, hardlable, hardprogresscircle);

        const cardsData = [
            {label: "Overall Submissions", value:totalSolved},
            {label: "Overall Easy Submissions", value:easySolved },
            {label: "Overall Medium Submissions", value:mediumSolved },
            {label: "Overall Hard Submissions", value: hardSolved},
        ];


        cardstat.innerHTML=cardsData.map(data=>{
            return `<div>${this.label}:${this.value}</div>`
        }).join("")



    }

    function update_progress(solved,total,lable,circle) {

        let progress_degree;

        if (!label || !circle) {
        console.warn("Label or Circle is null:", label, circle);
        return;
        }
        
        if(solved<=0){

            progress_degree=0;

        }
        else{

            progress_degree = (solved/total)*100

        }
        

        console.log(progress_degree)

        const circle_change = circle.style.setProperty("--progress-degree",`${progress_degree}%`)

        const circle_change_2=lable.textContent=`${solved}/${total}`

        document.body.append(circle_change);
        document.body.append(circle_change_2);
         
    }

})