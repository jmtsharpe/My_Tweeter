var TweetCompose = function (el) {
  this.$el = $(el);
  this.$submit = this.$el.find("#tweet-submit");
  this.$input = this.$el.find("#tweet-input");
  this.$mention = this.$el.find("#mention");
  this.$charsLeft = this.$el.find(".chars-left");
  this.bindChars();
  this.bindSubmit();
};

TweetCompose.prototype.bindChars = function () {
  var that = this;

  this.$input.on("input", function() {
    var left = 140 - that.$input.val().length;
    that.$charsLeft.html(left);
  });

};

TweetCompose.prototype.bindSubmit = function () {
  var that = this;

  $(this.$el).on("submit", function (e) {
    e.preventDefault();
    that.$submit[0].disabled = true;
    $.ajax({
      type: "POST",
      url: '/tweets',
      data: {
        "tweet[content]": that.$input.val(),
        "tweet[mentioned_user_ids][]": that.$mention.val()
      },
      dataType: 'json',
      success: (function (resp) {
        that.clearInput();
        that.render(resp);
        that.$submit[0].disabled = false;
      })
    });
  });
};

TweetCompose.prototype.clearInput = function () {
  this.$input.val("");
};

TweetCompose.prototype.render = function (resp) {
  var that = this;
  var ul = this.$el.data("tweets-ul");
  var $ul = $(ul);
  var $li = $("<li>");
  $li.append(resp.content + " -- ");
  $li.append("<a href='/users/" + resp.user.id+ "'>" + resp.user.username + "</a> -- ");
  $li.append(resp.created_at);
  if (resp.mentions.length >= 1) {
    var $mentionUl = $("<ul>");
    for (var i = 0; i < resp.mentions.length; i++) {
      var user = resp.mentions[i].user;
      var $a = $("<a>")
        .attr("href", '/users/' + user.id)
        .text(user.username);

      $("<li>").append($a).appendTo($mentionUl);
    }
    $li.append($mentionUl);
  }
  $ul.prepend($li);
};


module.exports = TweetCompose;
