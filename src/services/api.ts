// Base API configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

export interface ApiError {
  message: string;
  status: number;
}

export class ApiException extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiException';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = `Error ${response.status}: ${response.statusText}`;
    try {
      const errorText = await response.text();
      if (errorText) {
        errorMessage = errorText;
      }
    } catch (e) {
      // Si no se puede leer el texto, usar el mensaje por defecto
    }
    
    console.error('API Error:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      message: errorMessage,
      pathname: typeof window !== 'undefined' ? window.location.pathname : 'unknown'
    });
    
    // Si es 403 (Forbidden) o 401 (Unauthorized)
    if (response.status === 403 || response.status === 401) {
      // NO redirigir automáticamente - solo lanzar el error
      // Cada componente decidirá qué hacer con el error
      throw new ApiException(errorMessage, response.status);
    }
    
    throw new ApiException(errorMessage, response.status);
  }
  
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  
  return response.text() as any;
}

export async function apiGet<T>(endpoint: string, token?: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const url = `${API_BASE_URL}${endpoint}`;
  console.log('API GET Request:', { url, headers: Object.keys(headers) });
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers,
    });
    
    console.log('API GET Response:', {
      url,
      status: response.status,
      statusText: response.statusText,
      ok: response.ok
    });
    
    return handleResponse<T>(response);
  } catch (error) {
    console.error('API GET Error:', error);
    throw error;
  }
}

export async function apiPost<T>(endpoint: string, data: any, token?: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(data),
  });
  
  return handleResponse<T>(response);
}

export async function apiPut<T>(endpoint: string, data: any, token?: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(data),
  });
  
  return handleResponse<T>(response);
}

export async function apiDelete<T>(endpoint: string, token?: string): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: 'DELETE',
    headers,
  });
  
  return handleResponse<T>(response);
}
