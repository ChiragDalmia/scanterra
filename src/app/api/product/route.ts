// app/api/product/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  const apiUrl = process.env.BARCODE_LOOKUP_API_URL;
  const apiKey = process.env.BARCODE_LOOKUP_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error("API URL or API Key is missing");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(
      `${apiUrl}?barcode=${barcode}&formatted=y&key=${apiKey}`
    );

    const productData = await response.json();
    console.log(productData);

    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500 }
    );
  }
}
