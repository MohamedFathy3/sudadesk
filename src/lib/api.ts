/**
 * Redirect to authentication page and clear user data
 * @throws {Error} Always throws an error to stop execution
 */
const redirectToAuth = (): never => {
  if (typeof window === 'undefined') {
    throw new Error('Authentication required');
  }


  if(window.location.pathname === '/auth') {
    throw new Error('Authentication required');
  }

  try {
    // Clear essential storage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    sessionStorage.clear();
    
    // Clear cookies
    document.cookie.split(';').forEach(cookie => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

    // Redirect with current page
    const currentPath = window.location.pathname + window.location.search;
    const authUrl = `/auth?redirect=${encodeURIComponent(currentPath)}`;
    
    console.log('🔐 Redirecting to auth page:', authUrl);
    window.location.href = authUrl;
    
    throw new Error('Redirecting to authentication page');
  } catch (error) {
    // Fallback redirect
    window.location.href = '/auth';
    throw new Error('Authentication required');
  }
};

/**
 * Enhanced fetch function with automatic 401 handling
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/proxy';
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  // Prepare headers
  const headers = new Headers();
  
  // Only add Content-Type if not FormData
  if (!(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }
  
  // Merge additional headers
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers.append(key, value);
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers.append(key, value);
      });
    } else {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          headers.append(key, value.toString());
        }
      });
    }
  }

  // Prepare body
  let body: BodyInit | undefined = undefined;
  
  if (options.body) {
    if (options.body instanceof FormData || typeof options.body === 'string') {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
    }
  }

  const finalOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers,
    body,
  };

  try {
    console.log(`🌐 ${options.method || 'GET'} ${url}`);
    
    const res = await fetch(url, finalOptions);

    // Handle 401 Unauthorized
    if (res.status === 401) {
      console.warn('⚠️ Session expired, redirecting to login');
      redirectToAuth();
    }

    // Get response content type
    const contentType = res.headers.get("content-type");
    debugger;
    // Parse response based on content type
    let data: any = null;
    if (contentType?.includes("application/json")) {
      data = await res.json().catch(() => null);
    } else {
      data = await res.text().catch(() => null);
    }

    // Handle non-OK responses
    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText || "Unknown API error";
      
      // Add validation errors if present
      if (data?.errors && typeof data.errors === 'object') {
        const validationErrors = Object.entries(data.errors)
          .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
          .join('; ');
        throw new Error(`${message} - ${validationErrors}`);
      }
      
      throw new Error(message);
    }

    return data;
  } catch (error: unknown) {
    // Don't handle redirect errors - let them bubble up
    if (error instanceof Error && error.message.includes('Redirecting')) {
      throw error;
    }
    
    // Log and rethrow other errors
    console.error('🚨 API Request failed:', error);
    throw new Error(
      error instanceof Error
        ? `Request failed: ${error.message}`
        : "Request failed: Unknown error"
    );
  }
}

/**
 * Fetch function for binary data (blobs) with 401 handling
 */
export async function apiFetchBlob(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/proxy';
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  const headers = new Headers();
  
  // Merge headers
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers.append(key, value);
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers.append(key, value);
      });
    } else {
      Object.entries(options.headers).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          headers.append(key, value.toString());
        }
      });
    }
  }

  // Prepare body
  let body: BodyInit | undefined = undefined;
  
  if (options.body) {
    if (options.body instanceof FormData) {
      body = options.body;
    } else if (typeof options.body === 'string') {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
      headers.append('Content-Type', 'application/json');
    }
  }

  const finalOptions: RequestInit = {
    ...options,
    credentials: 'include',
    headers,
    body,
  };

  try {
    console.log(`🌐 ${options.method || 'GET'} ${url} (blob)`);
    
    const res = await fetch(url, finalOptions);

    // Handle 401
    if (res.status === 401) {
      console.warn('⚠️ Session expired for blob request');
      redirectToAuth();
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || res.statusText);
    }

    return await res.blob();
  } catch (error: unknown) {
    if (error instanceof Error && error.message.includes('Redirecting')) {
      throw error;
    }
    
    console.error('🚨 Blob request failed:', error);
    throw error;
  }
}

/**
 * Utility function for common HTTP methods
 */
export const apiClient = {
  get: (endpoint: string, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: 'GET' }),
  
  post: (endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: 'POST', body: data }),
  
  put: (endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: 'PUT', body: data }),
  
  patch: (endpoint: string, data?: any, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: 'PATCH', body: data }),
  
  delete: (endpoint: string, options?: RequestInit) => 
    apiFetch(endpoint, { ...options, method: 'DELETE' }),
  
  // Blob methods
  getBlob: (endpoint: string, options?: RequestInit) =>
    apiFetchBlob(endpoint, { ...options, method: 'GET' }),
  
  postBlob: (endpoint: string, data?: any, options?: RequestInit) =>
    apiFetchBlob(endpoint, { ...options, method: 'POST', body: data }),
};

export default apiClient;