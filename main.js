const PLAYER_TOKEN = 'fa-times';
const AI_TOKEN = 'fa-circle-o';

let human = false;
let ai = false;

$(document).ready(function() {

    let grid = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]

    function restart() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                grid[i][j] = '';
                $('.inner-cell[data-i=' + i + '][data-j=' + j + ']').removeClass('fa-times fa-circle-o red green pointer');
            }
        }

    }

    function outputString(output) {
        $('.output').html(output);
    }

    function colorCells(winner, ai, aj, bi, bj, ci, cj) {
        let color = '';
        winner == PLAYER_TOKEN ? color = 'green' : color = 'red';
        //Color cells
        $('.inner-cell[data-i=' + ai + '][data-j=' + aj + ']').addClass(color);
        $('.inner-cell[data-i=' + bi + '][data-j=' + bj + ']').addClass(color);
        $('.inner-cell[data-i=' + ci + '][data-j=' + cj + ']').addClass(color);
    }

    // check if game over
    function isGameOver() {

        //check horizontal
        for (var i = 0; i < 3; i++) {
            if (grid[i][0] !== '' &&
                grid[i][0] === grid[i][1] &&
                grid[i][0] === grid[i][2]) {
                colorCells(grid[i][0], i, 0, i, 1, i, 2);
                return grid[i][0];
            }
        }

        //check vertical
        for (var j = 0; j < 3; j++) {
            if (grid[0][j] !== '' &&
                grid[0][j] === grid[1][j] &&
                grid[0][j] === grid[2][j]) {
                colorCells(grid[0][j], 0, j, 1, j, 2, j);
                return grid[0][j];
            }
        }

        //check diagonal- top left bottom right
        if (grid[0][0] !== '' &&
            grid[0][0] === grid[1][1] &&
            grid[0][0] === grid[2][2]) {
            colorCells(grid[0][0], 0, 0, 1, 1, 2, 2);
            return grid[0][0];
        }


        //check diagonal- bottom left top right
        if (grid[2][0] !== '' &&
            grid[2][0] === grid[1][1] &&
            grid[2][0] === grid[0][2]) {
            colorCells(grid[2][0], 2, 0, 1, 1, 0, 2);
            return grid[0][2];
        }

        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                return false;
            }
        }

        return null;
    }

    function moveAI() {
        setTimeout(function() {
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 3; j++) {
                    if (grid[i][j] === '') {

                        grid[i][j] = AI_TOKEN;

                        $('.inner-cell[data-i=' + i + '][data-j=' + j + ']').addClass(AI_TOKEN);
                        human = true;
                        let gameState = isGameOver();

                        if (gameState) {
                            human = false;
                            setTimeout(function() {
                                $('.output').html("the winner is:" + gameState);
                            }, 500);
                        }
                        outputString('Go.');

                        return {
                            i: i,
                            j: j
                        };
                    }
                }
            }
        }, 500);
        return null;
    }


    //On cell click
    $('.inner-cell').click(function() {

        //Save block i and j index
        const i = $(this).data('i');
        const j = $(this).data('j');

        //if is empty
        if (grid[i][j] === '' && human) {
            human = false;
            //Display X on click
            $(this).removeClass("hover pointer");
            $(this).addClass(PLAYER_TOKEN);


            //Save token in the grid
            grid[i][j] = PLAYER_TOKEN;


            let gameState = isGameOver();

            if (gameState) {
                //is game over display results 
                setTimeout(function() {
                    $('.output').html("the winner is:" + gameState);
                }, 500);

            } else {
                outputString('Wait.');
                // ai turn
                moveAI();

            }

        }
    });


    $(".fa-user").click(function() {
        human = true;
        restart()
        outputString('Go.');
    });
    $(".fa-desktop").click(function() {
        restart()
        outputString('Wait.');
        moveAI();

    });

    //On mouse hover 
    $(".inner-cell").hover(function() {
        //Add hover class and X
        if (human && grid[$(this).data('i')][$(this).data('j')] === '')
            $(this).addClass("hover fa-times pointer");
    }, function() {
        //Remove hover class and X
        if (human && grid[$(this).data('i')][$(this).data('j')] === '')
            $(this).removeClass("hover fa-times pointer");
    });

});