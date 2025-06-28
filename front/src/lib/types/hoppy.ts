export interface HobbyResponse {
    success: boolean
    data?: any
    message?: string
    errors?: string[]
    count?: number
  }
  
  export interface CreateHobbyRequest {
    title: string
    description?: string
    category?: string
  }
  
  export interface UpdateHobbyRequest {
    title?: string
    description?: string
    category?: string
  }
  