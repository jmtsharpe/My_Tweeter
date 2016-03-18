var FollowToggle = function (el) {
  this.$el = $(el);
  this.followed = this.$el.data().followed;
  this.userId = this.$el.data().userid;
  this.render();
  this.handleClick();
};

FollowToggle.prototype.render = function () {
  this.$el.html(this.followed ? "Unfollow" : "Follow");
};

FollowToggle.prototype.handleClick = function () {
  var that = this;

  $(this.$el).on("click", function (e) {
    var method = that.followed ? "DELETE" : "POST";
    that.$el[0].disabled = true;
    $.ajax({
      type: method,
      url: '/users/' + that.userId + '/follow',
      dataType: 'json',
      success: (function (resp) {
        that.followed = !that.followed;
        that.render();
        that.$el[0].disabled = false;
      })
    });
  });
};

module.exports = FollowToggle;
