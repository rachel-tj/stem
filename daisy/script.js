// it seems that these are the instance varibles
var components = {
    numRows : 11,
    numCols : 11,
    factor : 0.7,
    lives : 3
}

// starts the game!
function startGame()
{
    table = document.getElementById('field').appendChild(createTable());
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
            if (i != 0 && j != 0)
            {
                placeSquares(td);
            }
            changeColors(td, i, j);
            addCellListeners(td);
        }
        table.appendChild(row);
    }
    return table;
}

function changeColors(td, i, j)
{
    if (i === 0 || j === 0)
    {
        td.style.backgroundColor = 'rgb(0, 0, 0, 0)';
        td.style.border = 'none';
        if (j === 0)
        {
            td.style.width = '100px';
            td.style.textAlign= 'right';
            td.style.marginRight = '100px';
        }
        else
        {
            td.style.height = '60px';
            td.style.textAlign = 'bottom';
        }
    }
}

function addCellListeners(td)
{
    td.addEventListener('mousedown', function(event)
    {
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
                return;
            }
            //this.style.backgroundColor = '#E96982';
            this.style.color = 'crimson';
            components.lives--;
            this.textContent = 'X';
            this.clicked = true;
            if (components.lives === 0)
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
                if (count === 0)
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


function gameOver()
{
    components.alive = false;
    document.getElementById('lost').style.display="block";
   
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

