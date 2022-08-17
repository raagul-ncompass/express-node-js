function validate(num1,num2,operator)
{

	if (num1=="" || num2=="" || operator=="")
	{
		alert("Check the values or Enter all the required values ")
		return true
		
		
	}
	if (operator =='+' || '-' || '*' || '/')
	{
		return false

	}
	else
	{
		alert("Invalid Operator")
		return true
		
	}
}
function clear_screen() {
    document.getElementById("first").value = "";
    document.getElementById("second").value = "";
    document.getElementById("ops").value = "";
    document.getElementById("result").value = "";
}






function isValid(weight_val,height_val){
    if (weight_val == "" || height_val == "")
    {
        return false;
    }
    return true;
}
function isValue(weight_val,height_val){
    if (weight_val < 0 || height_val < 0)
    {
        return false;
    }
    return true;
}

function clear_screen_1() {
document.getElementById("weight").value = "";
document.getElementById("height").value = "";
document.getElementById("result_1").value = "";
document.getElementById("result_statement").value = "";
}

function isempty(principal,rate_of_interest,no_of_times,time_period)
{

	if (principal=="" || rate_of_interest=="" || no_of_times=="" || time_period=="")
	{
		return false;
    }
    return true;
}
function isvalid(principal,rate_of_interest,no_of_times,time_period)
{
    if (principal < 0 || rate_of_interest < 0 || no_of_times < 0 || time_period < 0)
    {
        return false;
    }
    return true;
	
}

function clear_screen() {
    document.getElementById("P").value = "";
    document.getElementById("R").value = "";
    document.getElementById("N").value = "";
    document.getElementById("R").value = "";
    document.getElementById("T").value = "";
    document.getElementById("result_2").value = "";

}


function alphanumeric(sentence)
{
 var letterNumber = /^[a-zA-Z]+$/;
 if(sentence.value.match(letterNumber)) 
  {
   return false;
  }
}
function isempty(sentence)
{
    if(sentence==" ")
    {
    return false;
    }
}

function clear_screen() {
    document.getElementById("S").value = "";
    document.getElementById("word_count").value = "";
    document.getElementById("word").value = "";
    

}