function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let zips = [
        '90210',
        '94203'
    ]

    if(zips.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName }
