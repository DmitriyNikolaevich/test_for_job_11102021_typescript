import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query"

export type AuthTypeResponse = {
    isAuth: boolean
    errorMessage: string
    userName: string
}

export type AuthTypeRquest = {
    login: string
    pass: string
}

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3500'
    }),
    endpoints: builder => ({
      auth: builder.query<AuthTypeResponse, AuthTypeRquest>({
        query: authData => ({url: `auth/${authData}`})
      })
    })
})