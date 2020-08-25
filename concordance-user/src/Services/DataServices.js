import axios from "axios";

class DataService {
  baseURL = "http://127.0.0.1:8000/api";
  fetchData_pagination(number, language) {
    return axios({
      method: "GET",
      url: `${this.baseURL}/${language}/?page=${number}`,
    });
  }
  fetchData_Search(searchValue, searchType, lang, { key, value }) {
    let getSearchUrl = null;
    if (searchValue !== "" && !value)
      getSearchUrl =
        this.baseURL +
        "/search/?" +
        `q=${searchValue}&` +
        `qt=${searchType}&` +
        `lang=${lang}`;
    else if (!searchValue && value !== "")
      getSearchUrl =
        this.baseURL + "/search/?" + `lang=${lang}&` + `${key}=${value}`;
    else if (searchValue !== "" && value !== "")
      getSearchUrl =
        this.baseURL +
        "/search/?" +
        `q=${searchValue}&` +
        `qt=${searchType}&` +
        `lang=${lang}&` +
        `${key}=${value}`;
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
    console.log(urlData);
    return axios({
      method: "GET",
      url: urlData,
    });
  };
}

export default DataService;
