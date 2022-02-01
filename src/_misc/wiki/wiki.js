// import wikiFinder from "../../util/wiki/wiki";


// const initialState = {
//   labels: translationsLabels,
//   status: 0,
//   translations: [],
//   type: "",
//   wikiLinks: [],
// };

async function wikiFinder(translations, direction) {
  var wordsProcessed = [];

  var column = direction === 1 ? "englishWord" : "armenianWord";
  wordsProcessed = translations.map((translation) => {
    return translation[column].replace(" ", "_");
  });

  var wikiLinksPromises = [];

  wikiLinksPromises = wordsProcessed.map((word) => {
    var url = "https://en.wikipedia.org/w/api.php";

    var link = "-1";

    var params = {
      action: "query",
      format: "json",
      titles: word,
      prop: "info",
      inprop: "url|talkid",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function (key) {
      url += "&" + key + "=" + params[key];
    });

    var answer = fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (response) {
        var pages = response.query.pages;
        for (var p in pages) {
          if (Number(p) > 0) {
            link = pages[p].canonicalurl;
            return link;
          }
        }
      })
      .catch(function (error) {
        return "-1";
      });

    return answer;
  });

  var wikiLinks = [];

  Promise.all(wikiLinksPromises).then((data) => {
    return data.map((entry) => {
      return wikiLinks.push(entry);
    });
  });

  return wikiLinks;
}

module.exports = wikiFinder;



// .then(() => {
//   return wikiFinder(this.state.translations, this.props.direction);
// })
// .then((result) => {
//   this.setState({ wikiLinks: result });
// })