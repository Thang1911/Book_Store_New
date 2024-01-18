import { CartContext } from "@/components/AppContext";
import MenuItemTile from "@/components/menu/MenuItemTile";
import { useSession } from "next-auth/react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

export default function MenuItem(menuItem) {
  const { image, name, description, basePrice, authors, categoty, _id } = menuItem;
  const { addToCart } = useContext(CartContext);
  const session = useSession();
  const { status } = session;

  async function handleAddToCartButtonClick() {
    if (status === "authenticated") {
      addToCart(menuItem);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Successfully added!");
    } else {
      toast.error("Not authenticated! Please login!");
    }
  }
  return (
    <>
      <MenuItemTile onAddToCart={handleAddToCartButtonClick} {...menuItem} />
    </>
  );
}
