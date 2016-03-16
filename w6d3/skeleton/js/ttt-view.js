var View = function (game, $el) {
  this.game = game;
  this.$el = $el;
};

View.prototype.bindEvents = function () {
  that = this;

  $("li").on("click", function(e) {
    that.makeMove($(e.currentTarget));
  });
};

View.prototype.makeMove = function ($square) {
  var idx = $("li").index($square);
  var pos = _indexToPos(idx);
  if (!this.game.board.isEmptyPos(pos)){
    $("#message").text("Not a valid move!");
  } else if ( !this.game.isOver() ){
    this.game.playMove(pos);
    var mark = this.game.board.grid[pos[0]][pos[1]];
    $square.addClass(mark + " white")
           .text(mark);
  } else {
    this._finishGame();
  }
};

View.prototype.setupBoard = function () {
  $("<ul>").addClass("game-grid group").appendTo(this.$el);
  $("<h2>").attr('id', 'message').appendTo(this.$el);
  for ( var i = 0; i < 9; i++ ) {
    this.$el.find("ul").append("<li>");
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
