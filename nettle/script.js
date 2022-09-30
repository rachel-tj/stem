// it seems that these are the instance varibles
var components = {
    numRows : 12,
    numCols : 24,
    numBombs : 40,
    numFlags : 0,
    bomb : '💣',
    flag : '🚩',
    mousewhiches : 4,
    alive : true,
    colors : {1: 'blue', 2: 'green', 3: 'red', 4: 'purple', 5: 'maroon', 6: 'turquoise', 7: 'black', 8: 'grey'}
}

// starts the game!
function startGame()
{
    components.bombs = placeBombs();
    document.getElementById('field').appendChild(createTable());
}

// ???
function placeBombs() {
    var i, rows = [];
    
    for (i = 0; i < components.numBombs; i++)
    {
        placeSingleBomb(rows);
    }
    return rows;
} 

// ???
function placeSingleBomb(bombs)
{
    var nrow, ncol, row, col;
    nrow = Math.floor(Math.random() * components.numRows);
    ncol = Math.floor(Math.random() * components.numCols);
    row = bombs[nrow];
    
    if (!row)
    {
        row = [];
        bombs[nrow] = row;
    }
    
    col = row[ncol];
    
    if (!col)
    {
        row[ncol] = true;
        return
    } 
    else
    {
        placeSingleBomb(bombs);
    }
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
            addCellListeners(td, i, j);
        }
        table.appendChild(row);
    }
    return table;
}

function addCellListeners(td, i, j)
{
    // adding some event listeners
    td.addEventListener('mousedown', function(event)
    {
        // checking if the game is over
        if (!components.alive)
        {
            return;
        }
        components.mousewhiches += event.which;
        // seeing if it's a right click
        if (event.which === 3 && !this.clicked)
        {
            // going from flagged to unflagged
            if (this.flagged == true)
            {
                this.flagged = false;
                this.textContent = '';
                return;
            }
            // going from unflagged to flagged
            else
            {
                this.flagged = true;
                this.textContent = components.flag;
                return;
            }
        }
        // if it's flagged we leave it alone
        if (this.flagged == true)
        {
            return;
        }
        // otherwise we change the color!
        this.style.backgroundColor = 'thistle';
    });


    td.addEventListener('mouseup', function(event)
    {
        // ignore it if the game is over 
        if (!components.alive) {
            return;
        }

        // ???
        if (this.clicked && components.mousewhiches == 4) {
            performMassClick(this, i, j);
        }


        // ???
        components.mousewhiches = 0;
        
        // it's a right click
        if (event.which === 3)
        {
            // make the click not count
            event.preventDefault();
            event.stopPropagation();
          
          //  return false;
        } 
        // it's not a right click
       else
        {
            handleCellClick(this, i, j);
        }
    });

    // make it not click the context menu lolz
    td.oncontextmenu = function() { 
        return false; 
    };
}

// it will be handled.
function handleCellClick(cell, i, j)
{
    // if the game is over, we don't care
    if (!components.alive)
    {
        return;
    }

    // nothing to handle if it's a flag!
    if (cell.flagged)
    {
        return;
    }

    // turn it into a clicked cell duh
    cell.clicked = true;

    // there is a bomb here
    if (components.bombs[i][j])
    {
        cell.style.backgroundColor = 'lightcoral';
        cell.textContent = components.bomb;
        gameOver();
    }
    // there is not a bomb here
    else
    {
        cell.style.backgroundColor = 'thistle'
        numBombs = adjacentBombs(i, j);

        // seeing if there is a nonzero number of bombs around
        if (numBombs)
        {
            cell.style.color = components.colors[numBombs];
            cell.textContent = numBombs;
        } 
        // this is the mass click thingie (no adjacent bombs)
        else
        {
            clickAdjacentBombs(i, j);
        }
    }
}

// returns the number of adjacent bombs
function adjacentBombs(row, col)
{
    var i, j, numBombs;
    numBombs = 0;

    // check the rows for bombs
    for (i=-1; i<2; i++)
    {
        //check the columns
        for (j=-1; j<2; j++)
        {
            // ???
            if (components.bombs[row + i] && components.bombs[row + i][col + j])
            {
                numBombs++;
            }
        }
    }
    return numBombs;
}


// returns the number of adjacent flags
function adjacentFlags(row, col) {
    var i, j, numFlags;
    numFlags = 0;

    // traverse blah blah
    for (i=-1; i<2; i++)
    {
        for (j=-1; j<2; j++)
        {
            cell = document.getElementById(cellID(row + i, col + j));
            // cell is not null and there's a flag here
            if (!!cell && cell.flagged)
            {
                numFlags++;
            }
        }
    }
    return numFlags;
}

function clickAdjacentBombs(row, col)
{
    var i, j, cell;
    // going through the range -1 to 1 of the cell row
    for (i=-1; i<2; i++)
    {
        // same thing but the column
        for (j=-1; j<2; j++)
        {
            // this means we are at the cell
            if (i === 0 && j === 0)
            {
                continue;
            }
            cell = document.getElementById(cellID(row + i, col + j));
            // there's a cell here, it's not clicked or flagged
            if (!!cell && !cell.clicked && !cell.flagged)
            {
                handleCellClick(cell, row + i, col + j);
            }
        }
    }
}

// ???
function performMassClick(cell, row, col)
{
    if (adjacentFlags(row, col) === adjacentBombs(row, col))
    {
        clickAdjacentBombs(row, col);
    }
}

// the game is over and all of the cells are dead :)
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
