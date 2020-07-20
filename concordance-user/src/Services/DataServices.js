import axios from "axios";

class DataService {
  baseURL = "http://127.0.0.1:8000/api";
  fetchData_pagination(number, language) {
    return axios({
      method: "GET",
      url: `${this.baseURL}/${language}/?page=${number}`,
    });
  }
  fetchData_Search(keySearch, lang, { key, value }) {
    console.log(key, value);
    let getSearchUrl = null;
    if (keySearch !== "" && !value)
      getSearchUrl =
        this.baseURL + "/search/?" + `q=${keySearch}&` + `lang=${lang}`;
    else if (!keySearch && value !== "")
      getSearchUrl =
        this.baseURL + "/search/?" + `lang=${lang}&` + `${key}=${value}`;
    else if (keySearch !== "" && value !== "")
      getSearchUrl =
        this.baseURL +
        "/search/?" +
        `q=${keySearch}&` +
        `lang=${lang}&` +
        `${key}=${value}`;
    console.log(getSearchUrl);
    return axios({
      method: "GET",
      url: getSearchUrl,
    });
  }
}

export default DataService;
