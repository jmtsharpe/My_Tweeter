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
    alert("Not a valid move!");
  } else {
    this.game.playMove(pos);
    var mark = this.game.board.grid[pos[0]][pos[1]];
    $square.text(mark);
  }
  if (this.game.isOver()){
    this._finishGame();
  }
};

View.prototype.setupBoard = function () {
  var $ttt = $(".ttt");

  var $gamegrid = $("<ul class='game-grid group'></ul>");
  $gamegrid.appendTo($ttt);

  for ( var i=0; i < 9; i++ ) {
    var $newLi = $("<li></li>");
    $newLi.appendTo($gamegrid);
  }
};

View.prototype._finishGame = function (){
  if (this.game.winner()) {
    alert(this.game.winner() + " has won!");
  } else {
    alert("NO ONE WINS!");
  }
};

_indexToPos = function (idx){
  var row = Math.floor(idx / 3);
  var col = idx % 3;

  return [row, col];
};

module.exports = View;
