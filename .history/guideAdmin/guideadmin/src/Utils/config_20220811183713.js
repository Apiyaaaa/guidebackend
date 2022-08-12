const BaseUrl = 'http://localhost:80/'

export const BASE_URL = process.env.NODE_ENV === 'development' ? devBaseUrl : proBaseUrl

export const TIMEOUT = 5000