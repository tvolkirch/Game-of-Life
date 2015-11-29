
var isLiveCellStillAlive = function(liveNeighborCount)
{
    return (liveNeighborCount === 2 || liveNeighborCount === 3);
};

var isDeadCellRevived = function(liveNeighborCount)
{
    return (liveNeighborCount === 3);
};

var getCellStatus = function(liveCells, row, col)
{
    return liveCells[[row,col]];
};

var getLiveNeighborCount = function(liveCells, row, col)
{
    var i, j;
    var liveNeighborCount = 0;
    
    for (i = row-1; i <= row+1; i++)
    {
        for (j = col-1; j <= col+1; j++)
        {
            if (i === row && j === col) { continue; }
            
            if ( getCellStatus(liveCells, i, j) ) { liveNeighborCount++; }
        }
    }
    
    return liveNeighborCount;
};

var getNextGeneration = function(liveCells)
{
    var nextGenLiveCells = new Array();
    var row, col, i, j, killIndex;
    var liveNeighborCount;
    
    for ( key in liveCells )
    {
        keyArray = key.split(",");
        row = window.parseInt(keyArray[0]);
        col = window.parseInt(keyArray[1]);
        
        for ( i = row-1; i <= row+1; i++)
        {
            for ( j = col-1; j <= col+1; j++)
            {
                if (i === row && j === col)
                {
                    liveNeighborCount = getLiveNeighborCount(liveCells, row, col);
                    
                    if ( isLiveCellStillAlive(liveNeighborCount) ) 
                    { 
                        nextGenLiveCells[[row,col]] = true;
                    }
                }
                else
                {
                    if ( !nextGenLiveCells[[i,j]] && !liveCells[[i,j]] )
                    {
                        liveNeighborCount = getLiveNeighborCount(liveCells, i, j);
                        
                        if ( isDeadCellRevived(liveNeighborCount) )
                        {
                            nextGenLiveCells[[i,j]] = true;
                        }
                    }
                }
            }
        }
    }
    
    return nextGenLiveCells;
};
