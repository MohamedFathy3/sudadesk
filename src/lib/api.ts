export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/proxy';
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  // استخدام Headers object بدل object عادي
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  
  // إضافة headers الإضافية
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
        headers.append(key, value);
      });
    }
  }

  // تحضير الـ body - استخدام let علشان ممكن يتغير
  let body: BodyInit | undefined = undefined;
  
  if (options.body) {
    if (options.body instanceof FormData) {
      // إذا كان FormData، شيل الـ Content-Type
      headers.delete('Content-Type');
      body = options.body;
    } else if (typeof options.body === 'string') {
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
    console.log("🛰️ Sending request to:", url);
    console.log("📦 Method:", finalOptions.method);
    console.log("🔐 Headers:", Object.fromEntries(headers.entries()));
    console.log("📄 Body:", body instanceof FormData ? 'FormData' : body);

    const res = await fetch(url, finalOptions);

    console.log("📥 Response status:", res.status);

    const contentType = res.headers.get("content-type");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data: any = null;
    
    if (contentType?.includes("application/json")) {
      data = await res.json().catch(() => null);
    } else {
      data = await res.text().catch(() => null);
    }

    console.log("📊 Parsed response data:", data);

    if (!res.ok) {
      const message = data?.message || data?.error || res.statusText || "Unknown API error";
      console.error("❌ API returned an error:", message);
      
      // إضافة تفاصيل الأخطاء من الـ validation
      if (data?.errors) {
        const validationErrors = Object.entries(data.errors)
          .map(([field, errors]) => `${field}: ${(errors as string[]).join(', ')}`)
          .join('; ');
        throw new Error(`${message} - ${validationErrors}`);
      }
      
      throw new Error(message);
    }

    return data;
  } catch (error: unknown) {
    console.group("🚨 API Request failed");
    console.error("Error object:", error);
    if (error instanceof Error) {
      console.error("Message:", error.message);
    }
    console.groupEnd();

    throw new Error(
      error instanceof Error
        ? `Request failed: ${error.message}`
        : "Request failed: Unknown error"
    );
  }
}

export async function apiFetchBlob(endpoint: string, options: RequestInit = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api/proxy';
  const url = `${baseUrl}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  const headers = new Headers();
  
  // إضافة headers الإضافية
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
        headers.append(key, value);
      });
    }
  }

  // تحضير الـ body - استخدام let
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
    console.log("🛰️ Sending blob request to:", url);
    const res = await fetch(url, finalOptions);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || res.statusText);
    }

    return await res.blob();
  } catch (error: unknown) {
    console.error("🚨 Blob request failed:", error);
    throw error;
  }
}