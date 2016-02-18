$(document).ready(function(){
  var joinedOn = parseUTCDate(username.created_at),
      repositories = repositoriesHTML(respositoriesMap(repos)),
      activityList = activityHTML(activityMap(events));
  $("li > img.avatar").attr("src", username.avatar_url);
  $("div.avatar > img").attr("src", username.avatar_url);
  $(".name").text(username.name);
  $(".userName").text(username.login);
  $(".info li:nth-child(1)").append(username.company);
  $(".info li:nth-child(2)").append(username.location);
  $(".info li:nth-child(3)").append("Joined on " + joinedOn.month + " " + joinedOn.day + ", " + joinedOn.year);
  $(".following div:nth-child(1)").prepend(username.following);
  $(".following div:nth-child(2)").prepend(username.followers);
  $(".following div:nth-child(3)").prepend(username.followers);
  $(".organizations a:nth-of-type(1) img").attr("src", orgs[0].avatar_url);
  $(".organizations a:nth-of-type(2) img").attr("src", orgs[1].avatar_url);
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
  $("section.repositories").append(repositories);
  $("section.publicActivity").append(activityList);

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

function cleanURL(url) {
  if (typeof url === "string") {
    var clean = "https://" + url.slice(12);
  }
  return clean;
}

// function orgsMap(array) {
//
// }
//
// function orgsHTML(array) {
//   var html = "";
//   array.forEach(function(el){
//     html += "<a href='"
//           + el.avatar_url
//           + "' target='_blank'>"
//      <img src=""></a>
//   });
// }

function respositoriesMap(array) {
  var result = array.map(function(el){
    return {
      name: el.name,
      description: el.description,
      updated_at: el.updated_at,
      language: el.language,
      stargazers_count: el.stargazers_count,
      forks_count: el.forks_count,
      html_url: cleanURL(el.html_url),
      forks_url: cleanURL(el.forks_url),
      stargazers_url: cleanURL(el.stargazers_url)
    }
  });
  return result
}

function repositoriesHTML(array) {
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

function activityMap(array) {
    var result = array.map(function(el){
    if (el.type === "PushEvent"){
      return {
      type: el.type,
      login: el.actor.login,
      user_url: el.actor.url,
      avatar_url: el.actor.avatar_url,
      repo_name: el.repo.name,
      repo_url: cleanURL(el.repo.url),
      branch: el.payload.ref.slice(11),
      message: el.payload.commits[0].message,
      created_at: el.created_at,
      commit_url: el.payload.commits[0].url,
      head: el.payload.head.slice(-9)
      }
    } else {
      return {
        type: el.type,
        login: el.actor.login,
        user_url: el.actor.url,
        avatar_url: el.actor.avatar_url,
        repo_name: el.repo.name,
        repo_url: cleanURL(el.repo.url),
        branch: el.payload.ref,
        ref_type: el.payload.ref_type,
        created_at: el.created_at
      }
    }
  });
  return result;
}

function activityHTML(array) {
  var html = "";
  array.forEach(function(el){
    if(el.type === "PushEvent") {
      html += "<div class='eventContainer pushEvent'>";
      html += "<span class='mega-octicon octicon-git-commit'></span>";
      html += "<div class='repoUpdate'>" + moment.utc(el.created_at).fromNow() + "</div>";
      html += " <a href='" + el.user_url + "' target='_blank'>" + el.login + "</a> ";
      html += "pushed to " + "<a class='branchName' href='#' target='_blank'>" + el.branch + "</a> at ";
      html += "<a class='repoLink' href='" + el.repo_url + "' target='_blank'>" + el.repo_name + "</a>";
      html += "<div class='pushDetails'><a href='" + el.user_url + "' target='blank'><img src='" + el.avatar_url + "'></a>";
      html += "<span class='pushDetailsSpan'><img src='" + el.avatar_url + "'><a href='" + el.commit_url + "' target='_blank'>" + el.head + "</a>";
      html += " " + el.message;
      html += "</div>";
      html += "</div>";
    } else if (el.type == "CreateEvent" && el.ref_type === "branch") {
      html += "<div class='eventContainer createEvent'>";
      html += "<span class='octicon octicon-git-branch'></span>";
      html += " <a href='" + el.user_url + "' target='_blank'>" + el.login + "</a> ";
      html += "created branch " + "<a class='branchName' href='#' target='_blank'>" + el.branch + "</a> at ";
      html += "<a class='repoLink' href='" + el.repo_url + "' target='_blank'>" + el.repo_name + "</a>";
      html += "<span class='repoUpdate'>" + moment.utc(el.created_at).fromNow() + "</span>";
      html += "</div>";
    } else if (el.type === "CreateEvent" && el.ref_type === "repository") {
      html += "<div class='eventContainer createEvent'>";
      html += "<span class='octicon octicon-repo'></span>";
      html += " <a href='" + el.user_url + "' target='_blank'>" + el.login + "</a> ";
      html += "created repository <a class='repoLink' href='" + el.repo_url + "' target='_blank'>" + el.repo_name + "</a>";
      html += "<span class='repoUpdate'>" + moment.utc(el.created_at).fromNow() + "</span>";
      html += "</div>";
    }
  });
  return html;
}
