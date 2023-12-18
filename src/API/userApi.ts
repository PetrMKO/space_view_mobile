import axios, { AxiosInstance } from "axios";

import { Photo, PhotoOfDay } from "./nasaApi";

export const userRequest = axios.create({
  baseURL: "http://localhost:9099/",
});

export type User = {
  id: string;
  login: string;
};

export type UserPhoto = Photo & {
  userId: string;
};

export type FavoritesResponse = {
  status: string;
  photos: UserPhoto[];
};

export type BlockedResponse = {
  status: string;
  photos: Photo[];
};

const userApiConfig = (instance: AxiosInstance) => ({
  addToBlocked: (userId: string, url: string) => {
    return instance.post(`add_blocked.php`, {
      url,
      userId,
    });
  },
  addToFavorites: (userId: string, url: string) => {
    return instance.post(`add_favorite.php`, {
      url,
      userId,
    });
  },
  getBlocked: (userId: string) => {
    return instance.post<BlockedResponse>(`blocked.php`, {
      userId,
    });
  },
  getFavorites: (userId: string) => {
    return instance.post<FavoritesResponse>(`favorites.page.php`, {
      userId,
    });
  },
  login: (login: string, password: string) => {
    return instance.post<User>(`auth.page.php`, {
      login,
      password,
    });
  },
  rate: (userId: string, url: string, rating: number) => {
    return instance.post(`rate.php`, {
      rating,
      url,
      userId,
    });
  },
  register: (login: string, password: string) => {
    return instance.post<User>(`registration.page.php`, {
      login,
      password,
    });
  },
});

export const userApi = userApiConfig(userRequest);
