console.log('in JS');

$(document).ready(onReady);
let clickOperator = '';
let newNumber = {};


function onReady(){
    console.log(`in JQ`);
    getCalculatedHistory();
    hideDOM();

    $('#addition').on('click', function(event){
        event.preventDefault();
        clickOperator = $(this).attr("id");
        console.log(clickOperator);
    })
    $('#subtraction').on('click', function(event){
        event.preventDefault();
        clickOperator = $(this).attr("id");
        console.log(clickOperator);
    })
    $('#multiplication').on('click', function(event){
        event.preventDefault();
        clickOperator = $(this).attr("id");
        console.log(clickOperator);
    })
    $('#division').on('click', function(event){
        event.preventDefault();
        clickOperator = $(this).attr("id");
        console.log(clickOperator);
    })
    $('#submitButton').on('click', function(event){
        event.preventDefault();
        sendNumberInputData();
    })
    $('#clearButton').on('click', function(event){
        event.preventDefault();
        clearInputs()
    })

    $('#clearHistory').on('click', function(event){
        event.preventDefault();
        clearHistory();
    })
}


function clearInputs(){
    $('#number1Input').val('');
    $('#number2Input').val('');
}


//function will get the number history from the server
function getCalculatedHistory(){
    $.ajax({
        method: 'GET',
        url: '/calculations',
    }).then ( function(response){
        console.log('Number History is:', response);
        render(response);
    }).catch( function (error){
        console.log('Get of Number History error');
        alert(`Sorry! Was unable to get Number History!`);
    })
}

function validateInputs(){
    let number1 = $('#number1Input').val();
    let number2 = $('#number2Input').val();
    if (number1 !== '' & number2 !== ''){
        return true;
    }
    return false;
}

function clearHistory(){
    $.ajax({
        method: 'DELETE',
        url:'/calculations',
        success: function(result){
            console.log('history has been deleted');
            $('#calculatedTotal').empty();
            $('#calculatedHistory').empty();
            hideDOM();
           ;
        }
    })
}

//will take number input data from client and send to server side
function sendNumberInputData(){
   if(validateInputs() ) {
       let number1 = $('#number1Input').val();
       let number2 = $('#number2Input').val();
       Number(number1);
       Number(number2);

    $.ajax({
        method: 'POST',
        url: '/calculations',
        data: { number1,
                number2,
                clickOperator
            
        }
    }).then( function (response){
        getCalculatedHistory();
        clearInputs();
    }).catch( function(error){
        console.log('numberInputData Response Error');
        alert(`Sorry! There was an error in sending your numbers!`);
    })
}
else {
    alert(`Please complete all input fields!`);
}
}

function render(response){
    $('#calculatedTotal').empty();
    $('#calculatedHistory').empty();
    $('#calculatedTotal').append(`<h3 id="total">The Calculated Total Is: <span id="calculatedResult"></span></h3>`);
    $('#calculatedHistory').append(`<h3>Calculation History</h3><hr>`)

    let numberResult = '';

    for( let i= 0; i<response.length; i++){
        let appendNum= response[i];
        numberResult = response[response.length -1].result;
        if (appendNum.operator === 'addition') {
        $('#calculatedHistory').append(`<li>${appendNum.number1} + ${appendNum.number2} = ${appendNum.result}</li><hr>`)
        showDOM();
        }
        if (appendNum.operator === 'subtraction') {
        $('#calculatedHistory').append(`<li>${appendNum.number1} - ${appendNum.number2} = ${appendNum.result}</li><hr>`)
        showDOM();
        }
        if (appendNum.operator === 'multiplication') {
            $('#calculatedHistory').append(`<li>${appendNum.number1} * ${appendNum.number2} = ${appendNum.result}</li><hr>`)
            showDOM();
        }
        if (appendNum.operator === 'division') {
            $('#calculatedHistory').append(`<li>${appendNum.number1} / ${appendNum.number2} = ${appendNum.result}</li><hr>`)
            showDOM();
        }        
    }
    $('#calculatedResult').append(`${numberResult}`)
}   

function hideDOM(){
    $('#calculatedTotal').hide();
    $('#calculatedHistory').hide();
}

function showDOM(){
    $('#calculatedTotal').show();
    $('#calculatedHistory').show();
}