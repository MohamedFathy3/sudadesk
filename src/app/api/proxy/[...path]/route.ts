import { NextRequest, NextResponse } from 'next/server';

const baseUrl = process.env.TARGET_API || 'https://job.professionalacademyedu.com/api';

let requestBody: unknown = null;
let bodyRead = false;

async function readRequestBody(request: NextRequest): Promise<unknown> {
  if (bodyRead && requestBody !== null) {
    return requestBody;
  }

  const contentType = request.headers.get('content-type') || '';
  
  try {
    if (contentType.includes('multipart/form-data') || contentType.includes('boundary=')) {
      requestBody = await request.formData();
    } else if (contentType.includes('application/json')) {
      const text = await request.text();
      requestBody = text.trim() ? JSON.parse(text) : undefined;
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      requestBody = await request.formData();
    } else {
      requestBody = await request.text();
    }
    
    bodyRead = true;
    return requestBody;
  } catch (error) {
    console.error('❌ Error reading request body:', error);
    return undefined;
  }
}

function resetBodyState(): void {
  requestBody = null;
  bodyRead = false;
}

async function proxyRequest(
  method: string,
  endpoint: string,
  body?: unknown,
  request?: NextRequest,
  token?: string,
  schoolId?: string
): Promise<{ response: Response; data: unknown }> {
  const url = `${baseUrl}/${endpoint}`;
  
  const headers: HeadersInit = {};

  let finalToken = token;
  
  if (!finalToken && request) {
    const cookies = request.headers.get('cookie') || '';
    const tokenMatch = cookies.match(/token=([^;]+)/);
    
    if (tokenMatch) {
      finalToken = decodeURIComponent(tokenMatch[1]);
    }
  }

  if (finalToken) {
    headers['Authorization'] = `Bearer ${finalToken}`;
    console.log('✅ Token added to headers');
  }

  let finalSchoolId = schoolId;
  
  if (!finalSchoolId && request) {
    const cookies = request.headers.get('cookie') || '';
    const schoolIdMatch = cookies.match(/school_id=([^;]+)/);
    
    if (schoolIdMatch) {
      finalSchoolId = decodeURIComponent(schoolIdMatch[1]);
    }
  }

  // إضافة X-School-ID header إذا موجود
  if (finalSchoolId) {
    headers['X-School-ID'] = finalSchoolId;
    console.log('🏫 School ID added to headers:', finalSchoolId);
  }

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (body) {
    if (body instanceof FormData) {
      fetchOptions.body = body;
    } else {
      headers['Content-Type'] = 'application/json';
      fetchOptions.body = JSON.stringify(body);
    }
  }

  console.log('🚀 Proxying request to:', url);
  console.log('📋 Method:', method);
  console.log('🔐 Headers:', headers);
  console.log('📦 Body type:', body ? (body instanceof FormData ? 'FormData' : 'JSON') : 'No body');

  try {
    const response = await fetch(url, fetchOptions);
    
    console.log('📡 Response status:', response.status);
    
    const responseContentType = response.headers.get('content-type') || '';
    const isJson = responseContentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    return { response, data };
  } catch (error) {
    console.error('❌ Fetch error:', error);
    throw error;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');
    
    console.log('📨 Received POST request for:', endpoint);

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    const token: string | undefined = authHeader || undefined;
    const schoolId: string | undefined = schoolHeader || undefined;

    const body = await readRequestBody(request);
    console.log('📄 Body read successfully, type:', body ? (body instanceof FormData ? 'FormData' : typeof body) : 'No body');

    const { response, data } = await proxyRequest('POST', endpoint, body, request, token, schoolId);

    if ((endpoint === 'login/admin' || endpoint === 'user/login') && response.ok && data && typeof data === 'object' && 'token' in data) {
      console.log('🔐 Login successful, returning token in response');
      
      const responseData = data as { token: string; data?: { school_id?: string } };
      
      const userSchoolId = responseData.data?.school_id || null;
      
      const enhancedResponseData = {
        ...responseData,
        _token: responseData.token,
        _school_id: userSchoolId
      };
      
      const res = NextResponse.json(enhancedResponseData, { status: response.status });
      
      res.cookies.set({
        name: 'token',
        value: responseData.token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      });

      if (userSchoolId) {
        res.cookies.set({
          name: 'school_id',
          value: userSchoolId.toString(),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 60 * 60 * 24 * 7,
          path: '/',
        });
      }
      
      return res;
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy POST error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    console.log('📨 Received GET request for:', endpoint);

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    const token: string | undefined = authHeader || undefined;
    const schoolId: string | undefined = schoolHeader || undefined;

    const { response, data } = await proxyRequest('GET', endpoint, undefined, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest): Promise<NextResponse> {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    const token: string | undefined = authHeader || undefined;
    const schoolId: string | undefined = schoolHeader || undefined;

    const body = await readRequestBody(request);

    const { response, data } = await proxyRequest('PUT', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy PUT error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}

export async function PATCH(request: NextRequest): Promise<NextResponse> {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    const token: string | undefined = authHeader || undefined;
    const schoolId: string | undefined = schoolHeader || undefined;

    const body = await readRequestBody(request);

    const { response, data } = await proxyRequest('PATCH', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy PATCH error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  resetBodyState();
  
  try {
    const url = new URL(request.url);
    const path = url.pathname.split('/api/proxy/')[1].split('/');
    const endpoint = path.join('/');

    const authHeader = request.headers.get('x-auth-token');
    const schoolHeader = request.headers.get('x-school-id');
    const token: string | undefined = authHeader || undefined;
    const schoolId: string | undefined = schoolHeader || undefined;

    let body: unknown = undefined;
    
    try {
      const contentType = request.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        body = await readRequestBody(request);
      }
    } catch (parseError) {
      console.error('❌ JSON parse error in DELETE:', parseError);
    }

    const { response, data } = await proxyRequest('DELETE', endpoint, body, request, token, schoolId);
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('❌ Proxy DELETE error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  } finally {
    resetBodyState();
  }
}