
var isLiveCellStillAlive = function(liveNeighborCount)
{
    return (liveNeighborCount === 2 || liveNeighborCount === 3);
};

var isDeadCellRevived = function(liveNeighborCount)
{
    return (liveNeighborCount === 3);
};

var getCellStatus = function(grid, row, col)
{
    if ( window.isNaN(row) || window.isNaN(col) )
    {
        return false;
    }
    else
    {
        return grid[[row,col]];
    }
};

var getLiveNeighborCount = function(grid, row, col)
{
    var i, j;
    var liveNeighborCount = 0;
    
    for (i = row-1; i <= row+1; i++)
    {
        for (j = col-1; j <= col+1; j++)
        {
            if (i === row && j === col) { continue; }
            
            if ( getCellStatus(grid, i, j) ) { liveNeighborCount++; }
        }
    }
    
    return liveNeighborCount;
};

var getLiveNeighborCountOfLiveCell = function(grid, row, col)
{
    return getLiveNeighborCount(grid, row, col);
};

var getLiveNeighborCountOfDeadNeighborCell = function(grid, row, col)
{
    return getLiveNeighborCount(grid, row, col);
};

var getNextGeneration = function(grid)
{
    var nextGenGrid = new Array();
    var visitedDeadNeighbors = new Array();
    var row, col, i, j;
    var liveNeighborCount;
    
    for ( key in grid )
    {
        keyArray = key.split(",");
        row = window.parseInt(keyArray[0]);
        col = window.parseInt(keyArray[1]);
        
        if ( window.isNaN(row) || window.isNaN(col) )
        {
            return new Array();
        }
       
        for ( i = row-1; i <= row+1; i++)
        {
            for ( j = col-1; j <= col+1; j++)
            {
                if (i === row && j === col)
                {
                    liveNeighborCount = getLiveNeighborCountOfLiveCell(grid, row, col);
                    
                    if ( isLiveCellStillAlive(liveNeighborCount) ) 
                    { 
                        nextGenGrid[[row,col]] = true;
                    }
                }
                else
                {
                    if ( !grid[[i,j]] && !visitedDeadNeighbors[[i,j]] )
                    {
                        visitedDeadNeighbors[[i,j]] = true;
                        liveNeighborCount = getLiveNeighborCountOfDeadNeighborCell(grid, i, j);
                        
                        if ( isDeadCellRevived(liveNeighborCount) )
                        {
                            nextGenGrid[[i,j]] = true;
                        }
                    }
                }
            }
        }
    }
    
    return nextGenGrid;
};

var createNewGrid = function()
{
    return new Array();
};

var createNewCell = function(xCoordinate, yCoordinate)
{
    return [xCoordinate, yCoordinate];
};

var addLiveCell = function(grid, liveCell)
{
    grid[ liveCell ] = true;
};

var addDeadCell = function(grid, deadCell)
{
    // do nothing -> grid cells are dead by default
};
