import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

// ✅ GET — fetch feedbacks
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("snack-feedback"); // make sure your DB name matches
    const customers = await db.collection("customers").find({}).toArray();
    return NextResponse.json(customers);
  } catch (error) {
    console.error("❌ Error fetching customers:", error);
    return NextResponse.json(
      { message: "Error fetching customers", error: error.message },
      { status: 500 }
    );
  }
}

// ✅ POST — add feedback
export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db("snack-feedback");

    const data = await request.json();
    const result = await db.collection("customers").insertOne(data);

    return NextResponse.json(
      { message: "✅ Customer added successfully", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding customer:", error);
    return NextResponse.json(
      { message: "Error adding customer", error: error.message },
      { status: 500 }
    );
  }
}
