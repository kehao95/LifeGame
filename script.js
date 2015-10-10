var rowCount,columnCount,matrix,running
    running  = false
    dead = false
    alive = true
    cellSize = 7
    canvas =null
    drawingContext=null
    ///
    aliveStyle = "#000000"
    deadStyle = "#FFFFFF"
    wallStyle = "#000088"
    seedProbability = 0.5

    function stop(){
        if(running){
            running  = false
            $("#stop").text("开始")
        }
        else{
            running  = true
            $("#stop").text("暂停")
            loop()
        }
    }

    function reload(){
        rowCount = $("#rowCount").val()
        columnCount = $("#columnCount").val()
        function set_matrix(){
            matrix = new Array(rowCount+2)
            for (var i = rowCount+1; i >= 0; i--) {
                matrix[i] = new Array(columnCount+2)
                for (var j = columnCount+1; j >= 0; j--) {
                    matrix[i][j] = (Math.random() < seedProbability)
                };
            };
        }       
        function set_map(){
            var map = $("#map")
            map.empty();
            canvas = document.createElement('canvas')
            map.append(canvas)
            drawingContext = canvas.getContext("2d")
            canvas.width = cellSize * rowCount
            canvas.height = cellSize * columnCount
            draw_grid()            
        }
        set_matrix()
        set_map()      
        canvas.addEventListener('click', function(evt) {
            var mousePos = getMousePos(canvas, evt);
            alert("x: "+ mousePos.x+" y:"+mousePos.y)
        }, false);  
        running = true
        stop()
    }

    function clean(){
        reload()
    }


    function loop() {
        if(false == running){
            return
        }
        function envolve_cells(){
            // set the temp matrix
            matrix_t = new Array(rowCount+2)
            for (var i = rowCount+1; i >= 0; i--) {
                matrix_t[i] = new Array(columnCount+2)
                for (var j = columnCount+1; j >= 0; j--) {
                    matrix_t[i][j] = 0;
                };
            };  
            for (x=1;x<=rowCount;x++){
                for(y=1;y<=columnCount;y++){
                    if (matrix[x][y] == alive){
                        matrix_t[x-1][y-1]++
                        matrix_t[x-1][y  ]++
                        matrix_t[x-1][y+1]++
                        matrix_t[x  ][y-1]++
                        matrix_t[x  ][y+1]++
                        matrix_t[x+1][y-1]++
                        matrix_t[x+1][y  ]++
                        matrix_t[x+1][y+1]++
                    }
                }
            }
            for (x=1;x<=rowCount;x++){
                for(y=1;y<=columnCount;y++){
                    if (matrix_t[x][y] == 2){

                    }
                    else if (matrix_t[x][y] == 3){
                        matrix[x][y] = alive
                    }
                    else{
                        matrix[x][y] = dead
                    }
                }
            }       
        }
        function draw_cell(){
        drawingContext.fillStyle = deadStyle
        drawingContext.fillRect(0, 0, canvas.width,canvas.height)
            for (row=1;row<=rowCount;row++){
                for(col=1;col<=columnCount;col++){
                    ///
                    x = (row-1)*cellSize
                    y = (col-1)*cellSize
                    if (matrix[row][col] == alive){
                        drawingContext.fillStyle = aliveStyle
                    }
                    else if (matrix[row][col] == dead){
                        continue;
                        drawingContext.fillStyle = deadStyle
                    }
                    else{
                        drawingContext.fillStyle = wallStyle
                    }
                    drawingContext.fillRect(x, y,cellSize,cellSize)    
                }
            }
        }
       
        envolve_cells()        
        draw_cell()
        draw_grid()
        setTimeout(function () {
            loop();
        }, 100);
    }
    function Click(x,y){
        //if(true == running){return}
        id  = "#"+x+"_"+y
        pix = $(id)
        matrix[x][y] = !matrix[x][y]

        pix.toggleClass("alive dead")
    }
    function draw_grid(){
        /*
        for (var col = 0; col <= columnCount; col++) {
            for (var row = 0; row <= rowCount; row++) {
                x = row * cellSize;
                y = col * cellSize;
                drawingContext.strokeStyle = 'rgba(80,80,80, 0.6)'
                drawingContext.strokeRect(x, y, cellSize, cellSize)
            }             
        };
        */
        drawingContext.strokeStyle = 'rgba(80,80,80, 0.6)'
        for (var col = 0; col <= columnCount; col++) {
            drawingContext.moveTo(0, col * cellSize)
            drawingContext.lineTo(canvas.width, col * cellSize)
        }
        for (var row = 0; row <= rowCount; row++) {
            drawingContext.moveTo(row * cellSize,0)
            drawingContext.lineTo(row * cellSize,canvas.height )
        }
        drawingContext.lineWidth =1
        drawingContext.stroke()

    }
    function getMousePos(canvas, event)
    {
        var mouseX = event.pageX - canvas.offsetLeft;
        var mouseY = event.pageY - canvas.offsetTop;
        return {
            x: mouseX,
            y: mouseY };
    }
