import axios from "axios";

const api = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});

export const documentApi = {
  get: async filePath => await api.get(`/document/${filePath}`),
  update: async doc => await api.put("/document/", doc),
  create: async doc => await api.post("/document/", doc),
  delete: async doc => await api.delete("/document/", doc)
};
