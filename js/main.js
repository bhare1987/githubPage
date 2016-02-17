$(document).ready(function(){
  var joinedOn = parseUTCDate(username.created_at)
  $("li > img.avatar").attr("src", username.avatar_url);
  $("div.avatar > img").attr("src", username.avatar_url);
  $(".name").text(username.name);
  $(".userName").text(username.login);
  $(".info li:nth-child(1)").text(username.company);
  $(".info li:nth-child(2)").text(username.location);
  $(".info li:nth-child(3)").text("Joined on " + joinedOn.month + " " + joinedOn.day + ", " + joinedOn.year);
  $(".following div:nth-child(1)").text(username.following);
  $(".following div:nth-child(2)").text(username.followers);
  $(".following div:nth-child(3)").text(username.followers);























});

function parseUTCDate(date) {
  var dateObj = {
        fullDate: moment.utc(date).format("dddd, MMMM Do YYYY, h:mm:ss a"),
        year: moment.utc(date).format("YYYY"),
        month: moment.utc(date).format("MMM"),
        day: moment.utc(date).format("DD"),
        weekday: moment.utc(date).format("ddd"),
        time: moment.utc(date).format("h:mm:ss a")
      }
  return dateObj;
}
