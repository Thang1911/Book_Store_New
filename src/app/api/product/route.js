import { MenuItem } from "@/models/MenuItem";
import mongoose from "mongoose";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  mongoose.connect(process.env.MONGO_URL);

  const menuItem = await MenuItem.findById(id);
  const menuItems = await MenuItem.find({ category: menuItem.category });

  const results = {
    menuItem: menuItem,
    relative: menuItems
  }

  return new Response(JSON.stringify(results), {
    headers: { "Content-Type": "application/json" },
  });
}
