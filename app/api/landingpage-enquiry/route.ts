import {
  NextRequest,
  NextResponse,
} from "next/server";

const API_URL =
  "https://api.ayatiworks.com/api/v1/public/dev-apartments/landing_page_enquiry_form/records";

const API_KEY =
  "39b4aff2510cf0d447ab9aec5820f8109263ac088547e5c00d7ed4082085eabe";

interface LandingPageEnquiryRequestBody {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  villa_type?: unknown;
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

export async function POST(
  request: NextRequest,
) {
  try {
    let body: LandingPageEnquiryRequestBody;

    try {
      body =
        (await request.json()) as LandingPageEnquiryRequestBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request body.",
        },
        {
          status: 400,
        },
      );
    }

    const name =
      typeof body.name ===
      "string"
        ? body.name.trim()
        : "";

    const phone =
      typeof body.phone ===
      "string"
        ? body.phone.trim()
        : "";

    const email =
      typeof body.email ===
      "string"
        ? body.email.trim()
        : "";

    const villaType =
      typeof body.villa_type ===
      "string"
        ? body.villa_type.trim()
        : "";

    const message =
      typeof body.message ===
      "string"
        ? body.message.trim()
        : "";

    // Required fields
    if (
      !name ||
      !phone ||
      !email ||
      !villaType
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in all required fields.",
        },
        {
          status: 400,
        },
      );
    }

    // Email validation
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailPattern.test(
        email,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        {
          status: 400,
        },
      );
    }

    // Phone validation
    const phonePattern =
      /^[0-9+\-()\s]{7,20}$/;

    if (
      !phonePattern.test(
        phone,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid phone number.",
        },
        {
          status: 400,
        },
      );
    }

    // Optional villa validation
    const allowedVillaTypes = [
      "3 BHK Premium Villa",
      "4 BHK Premium Villa",
    ];

    if (
      !allowedVillaTypes.includes(
        villaType,
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please select a valid villa type.",
        },
        {
          status: 400,
        },
      );
    }

    const controller =
      new AbortController();

    const timeoutId =
      setTimeout(() => {
        controller.abort();
      }, 20000);

    let apiResponse: Response;

    try {
      apiResponse =
        await fetch(
          API_URL,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "application/json",

              "X-API-Key":
                API_KEY,
            },

            body: JSON.stringify(
              {
                data: {
                  name,
                  phone,
                  email,
                  villa_type:
                    villaType,
                  message,
                },
              },
            ),

            cache: "no-store",

            signal:
              controller.signal,
          },
        );
    } finally {
      clearTimeout(
        timeoutId,
      );
    }

    const responseText =
      await apiResponse.text();

    let responseData: ExternalApiResponse =
      {};

    if (responseText) {
      try {
        responseData =
          JSON.parse(
            responseText,
          ) as ExternalApiResponse;
      } catch {
        responseData = {
          message:
            responseText,
        };
      }
    }

    console.log(
      "Landing page enquiry API response:",
      apiResponse.status,
      responseData,
    );

    if (!apiResponse.ok) {
      const backendMessage =
        typeof responseData.message ===
        "string"
          ? responseData.message
          : typeof responseData.detail ===
              "string"
            ? responseData.detail
            : "Unable to submit your enquiry.";

      return NextResponse.json(
        {
          success: false,
          message:
            backendMessage,
          backendStatus:
            apiResponse.status,
        },
        {
          status:
            apiResponse.status >=
              400 &&
            apiResponse.status <=
              599
              ? apiResponse.status
              : 502,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you! Your site visit enquiry has been submitted successfully.",
        data: responseData,
      },
      {
        status: 200,
      },
    );
  } catch (
    error: unknown
  ) {
    console.error(
      "Landing page enquiry route error:",
      error,
    );

    const isAbortError =
      error instanceof
        Error &&
      error.name ===
        "AbortError";

    return NextResponse.json(
      {
        success: false,
        message:
          isAbortError
            ? "The request timed out. Please try again."
            : "Something went wrong while submitting the form.",
      },
      {
        status:
          isAbortError
            ? 504
            : 500,
      },
    );
  }
}

export function GET() {
  return NextResponse.json(
    {
      success: true,
      message:
        "Landing page enquiry API route is working.",
    },
    {
      status: 200,
    },
  );
}