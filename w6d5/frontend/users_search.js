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

  var $li = $("<li>");
  $li.append(resp.content + " -- ");
  $li.append("<a href='/users/" + resp.user.id+ "'>" + resp.user.username + "</a> -- ");
  $li.append(resp.created_at);
  that.$users.prepend($li);
};

module.exports = UsersSearch;
