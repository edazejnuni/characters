import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const charactersApi = createApi({
  reducerPath: "charactersApi",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      headers.set("accept", "application/json");
      headers.set("accept-language", "it");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getCharacters: builder.query({
      query: ({ page }) => {
        return {
          url: `https://swapi.dev/api/people/?page=${page}`,
          method: "get"
        };
      }
    }),
    getSpecies: builder.query({
      query: ({ page }) => {
        return {
          url: `https://swapi.dev/api/species/?page=${page}`,
          method: "get"
        };
      }
    }),
    getFilms: builder.query({
      query: ({ page }) => {
        return {
          url: `https://swapi.dev/api/films/?page=${page}`,
          method: "get"
        };
      }
    }),
    getPlanets: builder.query({
      query: ({ page }) => {
        return {
          url: `https://swapi.dev/api/planets/?page=${page}`,
          method: "get"
        };
      }
    })
  })
});

export const {
  useGetCharactersQuery,
  useGetSpeciesQuery,
  useGetFilmsQuery,
  useGetPlanetsQuery
} = charactersApi;
