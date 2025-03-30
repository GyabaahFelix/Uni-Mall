import { NextResponse } from "next/server";
import { wixClientServer } from "@/lib/wixClientServer";

export async function GET() {
  try {
    const wixClient = await wixClientServer();
    const cats = await wixClient.collections.queryCollections().find();
    return NextResponse.json({ categories: cats.items });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
