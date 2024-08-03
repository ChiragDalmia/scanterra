// app/api/carbon-footprint/route.ts
import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: Request) {
  try {
    // return NextResponse.json({
    //   carbonFootprint: {
    //     score: Math.floor(Math.random() * 100),
    //     reason:
    //       "Contains palm oil, a major driver of deforestation, and contains artificial flavors and colors, which are often derived from petrochemicals.",
    //   },
    // });
    const productData = await request.json();
    console.log("Product data:", JSON.stringify(productData));
    if (!productData) {
      return NextResponse.json({ error: "Product data is required" }, { status: 400 });
    }

    const message = `Given the following product data: ${JSON.stringify(productData)}, please:
    1. Calculate the carbon footprint.
    2. Assign a score out of 100, where 100 is the most environmentally friendly.
    3. Provide a one-line, specific reason for the score.
    4. Ignore any image data.
    5. Return your response as a JSON object EXACTLY with the following structure:
    {
      "score": number,
      "reason": "string"
    }`;

    const response = await anthropic.messages.create({
      model: "claude-3-sonnet-20240229",
      max_tokens: 1000,
      messages: [{ role: "user", content: message }],
    });

    // Extract the text content from the response
    const carbonFootprint = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("");

    // Parse the JSON response
    const parsedResponse = JSON.parse(carbonFootprint);

    return NextResponse.json({ carbonFootprint: parsedResponse });
  } catch (error) {
    console.error("Error calculating carbon footprint:", error);
    return NextResponse.json({ error: "Failed to calculate carbon footprint" }, { status: 500 });
  }
}
