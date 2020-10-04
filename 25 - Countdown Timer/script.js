const timerButtons = document.querySelectorAll('.timer__button')
timerButtons.forEach(button => button.addEventListener('click', start_clock))

const customInput = document.querySelector('#custom')
customInput.addEventListener('submit', start_clock)
const customInputField = document.querySelector('#customTime')

const timeLeft = document.querySelector('#display-time-left')
const endTime = document.querySelector('#display-end-time')

let timer;
let time;

function add_zero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

function parse_custom_time(e){

    // Read out the custom input field
    e.preventDefault();
    const customTime = customInputField.value
    customInput.reset()

    // Allow the input to be minutes, or minutes + seconds seperated with . or ,
    if(customTime.includes(',')){
        customTimeSplit = customTime.split(',')
        return parseInt(customTimeSplit[0]) * 60 + parseInt(customTimeSplit[1])
    } else if(customTime.includes('.')){
        customTimeSplit = customTime.split('.')
        return parseInt(customTimeSplit[0]) * 60 + parseInt(customTimeSplit[1])
    } else {
        return parseInt(customTime) * 60
    }
}


function start_clock(e){
    // Clear previous timer
    clearInterval(timer)

    // Check what input form is used and get the corresponding time
    if (e.target == customInput){
        time = parse_custom_time(e);
    } else {
        time = parseInt(e.target.dataset.time)
    }

    // Compute when the interval is over
    let timeToBeBack = new Date;
    timeToBeBack.setSeconds(timeToBeBack.getSeconds() + time);
    endTime.innerHTML = `Be back at ${timeToBeBack.getHours()}:${add_zero(timeToBeBack.getMinutes())}`

    // Init the display
    timeLeft.innerHTML = compute_time_left_string(time)

    // Interval function that checks every second if the time is over
    // If not, decrement it and update the display
    timer = setInterval(function(){
        time--;
        if (time < 0){
            clearInterval(timer);
        }else{
            timeLeft.innerHTML = compute_time_left_string(time);
        }
    },1000);
}

function compute_time_left_string(secsLeft){
    const minutesLeft = Math.floor(secsLeft/60)
    secsLeft = secsLeft%60
    return(`${minutesLeft}:${add_zero(secsLeft)}`)
}

