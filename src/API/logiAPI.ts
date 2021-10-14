import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export type AuthTypeResponse = {
    data: {
      isAuth: boolean
      errorMessage: string
      userName: string
    }
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
      auth: builder.mutation<AuthTypeResponse, AuthTypeRquest>({
        query: authData => ({
          url: `/auth/${JSON.stringify(authData)}`,
          method: 'GET'
        })
      })
    })
})

export const {
  useAuthMutation
} = authAPI