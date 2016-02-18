$(document).ready(function(){
  var joinedOn = parseUTCDate(username.created_at),
      repositories = repositoriesHTML(respositoriesMap(repos));
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
  $(".mainTabs li").on("click", function(){
    if($(this).text() === " Edit profile"){
      return;
    }
    if (!$(this).hasClass("active")) {
      $(this).addClass("active");
      $(this).siblings().removeClass("active");
    }
    var selector = $($(this).data("container"));
    if (!selector.hasClass("show")) {
      $(".sectionContainer section").removeClass("show");
      selector.addClass("show");
    }
  });
  $("section.repositories").html(repositories);






















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

function respositoriesMap(array) {
  var result = array.map(function(el){
    return {
      name: el.name,
      description: el.description,
      updated_at: el.updated_at,
      language: el.language,
      stargazers_count: el.stargazers_count,
      forks_count: el.forks_count,
      html_url: el.html_url,
      forks_url: el.forks_url,
      stargazers_url: el.stargazers_url
    }
  });
  return result
}

function repositoriesHTML(array) {
  console.log(array);
  var html = "";
  array.forEach(function(el){
    html += "<div class='repoContainer'>" + "<div class='repoHeader'>";
    html += "<a href='" + el.html_url + "' target='_blank'>" + "<h3>" + el.name + "</h3>" + "</a>";
    html += "<span class='repoLang'>" + el.language + "</span>";
    html += "<a href='" + el.stargazers_url + "' target='_blank'>" + "<i class='fa fa-star'></i> " + el.stargazers_count + "</a>";
    html += "<a href='" + el.forks_url + "' target='_blank'>" + "<i class='fa fa-code-fork'></i> " + el.forks_count + "</a>";
    html += "</div>";
    html += "<p class='repoDescription'>" + el.description + "</p>";
    html += "<p class='repoUpdate'>Updated " + moment.utc(el.updated_at).fromNow() + "</p>";
    html += "</div>"
  })
  return html;
}
