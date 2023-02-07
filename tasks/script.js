/*
* @author deadfishh
*
* this is wordle, which i wrote
* it is a worse version of the new york times wordle
* but fuck the new york times
*/


// starts the game!
function start()
{
    makeOptions();
    addListeners();
}

function makeOptions()
{
    selectFrom = document.getElementById("selectFrom")
    selectTo = document.getElementById("selectTo")
    for (var i = 2; i <= 36; i++)
    {
        opFrom = document.createElement("option")
        opFrom.setAttribute("id", "base-" + i)
        opFrom.textContent = "base-" + i

        opTo = document.createElement("option")
        opTo.setAttribute("id", "base-" + i)
        opTo.textContent = "base-" + i

        selectFrom.appendChild(opFrom)
        selectTo.appendChild(opTo)
    }
}

function decToSomething(num, base)
{
    if (base > 36 || base < 2)
    {
        console.log("no can do")
        return
    }
    answer = ""
    while (num != 0)
    {
        digit = num % base
        if (digit > 9)
        {
            digit = String.fromCharCode(digit + 87)
        }
        answer += digit
        num = Math.floor(num / base)
    }
    answer = answer.split("").reverse().join("");
    return answer
}


function somethingToDec(num, base)
{
    if (base > 36 || base < 2)
    {
        print("no can do")
        return
    }
    sum = 0
    place = 0
    num = num.toString()
    while (num.length > 0)
    {
        digit = num.charAt(num.length - 1)
        if (digit.charCodeAt() >= 97 && digit.charCodeAt() <= 122)
        {
            digit = digit.charCodeAt() - 87
        }
        add = digit * Math.pow(base, place)
        num = num.substring(0, num.length - 1)
        sum += add
        place ++
    }
    return sum
}


function addListeners()
{
    translateTextOne.addEventListener("keyup", function()
    {
        cheesy(true);
    });
    translateTextTwo.addEventListener("keyup", function()
    {
        cheesy(false)
    });
    selectFrom.addEventListener("change", function()
    {
        cheesy(true)
    })
    selectTo.addEventListener("change", function()
    {
        cheesy(true)
    })
}

function cheesy(normal)
{
    thisTranslate = normal ? translateTextOne : translateTextTwo
    otherTranslate = normal ? translateTextTwo : translateTextOne

    from = normal ? selectFrom.value : selectTo.value
    from = from.substring(5, from.length)
    to = normal ? selectTo.value : selectFrom.value
    to = to.substring(5, to.length)
    
    num = thisTranslate.value
    if (!checkInput(num, from))
    {
        console.log("invalue")
        otherTranslate.style.color = 'crimson'
        otherTranslate.value = "invalid input"
        return;
    }
    dec = somethingToDec(num, from)
    answer = decToSomething(dec, to)
    otherTranslate.value = answer
    otherTranslate.style.color = 'black'
}

function checkInput(phrase, b)
{
    b = parseInt(b)
    for (var i = 0; i < phrase.length; i++)
    {
        temp = phrase.charAt(i).charCodeAt()
        // letter is out of bounds
        if (temp > (b + 86))
        {
            return false;
        }
        // number is out of bounds
        else if (temp > (b + 47) && temp < (b + 56))
        {
            return false;
        }
    }
    return true;
}

