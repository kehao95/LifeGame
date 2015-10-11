var chai = require('chai');
var expect = require('chai').expect;
var file = require('./logic.js');


describe('check_function', function(){
    it('setTimer', function(){
        expect(file.set_timer(0)).to.equal(false);
        expect(file.set_timer(-1)).to.equal(false);
        expect(file.set_timer("d")).to.equal(false);
        expect(file.set_timer(200)).to.equal(200);
        expect(file.set_timer(155.5)).to.equal(155.5);
    })
    
    it('setSeedProbability', function(){
        expect(file.set_seedProbability(0)).to.equal(false);
        expect(file.set_seedProbability(1)).to.equal(false);
        expect(file.set_seedProbability("d")).to.equal(false);
        expect(file.set_seedProbability(200)).to.equal(false);
        expect(file.set_seedProbability(0.5)).to.equal(0.5);
        expect(file.set_seedProbability(0.333)).to.equal(0.333);
    })
    
    it('setRowAndColumn', function(){
        expect(file.set_RandC(0,0)).to.equal(false);
        expect(file.set_RandC(-1, 1)).to.equal(false);
        expect(file.set_RandC(10,"d")).to.equal(false);
        expect(file.set_RandC("d",10)).to.equal(false);
        expect(file.set_RandC("d","d")).to.equal(false);
        expect(file.set_RandC(10.5,50)).to.equal(false);
        expect(file.set_RandC(200,1)).to.equal(true);
        expect(file.set_RandC(50,50)).to.equal(true);
    })
    it('stop',function(){
        running  = true
        expect(file.stop(running)).to.equal(false)
        running  = false
        expect(file.stop(running)).to.equal(true)

    })
    it('set_matrix',function(){
        matrix =[]
        rowCount=50;columnCount =50 ;seedProbability = 0.5
        matrix = file.set_matrix(matrix,rowCount,columnCount,seedProbability)
        expect((function(){
            alive = 0;total = 0;
            for(var i = 0, length1 = matrix.length; i < length1; i++){
                for(var j = 0, length2 = matrix[i].length; j < length2; j++){
                    total+=1
                    if(matrix[i][j]){
                        alive+=1
                    }
                }
            }
            return (alive/total<0.8 && alive/total>0.2) 
        })()).to.equal(true)

    })
    it("envolve_cells",function(){
        dead = 0
        alive = 1
        function matrix_equal(a,b){
        	flag =true
        	for(var i = 0, length1 = a.length; i < length1; i++){
        		for(var j = 0, length2 = a[i].length; j < length2; j++){
        			if(a[i][j] != b[i][j]){flag = true}
        		}
        	}
        	return flag
        }
        s1=[[1,0,0,1,0,1,0,1,1,1],[1,1,1,0,1,1,1,1,0,1],[1,1,1,1,0,1,0,1,0,1],[1,1,1,1,0,1,1,0,0,0],[0,1,1,1,0,1,1,1,0,0],[0,1,0,0,1,1,0,1,1,1],[0,1,0,1,0,1,0,1,0,0],[1,1,1,1,1,1,0,1,1,0],[1,1,1,1,1,1,1,1,1,0],[0,0,1,1,0,1,1,0,0,0]]
        s2=[[0,0,0,1,0,0,0,0,0,1],[1,1,0,0,0,0,1,1,1,1],[1,1,1,1,0,0,1,1,1,0],[1,1,0,0,0,1,1,1,1,1],[1,0,1,1,0,1,0,0,1,1],[1,1,0,0,1,1,1,1,0,0],[1,0,1,1,1,1,1,1,0,0],[1,0,1,1,1,1,0,0,1,0],[0,0,1,0,0,0,0,1,0,1],[0,0,0,1,0,0,0,0,1,1]]
        s3=[[1,0,0,0,0,0,1,1,1,0],[1,1,1,0,0,1,0,1,1,0],[0,0,1,0,0,0,1,0,0,1],[0,1,1,0,1,1,1,1,1,0],[0,0,1,0,0,1,1,1,0,1],[1,1,0,1,1,0,1,1,1,1],[0,0,1,1,1,1,0,1,1,0],[1,0,0,0,0,1,0,1,1,0],[0,1,1,1,1,1,1,0,0,1],[1,1,0,0,1,0,1,1,1,0]]
        s4=[[0,0,0,0,0,1,1,1,1,1],[1,1,0,0,0,0,0,0,0,0],[1,1,0,0,0,0,1,0,0,1],[1,0,1,0,0,1,1,0,0,1],[1,0,0,1,1,0,1,0,0,1],[0,0,1,0,1,1,0,1,0,0],[1,1,0,0,0,0,1,1,1,1],[1,0,1,1,0,0,0,1,0,0],[1,0,0,1,1,1,1,1,0,0],[1,0,0,0,1,1,1,0,1,1]]
        s5=[[1,1,1,1,1,1,0,1,0,0],[0,0,1,0,0,0,0,1,0,0],[0,0,1,1,0,0,0,1,1,0],[0,0,1,0,1,1,1,0,1,1],[0,1,0,1,1,0,1,0,1,1],[0,1,1,0,0,0,0,1,0,1],[1,0,0,0,1,1,1,0,1,1],[0,0,1,1,1,1,1,1,0,0],[0,0,1,0,1,1,0,1,0,0],[1,1,0,1,0,1,1,1,0,1]]
        e1=[[1,0,0,1,0,1,0,1,1,1],[1,1,1,0,1,1,1,1,0,1],[1,1,1,0,0,0,0,0,0,0],[1,1,1,0,0,0,0,1,1,1],[0,1,1,0,0,0,0,0,0,1],[0,1,1,0,0,0,0,0,0,0],[0,1,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,1],[1,1,0,0,0,0,0,0,0,1],[0,0,0,0,0,0,0,0,0,0]]
        e2=[[0,0,0,0,0,1,1,1,0,0],[0,0,1,0,1,1,1,1,0,1],[0,1,0,1,0,1,0,1,0,0],[0,0,0,1,1,1,0,1,0,0],[1,0,0,0,0,1,1,1,0,0],[1,0,0,0,0,1,0,1,1,1],[1,0,0,1,0,1,1,0,1,1],[0,1,0,0,0,1,0,1,1,0],[0,0,1,0,1,0,1,0,0,1],[0,1,1,0,0,1,0,0,1,1]]
        e3=[[0,0,0,0,1,1,1,1,1,1],[0,0,0,1,1,0,0,1,0,0],[1,0,1,1,0,0,1,1,1,1],[1,0,1,0,1,1,0,0,1,1],[1,1,0,1,0,0,0,0,0,1],[0,0,0,1,0,1,0,1,1,1],[1,0,1,0,0,0,1,0,0,1],[0,0,1,0,0,1,0,0,0,1],[0,0,0,1,0,1,0,1,0,0],[0,1,0,0,1,0,0,0,0,1]]
        e4=[[0,1,0,0,1,1,0,1,0,1],[0,1,1,0,1,0,1,1,0,0],[0,1,1,1,0,1,1,1,1,1],[1,0,1,1,1,0,0,0,0,1],[1,1,1,0,0,0,0,0,1,0],[0,0,0,0,1,0,1,1,0,1],[1,0,0,0,1,0,1,1,1,0],[1,1,1,0,0,0,0,1,0,1],[0,0,0,0,1,1,0,1,1,1],[0,0,0,0,1,0,1,0,1,0]]
        e5=[[1,1,0,1,0,0,0,0,1,1],[0,1,1,0,0,1,0,0,0,0],[0,1,0,1,1,0,1,0,0,0],[1,0,0,0,1,0,1,1,1,1],[1,0,1,0,1,1,1,0,1,1],[1,1,0,0,1,1,1,1,1,1],[0,1,0,0,0,1,0,1,0,1],[0,0,0,1,1,1,1,0,1,1],[0,1,1,1,1,1,1,1,0,1],[1,0,1,0,0,1,1,1,1,1]]

        expect(matrix_equal(file.envolve_cells(s1,8,8),e1)).to.equal(true);
        expect(matrix_equal(file.envolve_cells(s2,8,8),e2)).to.equal(true);
        expect(matrix_equal(file.envolve_cells(s3,8,8),e3)).to.equal(true);
        expect(matrix_equal(file.envolve_cells(s4,8,8),e4)).to.equal(true);
        expect(matrix_equal(file.envolve_cells(s5,8,8),e5)).to.equal(true);

    })
	it('loop',function(){
        running  = true
        expect(file.loop(running)).to.equal(true)
        running  = false
        expect(file.loop(running)).to.equal(false)

    })

})
describe('check_logic',function(){
    it('changeMode',function(){
        cell_mode = 0
        wall_mode = 1
        expect(file.change_mode(cell_mode)).to.equal(wall_mode)
        expect(file.change_mode(wall_mode)).to.equal(cell_mode)
        expect(file.change_mode(null)).to.equal(null)
    })
    it('clickCell',function(){
        dead = 0;alive = 1;wall = 2;cell_mode = 0;wall_mode = 1
        matrix = [[],[[],dead,alive,wall],[[],dead,alive,wall]]
        expect(file.click_cell(0,0,cell_mode,matrix)).to.equal(alive)
        expect(file.click_cell(0,1,cell_mode,matrix)).to.equal(dead)
        expect(file.click_cell(0,2,cell_mode,matrix)).to.equal(alive)

        expect(file.click_cell(1,0,wall_mode,matrix)).to.equal(wall)
        expect(file.click_cell(1,1,wall_mode,matrix)).to.equal(wall)
        expect(file.click_cell(1,2,wall_mode,matrix)).to.equal(dead)
    })

})

