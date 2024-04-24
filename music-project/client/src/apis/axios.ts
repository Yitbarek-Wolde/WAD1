import axios from "axios";
import * as ls from "local-storage";


export default axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "content-types": "application/json",
    Authorization: `Bearer ${ls.get('secret')}`,
  }
});
