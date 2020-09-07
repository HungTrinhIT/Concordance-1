import axios from "axios";

class DataService {
  baseURL = "http://127.0.0.1:8000/api";
  fetchData_pagination(number, language) {
    return axios({
      method: "GET",
      url: `${this.baseURL}/${language}/?page=${number}`,
    });
  }
  fetchData_Search(searchValue, searchType, lang, { pos, ner }) {
    let getSearchUrl = this.baseURL + "/search/?";
    let tagURL = null;
    if (ner) {
      tagURL = `ner=${ner}`;
    }
    if (pos) {
      tagURL = `pos=${pos}`;
    }
    if (pos && ner) {
      tagURL = `pos=${pos}&` + `ner=${ner}`;
    }
    if (searchValue) {
      if (tagURL) {
        getSearchUrl +=
          `q=${searchValue}&` + `qt=${searchType}&` + `lang=${lang}&` + tagURL;
      } else
        getSearchUrl +=
          `q=${searchValue}&` + `qt=${searchType}&` + `lang=${lang}`;
    } else getSearchUrl += tagURL;
    return axios({
      method: "GET",
      url: getSearchUrl,
    });
  }
  fetchData_SentenceDetail = (id, lang) => {
    let urlSentenceDetail =
      this.baseURL + "/detail/?id=" + `${id}` + "&lang=" + `${lang}`;
    return axios({
      method: "GET",
      url: urlSentenceDetail,
    });
  };
  fetchData_QueryStatistic = (num, lang, count, typeTag, typeTagDetail) => {
    let urlData = "http://127.0.0.1:8000/api/statistic/?lang=" + lang;
    if (num !== "all") {
      if (typeTag !== "") {
        urlData += `&size=${count}&${typeTag}=${typeTagDetail}`;
      } else urlData += `&size=${count}`;
    } else if (typeTag !== "") {
      urlData += `&${typeTag}=${typeTagDetail}`;
    }
    return axios({
      method: "GET",
      url: urlData,
    });
  };
}

export default DataService;
