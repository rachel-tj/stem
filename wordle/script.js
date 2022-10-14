// it seems that these are the instance varibles

const comp = {
    word: 'bitch',
    numTrys : 6,
    numLetters : 5,
    currRow : 0,
    currLetter : 0,
    over : false,
    names : [],
}

// starts the game!
async function startGame()
{
    comp.word = await makeWord('words.txt');
    var x = document.createTextNode(comp.word + '.')
    document.getElementById('lost').appendChild(x);
    console.log(comp.word);
    document.getElementById('field').appendChild(createTable());
}


async function makeWord(filename)
{
    const rand = fetch (filename)
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
    return rand;
}



function cellID(i, j)
{
    return 'cell-' + i + '-' + j;
}

async function checkEnglish(filename, string)
{
    fetch (filename)
    .then(function(response)
    {
        return response.text();
    })
    .then(function(data)
    {
        if (data.indexOf(string) != -1)
        {
            checkLetter()
        }
        else
        {
            changeToRed();
        }
    })
}

function changeToRed()
{
    for (i = 0; i < comp.currLetter; i++)
    {
        var cellid = cellID(comp.currRow, i);
        cell = document.getElementById(cellid);
        cell.style.color = 'crimson';
    }
}





function createTable()
{
    var table, row, td, i, j;
    table = document.createElement('table');
    
    for (i=0; i<comp.numTrys; i++)
    {
        row = document.createElement('tr');
        for (j=0; j<comp.numLetters; j++)
        {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
        }
        table.appendChild(row);
    }
    addKeyListners();
    return table;
}


function addKeyListners()
{
    const keys = document.querySelectorAll('.key');
    keys.forEach(key =>
    {
        key.addEventListener('mousedown', function ()
        {
            if (key.id === 'enter')
            {
                handleEnter();
            }
            else if (key.id === 'del')
            {
                handleDelete();
            }
            else if (comp.currLetter >= 5 || comp.currRow >= 6)
            {
                return;
            }
            else
            {
                var cellid = cellID(comp.currRow, comp.currLetter++);
                cell = document.getElementById(cellid);
                if (!comp.over && comp.currLetter <= comp.numLetters)
                {
                    cell.textContent = key.id;
                }
            }
        });
    });

    addEventListener('keydown', function(event)
    {
        body = document.getElementById('body');
        num = event.key.charCodeAt();
        if (num === 66 && comp.currLetter)
        {
            handleDelete();
            return;
        }
        test: if (num >=97 && num <= 122 && !comp.over)
        {
            if (comp.currLetter >= 5 || comp.currRow >= 6)
            {
                break test;
            }
            var cellid = cellID(comp.currRow, comp.currLetter++);
            cell = document.getElementById(cellid);
            cell.textContent = event.key;
        }
        if (num === 69)
        {
            handleEnter();
        }
    });
}

function checkLetter()
{
    var i;
    var count = 0;
    for (i = 0; i < 5; i++)
    {
        var cellid = cellID(comp.currRow, i)
        var cell = document.getElementById(cellid);
        var letter = cell.textContent;
        var place = comp.word.indexOf(letter);
        var keyletter = document.getElementById(letter);
        cell.style.animation = 'fadeIn 3s'
        if (place != -1)
        {
            if (comp.word.charAt(i) === letter)
            {
                cell.style.background = 'mediumseagreen';
                keyletter.style.background = 'mediumseagreen';
                count++;
            }
            else
            {
                cell.style.background = 'gold';
                if (keyletter.style.background != 'mediumseagreen')
                {
                    keyletter.style.background = 'gold';
                }
            }
        }
        else
        {
            cell.style.background = 'lightgrey'
            keyletter.style.background = 'grey';
        }
    }
    if (count === comp.numLetters)
    {
        document.getElementById('won').style.display="block";
        document.getElementById('over').style.display="block";
        comp.over = true;
    }
    comp.currLetter = 0;
    comp.currRow++;
    if (comp.currRow === comp.numTrys && !comp.over)
    {
        comp.over = true;
        document.getElementById('lost').style.display="block";   
        document.getElementById('over').style.display="block";
    }
}

function handleEnter()
{
    if (comp.currLetter < comp.numLetters)
    {
        return;
    }
    var string = '';
    for (i = 0; i < comp.numLetters; i++)
    {
        var cellid = cellID(comp.currRow, i)
        var cell = document.getElementById(cellid);
        var letter = cell.textContent;
        string += letter
    }
   checkEnglish('words.txt', string) 
}


function handleDelete()
{
    if (!comp.currLetter)
    {
        return;
    }
    var cellid = cellID(comp.currRow, --comp.currLetter);
    cell = document.getElementById(cellid);
    cell.textContent = '';
    if (comp.currLetter === comp.numLetters - 1)
    {
        for (i = 0; i < comp.numLetters; i++)
        {
            var cellid = cellID(comp.currRow, i);
            cell = document.getElementById(cellid);
            cell.style.color = 'black';
        }
    }
}





// the game is over and all of the cells are dead :)
function gameOver()
{
    comp.over = true;
    document.getElementById('over').style.display="block";
    
}

// reload the winodw
function reload()
{
    window.location.reload();
}

// loads the game i guess
window.addEventListener('load', function()
{
    document.getElementById('over').style.display="none";
    startGame();
});
