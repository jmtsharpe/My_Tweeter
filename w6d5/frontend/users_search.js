var FollowToggle = require("./follow_toggle");

var UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("#search-input");
  this.$users = this.$el.find(".users");
  this.bindSearch();
};

 UsersSearch.prototype.bindSearch = function () {
   var that = this;

   $(this.$el).on("input", function (e) {
     $.ajax({
       type: "GET",
       url: '/users/search',
       dataType: 'json',
       data: {query: that.$input.val()},
       success: (function (resp) {
         that.render(resp);
       })
     });
   });
 };

UsersSearch.prototype.render = function (resp) {
  var that = this;
  that.$users.empty();

  resp.forEach( function (user) {
    var $li = $("<li>");
    $li.append("<a href='/users/" + user.id+ "'>" + user.username + "</a>");
    $li.append("<button class='follow-toggle' data-userid='" + user.id +"' data-followed='" + user.followed + "'></button>");
    that.$users.append($li);
  });

  $(".follow-toggle").each(function (index, el) {
    var toggle = new FollowToggle(el);
  });
};

module.exports = UsersSearch;
