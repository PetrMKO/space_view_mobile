import axios, { AxiosInstance } from "axios";

const nasaKey = "MVfpMOsEnAYKhPJWCfDjZjuvEXiaMqPvfZsvAZoD";
export const nasaRequest = axios.create({
  baseURL: "https://",
});

export type Photo = {
  url: string;
};

export type PhotoOfDay = Photo & {
  date: Date;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  isFavorite?: boolean;
};

type GetPhotoOfDayParams = {
  count: number;
};

const nasaApiConfig = (instance: AxiosInstance) => ({
  getPhotoOfDay: () => {
    return instance.get<PhotoOfDay>("api.nasa.gov/planetary/apod", {
      params: { api_key: nasaKey },
    });
  },
  getPhotosOfDay: (params?: GetPhotoOfDayParams) => {
    return instance.get<PhotoOfDay[]>("api.nasa.gov/planetary/apod", {
      params: { ...params, api_key: nasaKey },
    });
  },
});

export const nasaApi = nasaApiConfig(nasaRequest);
