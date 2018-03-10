/** To-Do
Comment
**/

var ROW = 0;
var COLOR = 0;
var COLUMN= 1;
var PIECE = 1;
var KINGMOVES = [[1,-1], [1,0], [1,1], [0,1], [-1,1], [-1,0], [-1,-1], [0,-1], [0,-2], [0,2]];
var KNIGHTMOVES = [[1,2], [2,1], [2,-1], [1,-2], [-1,-2], [-2,1], [-2,-1], [-1,2]];
var BISHOPMOVES = [[1,1], [1,-1], [-1,1], [-1,-1]];
var PAWNMOVES = [[1,0], [2,0], [-1,0], [-2,0], [1,1], [-1,1], [1,-1], [-1,-1]];
var ROOKMOVES = [[1,0], [0,1], [-1,0], [0,-1]];
var STARTINGBOARD = [
    /**Row 1**/ [["black", "rook"], ["black", "knight"],  ["black", "bishop"], ["black", "queen"], ["black", "king"], ["black", "bishop"], ["black", "knight"], ["black", "rook"]],
    /**Row 2**/ [["black", "pawn"], ["black", "pawn"],  ["black", "pawn"], ["black", "pawn"], ["black", "pawn"], ["black", "pawn"], ["black", "pawn"], ["black", "pawn"]],
    /**Row 3**/ [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
    /**Row 4**/ [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
    /**Row 5**/ [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
    /**Row 6**/ [[null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null], [null, null]],
    /**Row 7**/ [["white", "pawn"], ["white", "pawn"],  ["white", "pawn"], ["white", "pawn"], ["white", "pawn"], ["white", "pawn"], ["white", "pawn"], ["white", "pawn"]],
    /**Row 8**/ [["white", "rook"], ["white", "knight"],  ["white", "bishop"], ["white", "queen"], ["white", "king"], ["white", "bishop"], ["white", "knight"], ["white", "rook"]]
    ];

var view = {
    useRotation: true,
    useAnimation: true,
    rotationDelay: 0,
    usePossibleMoves: true,
    tdArray: document.getElementsByName("cell"),
    updateBoard: function() {
        /** Setting piece sprite-sheet background image position **/
        for(var i = 0; i < view.tdArray.length; i++) {
            var vertical;
            var horizontal;
            if(model.board[Math.floor(i/8)][Math.floor((i%8))][COLOR] == "white") {
                vertical = "3px";
            } else {
                vertical = "-72px";
            }
            switch(model.board[Math.floor(i/8)][Math.floor((i%8))][PIECE]) {
                case("pawn"):
                    horizontal = "0";
                    break;
                case("bishop"):
                    horizontal = "-75px";
                    break;
                case("knight"):
                    horizontal = "-150px";
                    break;
                case("rook"):
                    horizontal = "-225px";
                    break;
                case("queen"):
                    horizontal = "-300px";
                    break;
                case("king"):
                    horizontal = "-375px";
                    break;
                default:
                    horizontal = "75px";
                    break;
            }
        
            view.tdArray[i].setAttribute("style", "background-position:" + horizontal + " " + vertical + ";");
        }
        
        /** Sets delay if animation is turned off **/
        var timeout = setTimeout(function() {
            /** blackTurn and whiteTurn control rotation of pieces and board **/
            for(var i = 0; i < view.tdArray.length; i++) {
                /** blackPieceTurn and whitePieceTurn control piece animation **/
                if(controller.turn == "white" && view.useRotation) {
                    view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" blackTurn", " whiteTurn"));
                    if(view.useAnimation) {
                        if(view.tdArray[i].getAttribute("class").match(" blackPieceTurn") != null) {
                            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" blackPieceTurn", " whitePieceTurn"));
                        } else if(view.tdArray[i].getAttribute("class").match(" whitePieceTurn") == null) {
                            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").concat(" whitePieceTurn"));
                        }
                    }
                } else if(view.useRotation) {
                    view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" whiteTurn", " blackTurn"));
                    if(view.useAnimation) {
                        if(view.tdArray[i].getAttribute("class").match(" whitePieceTurn") != null) {
                            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" whitePieceTurn", " blackPieceTurn"));
                        } else if(view.tdArray[i].getAttribute("class").match(" blackPieceTurn") == null) {
                            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").concat(" blackPieceTurn"));
                        }
                    }
                }
            }
            
            /** blackBoardTurn and whiteBoardTurn control board animation **/
            if(controller.turn == "white") {
                if(view.useRotation) {
                    document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" blackTurn", " whiteTurn"));
                    if(view.useAnimation) {
                        if(document.getElementById("boardTable").getAttribute("class").match(" blackBoardTurn") != null) {
                            document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" blackBoardTurn", " whiteBoardTurn"));
                        } else if(document.getElementById("boardTable").getAttribute("class").match(" whiteBoardTurn") == null) {
                            document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").concat(" whiteBoardTurn"));
                        }
                    }
                }
            } else {
                if(view.useRotation) {
                    document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" whiteTurn", " blackTurn"));
                    if(view.useAnimation) {
                        if(document.getElementById("boardTable").getAttribute("class").match(" whiteBoardTurn") != null) {
                            document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" whiteBoardTurn", " blackBoardTurn"));
                        } else if(document.getElementById("boardTable").getAttribute("class").match(" blackBoardTurn") == null) {
                            document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").concat(" blackBoardTurn"));
                        }
                    }
                }
            }
        }, view.rotationDelay);
        
        /** Controls turn indicator **/
        if(controller.turn == "white") {
            document.getElementById("whiteTurnIndicator").removeAttribute("hidden");
            document.getElementById("blackTurnIndicator").setAttribute("hidden", "hidden");
        } else {
            document.getElementById("blackTurnIndicator").removeAttribute("hidden");
            document.getElementById("whiteTurnIndicator").setAttribute("hidden", "hidden");
        }
    },
    clearMoves: function() {
        for(var i = 0; i < view.tdArray.length; i++) {
            view.tdArray[i].parentElement.setAttribute("class", view.tdArray[i].parentElement.getAttribute("class").replace(" selected", ""));
        }
    },
    showMove: function(cell) {
        var tdElement = document.getElementById(cell[ROW] + "" + cell[COLUMN]);
        if(tdElement.parentElement.getAttribute("class").match(" selected") == null) {
            tdElement.parentElement.setAttribute("class", tdElement.parentElement.getAttribute("class").concat(" selected"));
        }
    },
    promotion: function(on) {
        if(on) {
            document.getElementById("promotion").removeAttribute("hidden");
            document.getElementById("screen").removeAttribute("hidden");
        } else {
            document.getElementById("promotion").setAttribute("hidden", "hidden");
            document.getElementById("screen").setAttribute("hidden", "hidden");
        }
    },
    checkMate: function() {
        document.getElementById("messageArea").innerHTML = "Game over, " + controller.turn + " has been checkmated";
        document.getElementById("screen").removeAttribute("hidden");
    },
    staleMate: function() {
        document.getElementById("messageArea").innerHTML = "The game is a stalemate";
        document.getElementById("screen").removeAttribute("hidden");
    }
};

var model = {
    whiteKingCastle: true,
    whiteQueenCastle: true,
    whiteCheck: false,
    
    blackKingCastle: true,
    blackQueenCastle: true,
    blackCheck: false,
    
    enPassantColumn: null,
    promotedPawn: null,
    
    board: null,
    clearPath: function(start, end, workingBoard) {
        /** Checks to see if there are any pieces between 'start' and 'end' **/
        var rowDifference = start[ROW] - end[ROW];
        var columnDifference = start[COLUMN] - end[COLUMN];
        
        function reduce() {
            /** Reduces 'end' position down to 'start' position **/
            if(rowDifference < 0) {
                rowDifference++;
            } else if (rowDifference > 0) {
                rowDifference--;
            }

            if(columnDifference < 0) {
                columnDifference++;
            } else if (columnDifference > 0) {
                columnDifference--;
            }
        }
        
        reduce();
        
        /** Checks each square between 'start' and 'end' **/
        while(!(rowDifference == 0 && columnDifference == 0)) {
            if(workingBoard[start[ROW] - rowDifference][start[COLUMN] - columnDifference][PIECE] != null) {
                return false;
            }
            
            reduce();            
        }
        return true;
    },
    validLocation: function(location) {
        /** Checks if a location is on the board **/
        return (location[ROW] >= 0 && location[ROW] <= 7 && location[COLUMN] >= 0 && location[COLUMN] <= 7 )
    },
    validBishop: function(start, end, workingBoard) {
        return Math.abs(end[ROW] - start[ROW]) == Math.abs(end[COLUMN] - start[COLUMN]) 
            && model.clearPath(start, end, workingBoard);
    },
    validKing: function(start, end, workingBoard) {
        return (Math.abs(start[ROW] - end[ROW]) == 1 || start[ROW] == end[ROW]) 
            && (Math.abs(start[COLUMN] - end[COLUMN]) == 1 || start[COLUMN] == end[COLUMN]);
    },
    validKnight: function(start, end) {
        return (Math.abs(start[ROW] - end[ROW]) == 1 && Math.abs(start[COLUMN] - end[COLUMN]) == 2) 
                           || (Math.abs(start[COLUMN] - end[COLUMN]) == 1 && Math.abs(start[ROW] - end[ROW]) == 2);
    },
    validPawn: function(start, end, workingBoard) {
        var startRow = start[ROW];
        var endRow = end[ROW];
        
        if(controller.turn == "white") {
            startRow = 7 - start[ROW];
            endRow = 7 - end[ROW];
        }
        
        return (endRow - startRow == 1 
                && ((start[COLUMN] == end[COLUMN] && workingBoard[end[ROW]][end[COLUMN]][PIECE] == null) 
                    || (Math.abs(start[COLUMN] - end[COLUMN]) == 1 && workingBoard[end[ROW]][end[COLUMN]][PIECE] != null) 
                    || (startRow == 4 && end[COLUMN] == model.enPassantColumn))) 
            || (startRow == 1 && endRow == 3 && start[COLUMN] == end[COLUMN] 
                && model.clearPath(start, end, workingBoard) && workingBoard[end[ROW]][end[COLUMN]][PIECE] == null);
    },
    validRook: function(start, end, workingBoard) {
        return (start[ROW] == end[ROW] || start[COLUMN] == end[COLUMN]) && model.clearPath(start, end, workingBoard);
    },
    validCastle: function(start, end, workingBoard) {
        var midColumn = (start[COLUMN] + end[COLUMN])/2;
        
        function castleCheck() {
            if(workingBoard[start[ROW]][midColumn][PIECE] == null && workingBoard[end[ROW]][end[COLUMN]][PIECE] == null) {
                var tempBoard = model.copyBoard(workingBoard);
                controller.move(start, [start[ROW],midColumn], tempBoard);
                if(model.capturable(tempBoard, model.findKing(tempBoard, controller.turn), controller.turn).length != 0) {
                    return false;
                }
                controller.move([start[ROW],midColumn], end, tempBoard);
                return model.capturable(tempBoard, model.findKing(tempBoard, controller.turn), controller.turn).length == 0;
            } else {
                return false;
            }
        }
        
        if(model.capturable(workingBoard, model.findKing(workingBoard, controller.turn), controller.turn).length == 0) {
            if(controller.turn == "white" && start[ROW] == 7 && start[COLUMN] == 4 && end[ROW] == 7) {
                if(end[COLUMN] == 2 && model.whiteQueenCastle && workingBoard[7][1][PIECE] == null 
                   && workingBoard[7][0][PIECE] == "rook" && workingBoard[7][0][COLOR] == "white") {
                    return castleCheck();
                } else if(end[COLUMN] == 6 && model.whiteKingCastle 
                          && workingBoard[7][7][PIECE] == "rook" && workingBoard[7][7][COLOR] == "white") {
                    return castleCheck();
                }
            } else if(controller.turn == "black" && start[ROW] == 0 && start[COLUMN] == 4 && end[ROW] == 0){
                if(end[COLUMN] == 2 && model.blackQueenCastle && workingBoard[0][1][PIECE] == null 
                   && workingBoard[0][0][PIECE] == "rook" && workingBoard[0][0][COLOR] == "black") {
                    return castleCheck();
                } else if(end[COLUMN] == 6 && model.blackKingCastle
                          && workingBoard[0][7][PIECE] == "rook" && workingBoard[0][7][COLOR] == "black") {
                    return castleCheck();
                }
            }
        } else {
            return false;
        }
    },
    validMove: function(start, end, workingBoard) {
        var validPiece = false;
        
        if(model.validLocation(start) && model.validLocation(end)){
            if(workingBoard[start[ROW]][start[COLUMN]][COLOR] == controller.turn 
               && workingBoard[end[ROW]][end[COLUMN]][COLOR] != controller.turn) {
                switch(workingBoard[start[ROW]][start[COLUMN]][PIECE]) {
                    case("bishop"):
                        if(model.validBishop(start, end, workingBoard)) {
                            validPiece = true;
                        }
                        break;

                    case("king"):
                        if(model.validKing(start, end, workingBoard) || model.validCastle(start, end, workingBoard)) {
                            validPiece = true;
                        }
                        break;

                    case("knight"):
                        if(model.validKnight(start, end)) {
                            validPiece = true;
                        }
                        break;

                    case("pawn"):
                        if(model.validPawn(start, end, workingBoard)) {
                            validPiece = true;
                        }
                        break;
                        
                    case("queen"):
                        if(model.validBishop(start, end, workingBoard) || model.validRook(start, end, workingBoard)) {
                            validPiece = true;
                        }
                        break;

                    case("rook"):
                        if(model.validRook(start, end, workingBoard)) {
                            validPiece = true;
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        
        if(validPiece) {
            var tempBoard = model.copyBoard(workingBoard);
            controller.processMove(start, end, tempBoard);
            return model.capturable(tempBoard, model.findKing(tempBoard, controller.turn), controller.turn).length == 0;
        } else {
            return false;
        }
    },
    findKing: function(workingBoard, workingTurn) {
        for(var r = 0; r < 8; r++) {
            for(var c = 0; c < 8; c++) {
                if(workingBoard[r][c][COLOR] == workingTurn && workingBoard[r][c][PIECE] == "king") {
                    return [r,c];
                }
            }
        }
    },
    capturable: function(workingBoard, piece, turn) {
        var captureArray = []
        for(var i = 1; i < 8; i++) {
            for(var j = 0; j < 4; j++) {
                if(model.validLocation([i*BISHOPMOVES[j][ROW] + piece[ROW], i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]])) {
                    if(workingBoard[i*BISHOPMOVES[j][ROW] + piece[ROW]][i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]][COLOR] != turn 
                       && (workingBoard[i*BISHOPMOVES[j][ROW] + piece[ROW]][i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]][PIECE] == "bishop" 
                           || workingBoard[i*BISHOPMOVES[j][ROW] + piece[ROW]][i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]][PIECE] == "queen") 
                       && model.clearPath(piece, [i*BISHOPMOVES[j][ROW] + piece[ROW], i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]], workingBoard)) {
                        captureArray = captureArray.concat([[i*BISHOPMOVES[j][ROW] + piece[ROW], i*BISHOPMOVES[j][COLUMN] + piece[COLUMN]]]);
                    }
                }
                if(model.validLocation([i*ROOKMOVES[j][ROW] + piece[ROW], i*ROOKMOVES[j][COLUMN] + piece[COLUMN]])) {
                    if(workingBoard[i*ROOKMOVES[j][ROW] + piece[ROW]][i*ROOKMOVES[j][COLUMN] + piece[COLUMN]][COLOR] != turn 
                       && (workingBoard[i*ROOKMOVES[j][ROW] + piece[ROW]][i*ROOKMOVES[j][COLUMN] + piece[COLUMN]][PIECE] == "rook" 
                           || workingBoard[i*ROOKMOVES[j][ROW] + piece[ROW]][i*ROOKMOVES[j][COLUMN] + piece[COLUMN]][PIECE] == "queen") 
                       && model.clearPath(piece, [i*ROOKMOVES[j][ROW] + piece[ROW], i*ROOKMOVES[j][COLUMN] + piece[COLUMN]], workingBoard)) {
                        captureArray = captureArray.concat([[i*ROOKMOVES[j][ROW] + piece[ROW], i*ROOKMOVES[j][COLUMN] + piece[COLUMN]]]);
                    }
                }
            }
        }
        
        var direction = 1;
        if(turn == "white") {
            direction = -1;
        }
        if(model.validLocation([piece[ROW] + direction, piece[COLUMN] + 1])) {
            if(workingBoard[piece[ROW] + direction][piece[COLUMN] + 1][PIECE] == "pawn" 
               && workingBoard[piece[ROW] + direction][piece[COLUMN] + 1][COLOR] != turn) {
                captureArray = captureArray.concat([[piece[ROW] + direction, piece[COLUMN] + 1]]);
            }
        }
        if(model.validLocation([piece[ROW] + direction, piece[COLUMN] - 1])) {
            if(workingBoard[piece[ROW] + direction][piece[COLUMN] - 1][PIECE] == "pawn" 
               && workingBoard[piece[ROW] + direction][piece[COLUMN] - 1][COLOR] != turn) {
                captureArray = captureArray.concat([[piece[ROW] + direction, piece[COLUMN] - 1]]);
            }
        }
        
        for(var i = 0; i < 8; i++) {
            if(model.validLocation([piece[ROW] + KNIGHTMOVES[i][ROW], piece[COLUMN] + KNIGHTMOVES[i][COLUMN]])) {
                if(workingBoard[piece[ROW] + KNIGHTMOVES[i][ROW]][piece[COLUMN] + KNIGHTMOVES[i][COLUMN]][PIECE] == "knight" 
                   && workingBoard[piece[ROW] + KNIGHTMOVES[i][ROW]][piece[COLUMN] + KNIGHTMOVES[i][COLUMN]][COLOR] != turn) {
                    captureArray = captureArray.concat([[piece[ROW] + KNIGHTMOVES[i][ROW], piece[COLUMN] + KNIGHTMOVES[i][COLUMN]]]);
                }
            }
            if(model.validLocation([piece[ROW] + KINGMOVES[i][ROW], piece[COLUMN] + KINGMOVES[i][COLUMN]])) {
                if(workingBoard[piece[ROW] + KINGMOVES[i][ROW]][piece[COLUMN] + KINGMOVES[i][COLUMN]][PIECE] == "king" 
                   && workingBoard[piece[ROW] + KINGMOVES[i][ROW]][piece[COLUMN] + KINGMOVES[i][COLUMN]][COLOR] != turn) {
                    captureArray = captureArray.concat([[piece[ROW] + KINGMOVES[i][ROW], piece[COLUMN] + KINGMOVES[i][COLUMN]]]);
                }
            }
        }

        return captureArray;

    },
    possibleMoves: function(r, c, workingBoard) {
        var possible = 0;
        
        function possibleRook() {
            for(var i = 1; i < 8; i++) {
                for(var j = 0; j < 4; j++) {
                    if(model.validMove([r,c], [i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c], workingBoard)) {
                        if(view.usePossibleMoves){
                            view.showMove([i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c]);
                        }
                        possible++;
                    }
                }
            }
        }
        
        function possibleBishop() {
            for(var i = 1; i < 8; i++) {
                for(var j = 0; j < 4; j++) {
                    if(model.validMove([r,c], [i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c], workingBoard)) {
                        if(view.usePossibleMoves){ 
                            view.showMove([i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c]);
                        }
                        possible++;
                    }
                }
            }
        }
        
        if(workingBoard[r][c][COLOR] == controller.turn) {
            switch(workingBoard[r][c][PIECE]) {
                case("bishop"):
                    possibleBishop();
                    break;

                case("king"):
                    for(var i = 0; i < 10; i++) {
                        if(model.validMove([r,c], [KINGMOVES[i][ROW] + r, KINGMOVES[i][COLUMN] + c], workingBoard)) {
                            if(view.usePossibleMoves){ 
                                view.showMove([KINGMOVES[i][ROW] + r, KINGMOVES[i][COLUMN] + c]);
                            }
                            possible++;
                        }
                    }
                    break;

                case("knight"):
                    for(var i = 0; i < 8; i++) {
                        if(model.validMove([r,c], [KNIGHTMOVES[i][ROW] + r, KNIGHTMOVES[i][COLUMN] + c], workingBoard)) {
                            if(view.usePossibleMoves){ 
                                view.showMove([KNIGHTMOVES[i][ROW] + r, KNIGHTMOVES[i][COLUMN] + c]);
                            }
                            possible++;
                        }
                    }
                    break;

                case("pawn"):
                    for(var i = 0; i < 8; i++) {
                        if(model.validMove([r,c], [PAWNMOVES[i][ROW] + r, PAWNMOVES[i][COLUMN] + c], workingBoard)) {
                            if(view.usePossibleMoves){ 
                                view.showMove([PAWNMOVES[i][ROW] + r, PAWNMOVES[i][COLUMN] + c]);
                            }
                            possible++;
                        }
                    }
                    break;

                case("queen"):
                    possibleBishop();
                    possibleRook();
                    break;
                    
                case("rook"):
                    possibleRook();
                    break;

                default:
                    break;
            }
        }
        
        return possible;
    },
    checkMate: function() {
        for(var r = 0; r < 8; r++) {
            for(var c = 0; c < 8; c++) {
                if(model.possibleMoves(r, c, model.board) != 0) {
                    return false;
                }
            }
        }
        return true;
    },
    copyBoard: function(oldBoard) {
        var newBoard = Array(8);
        
        for(var i = 0; i < 8; i++) {
            var tempArray = Array(8);
            for(var j = 0; j < 8; j++) {
                tempArray[j] = [oldBoard[i][j][COLOR], oldBoard[i][j][PIECE]];
            }
            newBoard[i] = tempArray;
        }
        
        return newBoard;
    }
};

var controller = {
    start: null,
    end: null,
    move: function(start, end, workingBoard) {
        workingBoard[end[ROW]][end[COLUMN]] = workingBoard[start[ROW]][start[COLUMN]];
        workingBoard[start[ROW]][start[COLUMN]] = [null, null];
    },
    processMove: function(start, end, workingBoard) {
        controller.move(start, end, workingBoard);
        
        if(workingBoard[end[ROW]][end[COLUMN]][PIECE] == "pawn" && model.enPassantColumn == end[COLUMN]) {
            if(controller.turn == "white" && end[ROW] == 2) {
                workingBoard[3][end[COLUMN]] = [null, null];
            } else if(controller.turn == "black" && end[ROW] == 5) {
                workingBoard[4][end[COLUMN]] = [null, null];
            }
        }
        
        if(workingBoard[end[ROW]][end[COLUMN]][PIECE] == "king" && Math.abs(end[COLUMN] - start[COLUMN]) == 2) {
            if(controller.turn == "white") {
                if(end[COLUMN] == 2) {
                    controller.move([7,0], [7,3], workingBoard);
                } else {
                    controller.move([7,7], [7,5], workingBoard);
                }
            } else {
                if(end[COLUMN] == 2) {
                    controller.move([0,0], [0,3], workingBoard);
                } else {
                    controller.move([0,7], [0,5], workingBoard);
                }
            }
        }
    },
    turn: "white",
    computerTurn: "black",
    playerTurn: "white",
    computerMove: function() {
        var computerStart = [];
        var computerEnd = [];
        var moveValue = 0;
        var equivalentMoves = [];
        var PAWN = 1;
        var KNIGHT = 3;
        var BISHOP = 3;
        var ROOK = 5;
        var QUEEN = 9;
        var KING = 100;
        
        function moveRater(start, end, workingBoard) {
            var moveRate = 1000;
            var tempBoard = model.copyBoard(workingBoard);
                
            if(workingBoard[end[ROW]][end[COLUMN]][COLOR] != controller.computerTurn) {
                switch(workingBoard[end[ROW]][end[COLUMN]][PIECE]) {
                    case("pawn"): 
                        moveRate += PAWN;
                        break;
                    
                    case("bishop"):
                        moveRate += BISHOP;
                        break;
                    
                    case("knight"): 
                        moveRate += KNIGHT;
                        break;
                        
                    case("rook"): 
                        moveRate += ROOK;
                        break;
                        
                    case("queen"): 
                        moveRate += QUEEN;
                        break;
                    
                    default:
                        break;
                }
            }
            
            console.log("Taken: " + moveRate);
            controller.processMove(start, end, tempBoard);
    
            var freedomOfMovement = 0;
            var valueOfCaptured = 0;
            var numberOfCaptured = 0;
            for(var r = 0; r < 8; r++) { 
                for(var c = 0; c < 8; c++) {
                    freedomOfMovement += model.possibleMoves(r, c, tempBoard);
                    if(tempBoard[r][c][COLOR] == controller.computerTurn) {
                        var captureArray = model.capturable(tempBoard, [r,c], controller.computerTurn);
                        if(captureArray.length != 0) {
                            var leastValue = 100;
                            if(model.capturable(tempBoard, [r,c], controller.playerTurn) != 0) {
                                for(var i = 0; i < captureArray.length; i++) {
                                    switch(tempBoard[captureArray[i][ROW]][captureArray[i][COLUMN]][PIECE]) {
                                        case("pawn"):
                                            if(leastValue > PAWN) {
                                                leastValue = PAWN;
                                            }
                                            break;

                                        case("bishop"):
                                            if(leastValue > BISHOP) {
                                                leastValue = BISHOP;
                                            }
                                            break;

                                        case("knight"): 
                                            if(leastValue > KNIGHT) {
                                                leastValue = KNIGHT;
                                            }
                                            break;

                                        case("rook"): 
                                            if(leastValue > ROOK) {
                                                leastValue = ROOK;
                                            }
                                            break;

                                        case("queen"): 
                                            if(leastValue > QUEEN) {
                                                leastValue = QUEEN;
                                            }
                                            break;

                                        default:
                                            break;
                                    }
                                }
                            } else {
                                leastValue = 0;
                            }
                            valueOfCaptured += leastValue;
                            numberOfCaptured++;
                            switch(tempBoard[r][c][PIECE]) {
                                case("pawn"):
                                    valueOfCaptured -= PAWN;
                                    break;

                                case("bishop"):
                                    valueOfCaptured -= BISHOP;
                                    break;

                                case("knight"): 
                                    valueOfCaptured -= KNIGHT;
                                    break;

                                case("rook"): 
                                    valueOfCaptured -= ROOK;
                                    break;

                                case("queen"): 
                                    valueOfCaptured -= QUEEN;
                                    break;

                                case("king"):
                                    valueOfCaptured -= KING;
                                    break;

                                default:
                                    break;
                            }
                        }
                    }
                }
            }
            if(numberOfCaptured > 0) {
                moveRate += valueOfCaptured/numberOfCaptured;
                console.log("Captured: " + valueOfCaptured/numberOfCaptured);
            }
            
            console.log("Freedom of movement: " + freedomOfMovement/100);
            
            moveRate += freedomOfMovement/100;
            
            /**
            In danger of being captured, but defended
            Capturing opponents piece only to be captured yourself
            Sacrifice
            enpassant
            Castling
            control the center
            promotion
            placing opponent in check & checkmate
            **/
            console.log("Move Rate: " + moveRate + " for " + start + " / " + end);
            if(moveRate > moveValue) {
                computerStart = start;
                computerEnd = end;
                moveValue = moveRate;
                equivalentMoves = [[start, end]];
            } else if(moveRate == moveValue) {
                equivalentMoves = equivalentMoves.concat([[start, end]]);
            }
        }
        
        for(var r = 0; r < 8; r++) { 
            for(var c = 0; c < 8; c++) {
                if(model.board[r][c][COLOR] == controller.computerTurn) {
                    switch(model.board[r][c][PIECE]) {
                        case("bishop"):
                            for(var i = 1; i < 8; i++) {
                                for(var j = 0; j < 4; j++) {
                                    if(model.validMove([r,c], [i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c], model.board)) {
                                        moveRater([r,c], [i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c], model.board);
                                    }
                                }
                            }
                            break;

                        case("king"):
                            for(var i = 0; i < 10; i++) {
                                if(model.validMove([r,c], [KINGMOVES[i][ROW] + r, KINGMOVES[i][COLUMN] + c], model.board)) {
                                    moveRater([r,c], [KINGMOVES[i][ROW] + r, KINGMOVES[i][COLUMN] + c], model.board);
                                }
                            }
                            break;

                        case("knight"):
                            for(var i = 0; i < 8; i++) {
                                if(model.validMove([r,c], [KNIGHTMOVES[i][ROW] + r, KNIGHTMOVES[i][COLUMN] + c], model.board)) {
                                    moveRater([r,c], [KNIGHTMOVES[i][ROW] + r, KNIGHTMOVES[i][COLUMN] + c], model.board);
                                }
                            }
                            break;

                        case("pawn"):
                            for(var i = 0; i < 8; i++) {
                                if(model.validMove([r,c], [PAWNMOVES[i][ROW] + r, PAWNMOVES[i][COLUMN] + c], model.board)) {
                                    moveRater([r,c], [PAWNMOVES[i][ROW] + r, PAWNMOVES[i][COLUMN] + c], model.board);
                                }
                            }
                            break;

                        case("queen"):
                            for(var i = 1; i < 8; i++) {
                                for(var j = 0; j < 4; j++) {
                                    if(model.validMove([r,c], [i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c], model.board)) {
                                        moveRater([r,c], [i*BISHOPMOVES[j][ROW] + r, i*BISHOPMOVES[j][COLUMN] + c], model.board);
                                    } else if(model.validMove([r,c], [i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c], model.board)) {
                                        moveRater([r,c], [i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c], model.board);
                                    }
                                }
                            }
                            break;

                        case("rook"):
                            for(var i = 1; i < 8; i++) {
                                for(var j = 0; j < 4; j++) {
                                    if(model.validMove([r,c], [i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c], model.board)) {
                                        moveRater([r,c], [i*ROOKMOVES[j][ROW] + r, i*ROOKMOVES[j][COLUMN] + c], model.board);
                                    }
                                }
                            }
                            break;

                        default:
                            break;
                    }
                }
            }
        }
        console.log("Equivalent Moves:")
        console.log(equivalentMoves);
        if(equivalentMoves.length > 1) {
            var choice = Math.floor(equivalentMoves.length * Math.random());
            console.log("Choice: " + choice);
            return equivalentMoves[choice];
        }
        
        return [computerStart, computerEnd];
    },
    turnTaker: function(start, end) {
        if(model.validMove(start, end, model.board)) {
            controller.processMove(start, end, model.board);
            model.enPassantColumn = null;
 
            switch(model.board[end[ROW]][end[COLUMN]][PIECE]) {
                case("king"):
                    if(controller.turn == "white"){
                        model.whiteQueenCastle = false;
                        model.whiteKingCastle = false;
                    } else {
                        model.blackQueenCastle = false;
                        model.blackKingCastle = false;
                    }
                    break;
                    
                case("pawn"):
                    if((controller.turn == "white" && end[ROW] == 0) || (controller.turn == "black" && end[ROW] == 7)) {
                        model.promotedPawn = end;
                        view.promotion(true);
                    } else if(Math.abs(end[ROW] - start[ROW]) == 2) {
                        model.enPassantColumn = end[COLUMN];
                    }
                    break;
                    
                case("rook"):
                    if(start[COLUMN] == 0) {
                        if(controller.turn == "black") {
                            model.blackQueenCastle = false;
                        } else {
                            model.whiteQueenCastle = false;
                        }
                    } else if (start[COLUMN] == 7) {
                        if(controller.turn == "black") {
                            model.blackKingCastle = false;
                        } else {
                            model.whiteKingCastle = false;
                        }
                    }
                    break;
            }
            
            if(controller.turn == "white") {
                controller.turn = "black";
            } else {
                controller.turn = "white";
            }
            
            if(model.checkMate()) {
                if(model.capturable(model.board, model.findKing(model.board, controller.turn), controller.turn).length != 0) {
                    view.checkMate();
                } else {
                    view.staleMate();
                }
            } else if(controller.turn == controller.computerTurn){
                var moveArray = controller.computerMove();
                controller.turnTaker(moveArray[0], moveArray[1]);
            }
        }
    }
};

function init() {
    model.board = model.copyBoard(STARTINGBOARD);
    for(var i = 0; i < view.tdArray.length; i++) {
        view.tdArray[i].onclick = handleMove;
        view.tdArray[i].onmouseover = handleHover;
        view.tdArray[i].onmouseout = handleMouseOut;
        if(view.tdArray[i].getAttribute("id").charAt(0)%2 == 0) {
            if(view.tdArray[i].getAttribute("id").charAt(1)%2 == 0) {
                view.tdArray[i].parentElement.setAttribute("class", "even");
            } else {
                view.tdArray[i].parentElement.setAttribute("class", "odd");
            }
        } else {
            if(view.tdArray[i].getAttribute("id").charAt(1)%2 != 0) {
                view.tdArray[i].parentElement.setAttribute("class", "even");
            } else {
                view.tdArray[i].parentElement.setAttribute("class", "odd");
            }
        }
        view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").concat(" whiteTurn"));
    }
    document.getElementById("boardTable").setAttribute("class", " whiteTurn");
    view.updateBoard();
    document.getElementById("bishop").onclick = handlePromotion;
    document.getElementById("knight").onclick = handlePromotion;
    document.getElementById("rook").onclick = handlePromotion;
    document.getElementById("queen").onclick = handlePromotion;
    document.getElementById("newGame").onclick = handleNewGame;
    document.getElementById("rotation").onclick = handleRotation;
    document.getElementById("animation").onclick = handleAnimation;
    document.getElementById("possibleMoves").onclick = handlePossibleMoves;
}

function handleNewGame() {
    model.board = model.copyBoard(STARTINGBOARD);
    
    controller.turn = "white";
    
    model.whiteKingCastle = true;
    model.whiteQueenCastle = true;
    model.whiteCheck = false;
    
    model.blackKingCastle = true;
    model.blackQueenCastle = true;
    model.blackCheck = false;
    
    model.enPassantColumn = null;
    model.promotedPawn = null;
    
    document.getElementById("messageArea").innerHTML = "";
    
    view.promotion(false);
    view.updateBoard();
    
    controller.start = null;
    view.clearMoves();
    
    document.getElementById("screen").setAttribute("hidden", "hidden");
}

function handleMove() {
    var move = this.id;

    if(controller.start == null) {
        controller.start = [move.charAt(0)*1, move.charAt(1)*1];
        view.showMove(controller.start);
        model.possibleMoves(move.charAt(0)*1, move.charAt(1)*1, model.board);
    } else {
        controller.end = [move.charAt(0)*1, move.charAt(1)*1];
        if (!(controller.start[0] == controller.end[0] && controller.start[1] == controller.end[1])) {
            controller.turnTaker(controller.start, controller.end);
            view.updateBoard();
        }
        controller.start = null;
        controller.end = null;
        view.clearMoves();
    }
}

function handleHover() {
    if(view.usePossibleMoves){
        var hover = this.id;
        if(controller.start == null) {
            model.possibleMoves(hover.charAt(0)*1, hover.charAt(1)*1, model.board);
        }
    }
}

function handleMouseOut() {
    if(view.usePossibleMoves){ 
        var mouseOut = this.id;
        view.clearMoves();
        if(controller.start != null) {
            view.showMove(controller.start);
            model.possibleMoves(controller.start[ROW], controller.start[COLUMN], model.board);
        }
    }
}

function handlePromotion() {
    model.board[model.promotedPawn[ROW]][model.promotedPawn[COLUMN]][PIECE] = this.getAttribute("id");
    model.promotedPawn = null;
    view.promotion(false);
    view.updateBoard();
}

function handleRotation() {
    if(view.useRotation) {
        view.useRotation = false;
        document.getElementById("rotation").setAttribute("value", "Turn Rotation On");
        document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" blackTurn", " whiteTurn"));
        for(var i = 0; i < view.tdArray.length; i++) {
            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" blackTurn", " whiteTurn"));
        }
        view.useAnimation = true;
        handleAnimation();
    } else {
        view.useRotation = true;
        document.getElementById("rotation").setAttribute("value", "Turn Rotation Off");
        if(controller.turn == "black"){
            document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" whiteTurn", " blackTurn"));
            for(var i = 0; i < view.tdArray.length; i++) {
                view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" whiteTurn", " blackTurn"));
            }
        }
    }
}

function handleAnimation() {
    if(view.useAnimation) {
        view.useAnimation = false;
        view.rotationDelay = 1000;
        document.getElementById("animation").setAttribute("value", "Turn Animation On");
        document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" whiteBoardTurn", ""));
        document.getElementById("boardTable").setAttribute("class", document.getElementById("boardTable").getAttribute("class").replace(" blackBoardTurn", ""));
        for(var i = 0; i < view.tdArray.length; i++) {
            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" whitePieceTurn", ""));
            view.tdArray[i].setAttribute("class", view.tdArray[i].getAttribute("class").replace(" blackPieceTurn", ""));
        }
    } else {
        if(!view.useRotation) {
            handleRotation();
        }
        view.useAnimation = true;
        view.rotationDelay = 0;
        document.getElementById("animation").setAttribute("value", "Turn Animation Off");    
    }
}

function handlePossibleMoves() {
    if(view.usePossibleMoves) {
        view.usePossibleMoves = false;
        document.getElementById("possibleMoves").setAttribute("value", "Turn Possible Moves On");
    } else {
        view.usePossibleMoves = true;
        document.getElementById("possibleMoves").setAttribute("value", "Turn Possible Moves Off");
    }
}

window.onload = init;