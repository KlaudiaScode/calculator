function test (functionToBeTested , expectedResult){
    try {
        const result = functionToBeTested ()
        if (expectedResult !== result){
            throw new Error(`expected Value ${expectedResult} is different than test result ${result}`)
        }
        return; 
    } catch (error) {
        return error;
        
    }
}
function calculateWithoutParameters (){
    return calculate();
}
const testNegativeResult = test (calculateWithoutParameters);
if (testNegativeResult){
    console.log('test Failed', testNegativeResult)
} else{
    console.log('test Passed')
}


function calculateWithEmptyArray (){
    return calculate([]);
}
const testNegativeResult2 = test (calculateWithEmptyArray);
if (testNegativeResult2){
    console.log('test Failed', testNegativeResult2)
} else{
    console.log('test Passed')
}


function calculateWithProperArray (){
    return calculate([7,'x',5]);
}
const testNegativeResult3 = test (calculateWithProperArray,35);
if (testNegativeResult3){
    console.log('test Failed', testNegativeResult3)
} else{
    console.log('test Passed')
}