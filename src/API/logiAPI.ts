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
      baseUrl: 'https://test-for-job-11102021-ws-node.herokuapp.com/'
    }),
    endpoints: builder => ({
      auth: builder.mutation<AuthTypeResponse, AuthTypeRquest>({
        query: authData => ({
          url: `/auth/${JSON.stringify(authData)}`,
          method: 'GET',
          mode: 'cors',
          headers: { 'Content-Type': 'application/json' }
        })
      })
    })
})

export const {
  useAuthMutation
} = authAPI