
function handleSubmit(event) {
    event.preventDefault()

    /* Global Variables */
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")

    let apiKey = '';
    /* Get application key */
    getKey()
    .then(function(data){
        apiKey = data.key;
        console.log(apiKey);
    })
    async function getKey() {
        // Get API key from server
        const request = await fetch('/api');
        try {
            const data = await request.json();
            return data;
        } catch (error) {
            console.log('ERROR', error);
        }
    }


    // Get weather data
    getWeather(baseURL, formText, apiKey)
    // Post data
    .then(function(newData){
        const city = newData.name;
        const newZip = formText;
        postData('/addData', { newZip })
    })
    // update message
    .then(updateUI())
}

async function getWeather(baseURL, formText, apiKey) {
    //Create url variable
    const url = baseURL + formText + '&appid=' + apiKey;
    const request = await fetch(url)
    try {
        const newData = await request.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log('ERROR', error)
    }
}

async function postData(url ='', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });
    try {
        const allData = await response.json();
        console.log(allData);
        return allData;
    } catch (error) {
        console.log('ERROR', error);
    }
}

async function updateUI() {
    const response = await fetch('/all');
    try {
        const updateData = await response.json();
        console.log(updateData);
        document.getElementById('results').innerHTML = updateData.newZip;
    } catch(error) {
        console.log('ERROR', error);
    }
}

export { handleSubmit }
