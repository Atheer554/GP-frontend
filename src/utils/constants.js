export const API_BASE_URL = import.meta.env.VITE_API_URL

export const ROUTES = {
  login: '/login',
  register: '/register',
  predict: '/predict',
  history: '/history',
  dashboard: "/dashboard",
  patients: "/patients",
  analysisDetail: (id) => `/analysis/${id}`,
}

