// it seems that these are the instance varibles

var comp = {
    numTrys : 6,
    numLetters : 5,
    word : 'qanon',
    currRow : 0,
    currLetter : 0,
}

// starts the game!
function startGame()
{
    document.getElementById('field').appendChild(createTable());
}


function cellID(i, j)
{
    return 'cell-' + i + '-' + j;
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
            var cellid = cellID(comp.currRow, comp.currLetter++);
            cell = document.getElementById(cellid);
            cell.textContent = key.id;
        });
    });

    addEventListener('keydown', function(event)
    {
        body = document.getElementById('body');
        num = event.key.charCodeAt();
        if (num === 66 && comp.currLetter)
        {
            var cellid = cellID(comp.currRow, --comp.currLetter);
            cell = document.getElementById(cellid);
            cell.textContent = '';
            return;
        }
        test: if (num >= 97 && num <=122)
        {
            if (comp.currLetter >= 5 || comp.currRow >= 6)
            {
                console.log('break');
                break test;
            }
            var cellid = cellID(comp.currRow, comp.currLetter++);
            cell = document.getElementById(cellid);
            cell.textContent = event.key;
        }
        if (num === 69)
        {
            console.log('skgs');
            if (comp.currLetter < comp.numLetters)
            {
                return;
            }
            console.log('cehcl');
            checkLetter();
            if (comp.currRow === comp.numTrys)
            {
                document.getElementById('lost').style.display="block";   
                document.getElementById('over').style.display="block";
            }
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
            if (place == i)
            {
                cell.style.background = 'mediumseagreen';
                keyletter.style.background = 'mediumseagreen';
                count++;
            }
            else
            {
                cell.style.background = 'gold';
                keyletter.style.background = 'gold';
            }
        }
        else
        {
            cell.style.background = 'lightgrey'
            keyletter.style.background = 'grey';
        }
    }
    console.log(count);
    if (count === comp.numLetters)
    {
        document.getElementById('won').style.display="block";
        document.getElementById('over').style.display="block";
    }
    comp.currLetter = 0;
    comp.currRow++;
    console.log('retunr')
}





// the game is over and all of the cells are dead :)
function gameOver()
{
    comp.alive = false;
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
