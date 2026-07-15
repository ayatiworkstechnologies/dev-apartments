import { NextRequest, NextResponse } from "next/server";

const API_URL =
  "https://api.ayatiworks.com/api/v1/public/dev-apartments/contact/records";

const API_KEY =
  "39b4aff2510cf0d447ab9aec5820f8109263ac088547e5c00d7ed4082085eabe";

interface ContactRequestBody {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
}

interface ExternalApiResponse {
  success?: boolean;
  message?: string;
  detail?: string;
  data?: unknown;
  [key: string]: unknown;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    let body: ContactRequestBody;

    try {
      body = (await request.json()) as ContactRequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    if (!name || !email || !phone || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    const phonePattern =
      /^[0-9+\-()\s]{7,20}$/;

    if (!phonePattern.test(phone)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, 20000);

    let apiResponse: Response;

    try {
      apiResponse = await fetch(API_URL, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "X-API-Key": API_KEY,
        },

        body: JSON.stringify({
          data: {
            name,
            email,
            phone,
            message,
          },
        }),

        cache: "no-store",
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timeoutId);
    }

    const responseText =
      await apiResponse.text();

    let responseData: ExternalApiResponse = {};

    if (responseText) {
      try {
        responseData = JSON.parse(
          responseText,
        ) as ExternalApiResponse;
      } catch {
        responseData = {
          message: responseText,
        };
      }
    }

    console.log(
      "Contact API response:",
      apiResponse.status,
      responseData,
    );

    if (!apiResponse.ok) {
      const backendMessage =
        typeof responseData.message === "string"
          ? responseData.message
          : typeof responseData.detail === "string"
            ? responseData.detail
            : "Unable to submit your enquiry.";

      return NextResponse.json(
        {
          success: false,
          message: backendMessage,
          backendStatus: apiResponse.status,
        },
        {
          status:
            apiResponse.status >= 400 &&
            apiResponse.status <= 599
              ? apiResponse.status
              : 502,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your enquiry has been submitted successfully.",
        data: responseData,
      },
      {
        status: 200,
      },
    );
  } catch (error: unknown) {
    console.error(
      "Contact form route error:",
      error,
    );

    const isAbortError =
      error instanceof Error &&
      error.name === "AbortError";

    return NextResponse.json(
      {
        success: false,
        message: isAbortError
          ? "The request timed out. Please try again."
          : "Something went wrong while submitting the form.",
      },
      {
        status: isAbortError ? 504 : 500,
      },
    );
  }
}

export function GET() {
  return NextResponse.json(
    {
      success: true,
      message: "Contact API route is working.",
    },
    {
      status: 200,
    },
  );
}
