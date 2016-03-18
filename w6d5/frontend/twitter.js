var FollowToggle = require("./follow_toggle");
var UsersSearch = require("./users_search");
var TweetCompose = require("./tweet_compose");
$(function () {
  $(".follow-toggle").each(function (index, el) {
    var toggle = new FollowToggle(el);
  });

  $(".users-search").each(function (index, el) {
    var search = new UsersSearch(el);
  });

  $(".tweet-compose").each(function (index, el) {
    var tweetCompose = new TweetCompose(el);
  });
});
