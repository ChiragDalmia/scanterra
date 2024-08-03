// app/api/product/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const barcode = searchParams.get("barcode");

  if (!barcode) {
    return NextResponse.json({ error: "Barcode is required" }, { status: 400 });
  }

  try {
    // const response = await fetch(
    //   `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=onckwuqyzvv6maeetb4txot1tbq7l5`
    // );

    // const productData = await response.json();
    // console.log(response);

    // return NextResponse.json(productData);
    return NextResponse.json({ data: "Product data" });
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json({ error: "Failed to fetch product data" }, { status: 500 });
  }
}
