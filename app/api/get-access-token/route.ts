import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch("https://api.heygen.com/v1/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.HEYGEN_API_KEY}`,
      },
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("❌ Failed to fetch HeyGen token:", err);
      return NextResponse.json(
        { error: "Failed to fetch HeyGen token", details: err },
        { status: res.status }
      );
    }

    const data = await res.json();

    if (!data?.data?.token) {
      console.error("❌ No token returned from HeyGen:", data);
      return NextResponse.json(
        { error: "HeyGen did not return a token", response: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ token: data.data.token });
  } catch (error: any) {
    console.error("❌ Token route crashed:", error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
