import axios from "axios";

class DataService {
  fetchData_pagination(number, language) {
    return axios({
      method: "GET",
      url: `http://127.0.0.1:8000/api/${language}/?page=${number}`,
    });
  }
}

export default DataService;
