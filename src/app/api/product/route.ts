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
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

  try {
    // const response = await fetch(
    //   `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=t9l9ah0hro6v7m2nbtrcn9x4bs1u4h`
    // );

    const productData = await response.json();
    console.log(productData);

    // return NextResponse.json(productData);
    return NextResponse.json(j);
  } catch (error) {
    console.error("Error fetching product data:", error);
    return NextResponse.json({ error: "Failed to fetch product data" }, { status: 500 });
  }
}

const j = {
  products: [
    {
      barcode_number: "060410025987",
      barcode_formats: "UPC-A 060410025987, EAN-13 0060410025987",
      mpn: "",
      model: "",
      asin: "B0089YT1EK",
      title: "Chips Au Ketchup",
      category: "Food, Beverages & Tobacco",
      manufacturer: "Canyon Leather",
      brand: "Lay's",
      contributors: [],
      age_group: "",
      ingredients:
        "Ron/fer 2 %0 Ents: Specially Selected Potatoes, Vegetable Oil, Seasoning (sugar, Salt, Ingredients, Dehydrated Vegetables (tomato, Garlic, Onion], Monosodium Glutamate, Sodium Acetate, Corn Maltodextrin, Acetic Acid, Natural And Artificial Flavour, Dextrose, Malic Acid, Citric Acid, Colour, Modified Cornstarch, Spices, Vingar Solids, Disodium Inosinate, Disodium Guanylate). Contains Milk Ingredients. Gluten-free. Ingrédients: Pommes De Terre Spécialement Sélectionnées, Huile Végétale, Assaisonnement (sucre, Sel, Ingrédients Du Lait, Légumes Déshydratés [tomate, Ail, Oignon, Glutamate Monosodique, Acetate De Sodium, Maltodextrine De Mais, Acide Cétique, Arômes Naturel Et Artificiel, Dextrose, Acide Malique, Acide Citrique, Colorant, Amidon De Maïs Modifié, épices, Matière Sèche Du Vinaigre, Inosinate Disodique, Guanylate Disodique). Contient Des Ingrédients Du Lait. Sans Gluten.",
      nutrition_facts:
        "Energy 535.71428571429 kcal, Fat 32.142857142857 g, Saturated Fat 3.5714285714286 g, Carbohydrates 53.571428571429 g, Sugars 7.1428571428571 g, Protein 7.1428571428571 g, Salt 1.6964285714286 g.",
      energy_efficiency_class: "",
      color: "",
      gender: "",
      material: "",
      pattern: "",
      format: "",
      multipack: "",
      size: "",
      length: "",
      width: "",
      height: "",
      weight: "",
      release_date: "",
      description: "Chips au ketchup. Labels: En:no-gluten. Country of origin: Canada.",
      features: [],
      images: ["https://images.barcodelookup.com/5346/53460122-1.jpg"],
      last_update: "2023-10-21 05:42:36",
      stores: [],
      reviews: [],
    },
  ],
};
