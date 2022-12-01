var passage;
var place = 0;
var typing = true;

async function start()
{
    passage = await makeWord('passages.txt');
    console.log(passage);
}


async function makeWord(filename)
{
    const passage = fetch (filename)
    .then(function(response)
    {
        return response.text();
    })
    .then(function(data)
    {
        var words = data.split('\n');
        x =  words[Math.floor(Math.random() * words.length)];
        return x;
    })
    return passage;
}

function beginTyping()
{
    makeTimer();
    document.getElementById('text').textContent = passage;
    document.getElementById('text').style.display = 'none';
    document.getElementById('startButton').style.display = 'none';
    createSpans();
    addListener();
}

function addListener()
{
    window.addEventListener('keydown', function(event)
    {
        if (!typing)
        {
            return;
        }
        num = event.key.charCodeAt();
        if (num === 66)
        {
            handleDelete();
            return;
        }
        else if (num === 83)
        {
            return;
        }
        if (isValidKey(num))
        {
            checkPlace(event.key);
            place++;
            if (place === passage.length)
            {
                typing = false;
                document.getElementById("timer").innerHTML = "finished";
                endGame();
            }
        }
        //text.style.color = 'crimson';
    });
}

function checkPlace(key)
{
    var text = document.getElementById('text');
   var letters = text.innerHTML;
    
    for(var i = 0; i<letters.length; i++)
    {
        //only change the one you want to
        if(i == place )// or whatever you like)
        {
            var span = document.getElementById('span' + i);
            if (key !== letters.charAt(i))
            {
                span.style.color = 'red'
            }
            else
            {
                span.style.color = 'mediumseagreen';
            }
        }
    }
}

    function createSpans()
    {
        var total = document.getElementById('total');
        var text = document.getElementById('text');
        var letters = text.innerHTML;
        for (var i = 0; i < letters.length; i++)
        {
            var yourSpan = document.createElement('span');
            yourSpan.id = 'span' + i;
            yourSpan.innerText = letters[i];
            total.appendChild(yourSpan);
        }
    }

    function handleDelete()
    {
        if (place <= 0)
        {
            return;
        }
        place--;
        var span = document.getElementById('span' + place);
        span.style.color = 'black';
    }

    function isValidKey(num)
    {
        // a - z
        if (num >= 97 && num <= 122)
        {
            return true;
        }
        // A - Z
        else if (num >= 65 && num <= 90)
        {
            return true;
        }
        // space, period, comma, apostrophe
        else if (num === 32 || num === 46 || num === 44 || num === 39)
        {
            return true;
        }
        return false;
    }

    function endGame()
    {
        console.log('end')
        total = document.getElementById('total');
        var wordcount = getWordCount();
        var accuracy = getAccuracy();
        var wpm = Math.round(wordcount * accuracy);
        total.textContent = "wordcount: " + wordcount + " accuracy: " + (accuracy * 100)+ "% ";
        total.textContent += "words per minute: " + wpm;
        var d = new Date();
        localStorage.setItem(d, wpm);
        var localScores = document.getElementById('localScores');
        var col1 = document.getElementById('col1');
        col1.appendChild(localScores);
        document.getElementById('scoreWrap').style.display = 'inline';
        Object.keys(localStorage).forEach(function(key)
        {
            var ap = document.createElement('li');
            ap.textContent = key.toString().substring(4, 10).toLowerCase();
            ap.textContent += ': ';
            ap.textContent += localStorage.getItem(key) + 'wpm';
            localScores.appendChild(ap);
         });
    }

    function getWordCount()
    {
        var count = 0;
        var text = document.getElementById('text');
        var letters = text.innerHTML;
        for(var i = 0; i<place; i++)
        {
            if (letters[i] === ' ')
            {
                count++
            }
        }
        return count + 1;
    }

    function getAccuracy()
    {
        var count = 0;
        for(var i = 0; i<place; i++)
        {
            var span = document.getElementById('span' + i);
            if (span.style.color !== 'red')
            {
                count++;
            }
        }
        return (count / place).toFixed(3);
    }

    function scrollFunction(id)
    {
        let e = document.getElementById(id);
        e.scrollIntoView
        ({
            block: 'start',
            behavior: 'smooth',
            inline: 'start'
        });
    }

    function makeTimer()
    {
        var timeleft = 62;
        var downloadTimer = setInterval(function()
        {
            if(timeleft <= 0)
            {
                clearInterval(downloadTimer);
                endGame();
            }
            else if(timeleft <= 2)
            {
                document.getElementById("timer").innerHTML = '0:00';
                document.getElementById('timer').style.color = 'crimson';
                typing = false;
            }
            else if (timeleft < 12)
            {
                document.getElementById("timer").innerHTML = '0:0' + (timeleft - 2);
            }
            else
            {
                document.getElementById("timer").innerHTML = '0:' + (timeleft - 2);
            }
            timeleft--;
        }, 1000);
    }