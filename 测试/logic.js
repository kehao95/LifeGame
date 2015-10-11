var rowCount,columnCount,matrix,running
    running  = false
    dead = 0
    alive = 1
    wall = 2

    cellSize = 13
    canvas =null
    drawingContext=null
    ///
    aliveStyle = "#000000"
    deadStyle = "#FFFFFF"
    wallStyle = "#000088"
    seedProbability = 0.5
    mode = 0  //0为设置细胞模式，1为设置墙模式
    cell_mode = 0
    wall_mode = 1
    timer = 300 //刷新周期（ms）
    DX = [ 0, 0, 0, 0,-2,-1, 1, 2]
    DY = [-2,-1, 1, 2, 0, 0, 0, 0]

	exports.set_RandC = function(r, c){
		var rowCount_t = Number(r)
		var columnCount_t = Number(c)
        if (isNaN(rowCount_t) || isNaN(columnCount_t)){
            //alert("请输入正整数！")
            return false
        }
        else if (rowCount_t <= 0 || columnCount_t <= 0 || parseInt(rowCount_t)!=rowCount_t || parseInt(columnCount_t)!=columnCount_t){
            //alert("请输入正整数！")
            return false
        }
		else
		{
			rowCount = rowCount_t
			columnCount = columnCount_t
			return true
		}	
	}
	
    exports.stop =function(running){
        if(running){
            running  = false
        }
        else{
            running  = true
            //loop()
        }
        return running
    }
    
    exports.change_mode=function(mode){
        cell_mode = 0
        wall_mode = 1
        if (mode == cell_mode){
            mode = wall_mode
        }
        else if (mode == wall_mode){
            mode = cell_mode
        }
        return mode
    }

    
	exports.set_seedProbability = function(input)
	{
		var seedProbability_t = input
        if (isNaN(seedProbability_t)){
            //alert("请输入一个大于0小于1的数！")
            return false
        }
        else if (seedProbability_t <= 0 || seedProbability_t >=1){
            //alert("请输入一个大于0小于1的数！")
            return false
        }
		else
		{
			seedProbability = seedProbability_t
			return seedProbability
		}
	}
	
    exports.set_matrix = function(matrix,rowCount,columnCount,seedProbability){
            matrix = new Array(rowCount+2)
            for (var i = rowCount+1; i >= 0; i--) {
                matrix[i] = new Array(columnCount+2)
                for (var j = columnCount+1; j >= 0; j--) {
                    matrix[i][j] = (Math.random() < seedProbability)
                };
            };
            return matrix
        }     

    exports.random_set = function(){
        rowCount = $("#rowCount").val()
        columnCount = $("#columnCount").val()
		
        
          
        set_matrix()     
        running = true
        exports.draw_cell()
        exports.draw_grid()
        stop()
    }

    exports.clean=function(){
        reload()
        return true
    }

    exports.set_timer = function(input)
	{
        var timer_t = input
        if (isNaN(timer_t)){
            //alert("请输入一个大于0的数！")
            return false
        }
        else if (timer_t <= 0){
            //alert("请输入一个大于0的数！")
            return false
        }
        else{
            timer = timer_t
			return timer
        }
    }

    exports.envolve_cells = function(matrix,rowCount,columnCount){
            // set the temp matrix
            matrix_t = new Array(rowCount+4)
            for (var i = rowCount+3; i >= 0; i--) {
                matrix_t[i] = new Array(columnCount+4)
                for (var j = columnCount+3; j >= 0; j--) {
                    matrix_t[i][j] = 0;
                };
            };  
            for (var x=2;x<=rowCount+1;x++){
                for(var y=2;y<=columnCount+1;y++){
                    if (matrix[x][y] == alive){
                        
                        for (var i = 0; i < 8; i++){
                            matrix_t[x+DX[i]][y+DY[i]]++
                        }
                        
                    }
                }
            }
            for (var x=2;x<=rowCount+1;x++){
                for(var y=2;y<=columnCount+1;y++){
                    if ((matrix[x][y] == wall) ||(matrix_t[x][y] == 2)){
                        continue
                    }
                    else if (matrix_t[x][y] == 3){
                        matrix[x][y] = alive
                    }
                    else{
                        matrix[x][y] = dead
                    }
                }
            }
            return matrix
        } 

    exports.loop =function(running) {
        if(false == running){
            return false
        }
        
        //exports.envolve_cells()        
        //draw_cell()
        //draw_grid()
        setTimeout(function () {
            return true
        }, timer);
        return true
    }
     exports.click_cell =function(x,y,mode,matrix){
        if (mode == cell_mode){
            if(matrix[x+1][y+1] == alive){
                matrix[x+1][y+1] = dead
            }
            else
            {
                 matrix[x+1][y+1] = alive
            }
        }
        if (mode == wall_mode){
            if(matrix[x+1][y+1] == wall){
                matrix[x+1][y+1] = dead
            }
            else
            {
                 matrix[x+1][y+1] = wall
            }
        }
        return  matrix[x+1][y+1]
                 
    }