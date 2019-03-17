const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;
let result = 0;
let newNumberArray= [];

app.use(bodyParser.urlencoded({extended:true}))

app.use(express.static('server/public'));
app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log ('Server is running on port', PORT)
  })

  let numberHistory = [ ];

  //will send calculation history to the client side via the numberHistory array
  app.get('/calculations', ( req, res ) => {
      console.log('GET calculations');
      res.send(numberHistory);
  });

  //will receive new number set from client side and add to numberHistory arrays
  app.post('/calculations', ( req, res) => {
    let newNumberSet = req.body;
    console.log('Number Set Added:', newNumberSet);
    newNumberArray.push(newNumberSet);
    calculations(newNumberArray);
    res.sendStatus(201);
  })

  app.delete('/calculations', (req, res) =>{
      console.log('delete request received');
      numberHistory = [];
      res.sendStatus(201);
      })


  function calculations(newNumberArray){
      let numberSet= {}
      for(i = 0; i<newNumberArray.length; i++){
      if(newNumberArray[i].clickOperator === 'addition'){
          result = Number(newNumberArray[i].number1) + Number(newNumberArray[i].number2);
          numberSet = new NumberCalculationSet(newNumberArray[i].number1, newNumberArray[i].number2, result, newNumberArray[i].clickOperator);
      }
      if(newNumberArray[i].clickOperator === 'subtraction'){
        result = Number(newNumberArray[i].number1) - Number(newNumberArray[i].number2);
        numberSet = new NumberCalculationSet(newNumberArray[i].number1, newNumberArray[i].number2, result, newNumberArray[i].clickOperator);
    }
    if(newNumberArray[i].clickOperator === 'multiplication'){
        result = Number(newNumberArray[i].number1) * Number(newNumberArray[i].number2);
        numberSet = new NumberCalculationSet(newNumberArray[i].number1, newNumberArray[i].number2, result, newNumberArray[i].clickOperator);
    }
    if(newNumberArray[i].clickOperator === 'division'){
        result = Number(newNumberArray[i].number1) / Number(newNumberArray[i].number2);
        numberSet = new NumberCalculationSet(newNumberArray[i].number1, newNumberArray[i].number2, result, newNumberArray[i].clickOperator);
    }
  }
    console.log(result);
    console.log(numberSet);
    numberHistory.push(numberSet);
    return numberSet;
}


class NumberCalculationSet {
    constructor(number1, number2, result, clickOperator){
        this.number1 = number1;
        this.number2 = number2;
        this.result = result;
        this.operator = clickOperator;
    }
}

