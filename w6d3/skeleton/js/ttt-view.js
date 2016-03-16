var View = function (game, $el) {
  this.game = game;
};

View.prototype.bindEvents = function () {
  that = this;

  $("li").on("click", function(e) {
    that.makeMove($(e.currentTarget));
  });
};

View.prototype.makeMove = function ($square) {
  var $lis = $("li");
  var idx = $lis.index($square);
  var pos = _indexToPos(idx);
  if (!this.game.board.isEmptyPos(pos)){
    $("#message").text("Not a valid move!");
  } else if ( !this.game.isOver() ){
    this.game.playMove(pos);
    var mark = this.game.board.grid[pos[0]][pos[1]];
    if ( mark === "x" ) {
      $square.addClass("x");
    } else {
      $square.addClass("o");
    }
    $square.addClass("white");
    $square.text(mark);
  }
  if (this.game.isOver()){
    this._finishGame();
  }
};

View.prototype.setupBoard = function () {
  var $message = $("<h2 id='message'></h2>");
  var $ttt = $(".ttt");

  var $gamegrid = $("<ul class='game-grid group'></ul>");
  $gamegrid.appendTo($ttt);
  $message.appendTo($ttt);

  for ( var i=0; i < 9; i++ ) {
    var $newLi = $("<li></li>");
    $newLi.appendTo($gamegrid);
  }
};

View.prototype._finishGame = function (){
  if (this.game.winner()) {
    $("#message").text(this.game.winner() + " has won!");
  } else {
    $("#message").text("NO ONE WINS!");
  }
  $("." + this.game.winner()).addClass("winner");
};

_indexToPos = function (idx){
  var row = Math.floor(idx / 3);
  var col = idx % 3;

  return [row, col];
};

module.exports = View;
