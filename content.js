let submitButton = document.querySelector('.main-button');
let fontSlider = document.querySelector('#font-size-slider');

submitButton.addEventListener("click", async () => {
    let fontVal = document.querySelector('.font-dropdown');
    // let sizeVal = document.querySelector('.size-field').value;
    let sizeVal = document.querySelector('#font-size-slider').value;
    let colorVal = document.querySelector('.color-field').value;

    console.log('sizeVal: ', sizeVal)
    console.log('fontVal: ', fontVal)

    userInput = [fontVal, sizeVal, colorVal];

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true});

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: updateCSS,
        args: [userInput]
    });
});

fontSlider.addEventListener('change', (event) => {
    let sizeVal = document.querySelector('#font-size-slider').value;
    let currentFontSize = document.querySelector('.current-font-size');

    currentFontSize.innerHTML = '( ' + sizeVal + 'px )';
})
    
function updateCSS(inputArr){
    // grab all divs and update values
    let newDiv = Array.from(document.getElementsByTagName('div'));
    newDiv.forEach(ele => {
        ele.style.fontFamily = inputArr[0];
        ele.style.fontSize = inputArr[1]+'px';
        ele.style.color = inputArr[2];
    });
}
