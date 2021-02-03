'use strict'
let line ='';

const updateInputDisplay = (text)=>{
  const display = document.querySelector('.display__input');
  display.innerHTML = text;
}

const updateResultDisplay = (text)=>{
    const display = document.querySelector('.display__result');
    display.innerHTML = text;
  }

const openListeners = () => {
    const btn = document.querySelectorAll('.div__btn');
    btn.forEach(item=>item.addEventListener('click', btnListener));
}

const isOperator=(char)=> char==='+' || char ==='-' || char ==='*' || char ==='/';

const calculate = (line) => {
    let valueArray = [];
    let operatorArray = [];
    let number='';
    if(isNaN(line[0])) 
        updateInputDisplay('Hiba');
        [...line].forEach(char=>{ 
            if(!isNaN(char) || char==='.') 
                number += char;
            else if(isOperator(char)){
                const temp = parseFloat(number);
                if(isNaN(temp)){
                    updateInputDisplay('Hiba');
                }
                valueArray.push(temp);
                number='';
                operatorArray.push(char);
            }else{
                updateInputDisplay('Hiba');
            }
        });
        valueArray.push(parseFloat(number)); 
    return evaluate(valueArray,operatorArray);
}

const doOpObj = {
    '+' : function(a,b) { return a + b },
    '-' : function(a,b) { return a - b },
    '*' : function(a,b) { return a * b },
    '/' : function(a,b) { return a / b },
}
const evaluate = (valueArray, operatorArray) => {
    let numberIndex = 0;
    let result = valueArray[numberIndex];
    operatorArray.forEach(operator=>{
    result = doOpObj[operator](result,valueArray[++numberIndex]);
    });
    return result;
}



const btnListener = (e)=>{
    const char = e.target.getAttribute('data')

    if(char === 'C'){ 
       line = '';
       updateInputDisplay('');
       updateResultDisplay('');
    }
    else if(char==='='){
        if(line.length > 1){
            updateResultDisplay(calculate(line).toString());
        }
        else{
            updateResultDisplay('');
        }
    }
    else{
        line+= char;
        updateInputDisplay(line);
    }
}
openListeners();

