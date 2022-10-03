// it seems that these are the instance varibles
var components = {
    numRows : 16,
    numCols : 16,
    factor : 0.7,
    lives : 3,
    alive : true,
    completed : 0,
}

// starts the game!
function startGame()
{
    table = document.getElementById('field').appendChild(createTable());
    setNumbers();
}

function setNumbers()
{
    let reverse = false;
    traverse(reverse);
    reverse = true;
    traverse(reverse);
}


function cellID(i, j)
{
    return 'cell-' + i + '-' + j;
}

// ???
function createTable()
{
    var table, row, td, i, j;
    table = document.createElement('table');
    
    for (i=0; i<components.numRows; i++)
    {
        row = document.createElement('tr');
        for (j=0; j<components.numCols; j++)
        {
            td = document.createElement('td');
            td.id = cellID(i, j);
            row.appendChild(td);
            if (i && j)
            {
                placeSquares(td);
            }
            changeColors(td, i, j);
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

function changeColors(td, i, j)
{
    if (!i|| !j)
    {
        td.style.backgroundColor = 'rgb(0, 0, 0, 0)';
        td.style.border = 'none';
        if (!j)
        {
            td.style.width = '150px';
            td.style.textAlign= 'right';
            td.style.marginRight = '100px';
        }
        else
        {
            td.style.height = '60px';
            td.style.textAlign = 'flex';
        }
    }
    if (j % 5 === 0 && i)
    {
        td.style.borderRight = '2.5px solid black';
    }
    if (i % 5 === 0 && j)
    {
        td.style.borderBottom = '2.5px solid black';
    }
}

function addCellListeners(td, i, j)
{
    td.addEventListener('mousedown', function(event)
    {
        if (!components.alive)
        {
            return;
        }
        if (event.which === 1)
        {
            if (td.textContent)
            {
                return;
            }
            if (this.bomb)
            {
                this.style.backgroundColor = 'mediumpurple';
                this.clicked = true;
                testRowBlocks(i);
                testColBlocks(j);
                return;
            }
            //this.style.backgroundColor = '#E96982';
            this.style.color = 'crimson';
            components.lives--;
            this.textContent = 'X';
            if (!components.lives)
            {
                gameOver();
                return;
            }
        }
        else if (event.which === 3 && !this.clicked)
        {
            if (!this.flagged)
            {
                this.flagged = true;
                this.textContent = 'X';
            }
            else
            {
                this.flagged = false;
                this.textContent = '';
            }
        }
        td.oncontextmenu = function()
        { 
            return false; 
        };

    });
}

function placeSquares(td)
{
    number = Math.random();
    if (number <= components.factor)
    {
        td.bomb = true;
    }
}

function traverse(reverse)
{
    var i, j;
    let count = 0;
    for (i = 0; i< components.numRows; i++)
    {
        var add = '';
        for (j = 0; j< components.numCols; j++)
        {
            if (reverse)
            {
                var cellid = cellID(j, i);
            }
            else
            {
                var cellid = cellID(i, j);
            }
            cell = document.getElementById(cellid);
            if (cell.bomb)
            {
                //cell.style.backgroundColor = 'yellow';
                count++;
            }
            else
            {
                if (!count)
                    continue;
                add += count + ' ';
                count = 0;
            }
        }
        if (count)
            add += count;
        if (reverse)
        {
            zerocell = document.getElementById(cellID(0, i));
            zerocell.textContent = add
        }
        else
        {
            zerocell = document.getElementById(cellID(i, 0));
            zerocell.textContent = add
        }
        count = 0;
    }

}

function testRowBlocks(row)
{
    var i;
    for (i = 0; i < components.numCols; i++)
    {
        var cellid = cellID(row, i);
        cell = document.getElementById(cellid);
        if (cell && cell.bomb)
        {
            if (!cell.clicked)
            {
                return;
            }
        }
    }
    zerocell = document.getElementById(cellID(row, 0));
    zerocell.style.color = 'dimgrey';
    components.completed++;
    for (i = 1; i < components.numCols; i++)
    {
        var cellid = cellID(row, i);
        cell = document.getElementById(cellid);
        if (!cell.bomb)
        {
            cell.textContent = 'X';
        }
    }
}

function testColBlocks(col)
{
    var i;
    for (i = 0; i < components.numRows; i++)
    {
        var cellid = cellID(i, col);
        cell = document.getElementById(cellid);
        if (cell && cell.bomb)
        {
            if (!cell.clicked)
            {
                return;
            }
        }
    }
    zerocell = document.getElementById(cellID(0, col));
    zerocell.style.color = 'dimgrey';
    components.completed++;
    for (i = 1; i < components.numRows; i++)
    {
        var cellid = cellID(i, col);
        cell = document.getElementById(cellid);
        if (!cell.bomb)
        {
            cell.textContent = 'X';
        }
    }
    if (components.completed === (components.numRows + components.numCols - 2))
    {
        gameOver();
    }
}


function gameOver()
{
    components.alive = false;
    if (components.lives)
    {
        document.getElementById('won').style.display="block";
    }
    else
    {
        document.getElementById('lost').style.display="block";
    }
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
    document.getElementById('lost').style.display="none";
    startGame();
});

