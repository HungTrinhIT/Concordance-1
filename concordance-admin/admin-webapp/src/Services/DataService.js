import axios from "axios";
class DataServie {
  fetchLanguageData_pagination(number, language) {
    return axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/${language}/?page=${number}`,
    });
  }
}

export default DataServie;