/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = ',&appid=bc656b194a8178758f08f7a4669d8a6a&units=metric'; // Personal API Key 
const userForm = document.querySelector('.userInputform');


    // Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();


/* Receive user info from call back function and request api data*/
    const getMetData = async (userZipCode)=>{
    
    const res = await fetch(baseUrl+'?zip='+userZipCode+apiKey); 
    //console.log(baseUrl+'?zip='+userZipCode+apiKey);
    try {
        const fetchData = await res.json(); 
        //console.log(fetchData);
        return fetchData;
    } catch (error) {
        console.log('error in getTempInfo', error);
    }
}


// Event listener added and callback function created
document.getElementById('generate').addEventListener('click', genButton);

function genButton(e){
    e.preventDefault();
    try{
    
    const userZipCode = document.getElementById('zip').value;
    const userContent = document.getElementById('feelings').value;
    
    if (userZipCode!=='') {
        
        //console.log(userZipCode);
    
    getMetData(userZipCode)
        .then(function(fetchData){
        //const allData = {
          //  temp: fetchData.main.temp,
            //date: newDate, 
            //content: userContent
        //}
        //console.log("getMetData:"+fetchData.main.temp+newDate+userContent);
        postData('/add', {temp: fetchData.main.temp,date: newDate, content: userContent}); 

    }).then(function(){

        updateData(); // this updates the data

    })
        
    userForm.reset();
        
        
    }
     }catch(error){console.log(error);}
}



const updateData = async()=>{
    const request = await fetch('/all');
    try {
        const apiData = await request.json();
        console.log(apiData.temp);
// update data

            document.getElementById('date').innerHTML = 'Date:' + apiData.date;
            document.getElementById('temp').innerHTML = 'Temperature:' + apiData.temp + ' degree C';
            document.getElementById('content').innerHTML = 'You are feeling'+'&nbsp' + apiData.content;
            
        
    } catch (error) {
        console.log(error);
    }
};


/* POST data */
const postData = async(url='', metInfo={}) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
            {temp: metInfo.temp,
            date: metInfo.date,
            content: metInfo.content
        })
    });

    try {
        const postedData = await response.json();
        //console.log(postedData.temp+"posted");
        return postedData;
    } catch (error) {
        console.log(error);
    }
};



