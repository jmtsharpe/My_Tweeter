var View = require('./ttt-view');
var Game = require('../../ttt-core-solution/game');

$(function () {
  var game = new Game();
  var gameView = new View(game, $(".ttt"));

  gameView.setupBoard();
  gameView.bindEvents();
});
