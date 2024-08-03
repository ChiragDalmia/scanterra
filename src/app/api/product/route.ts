// app/api/product/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  try {
    // Replace this URL with your actual product API endpoint
    const response = await fetch(
      `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=onckwuqyzvv6maeetb4txot1tbq7l5`
    );
    const productData = await response.json();

    return NextResponse.json(productData);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json(
      { error: "Failed to fetch product data" },
      { status: 500 }
    );
  }
}
