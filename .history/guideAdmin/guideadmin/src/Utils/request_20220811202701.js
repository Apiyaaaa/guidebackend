import axios from "axios";

import { BASE_URL, TIMEOUT } from "./config";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

api.interceptors.request.use
