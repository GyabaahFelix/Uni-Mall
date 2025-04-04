"use client";

import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import { currentCart } from "@wix/ecom";
import { useRouter } from "next/navigation";

const Cart = () => {
  const wixClient = useWixClient();
  const { cart, isLoading, removeItem } = useCartStore();
  const router = useRouter();

  // ✅ Corrected subtotal calculation with quantity consideration
const subtotal = cart.lineItems
? cart.lineItems.reduce(
    (total, item) => total + Number(item.price?.amount ?? 0) * Number(item.quantity ?? 1),
    0
  )
: 0;


  const handleCheckout = async () => {
    try {
      const checkout =
        await wixClient.currentCart.createCheckoutFromCurrentCart({
          channelType: currentCart.ChannelType.WEB,
        });

      const { redirectSession } =
        await wixClient.redirects.createRedirectSession({
          ecomCheckout: { checkoutId: checkout.checkoutId },
          callbacks: {
            postFlowUrl: window.location.origin,
            thankYouPageUrl: `${window.location.origin}/success`,
          },
        });

      if (redirectSession?.fullUrl) {
        window.location.href = redirectSession.fullUrl;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {isLoading ? (
        <div>Loading cart...</div> // Show loading state while fetching
      ) : !cart || !cart.lineItems ? (
        <div>Your cart is empty.</div> // If cart is undefined, show empty state
      ) : (
        <>
          <div className="grid gap-6">
            {cart.lineItems?.map((item) => ( // ✅ Ensures lineItems exists before mapping
              <div className="flex gap-4 border-b pb-4" key={item._id}>
                {item.image && (
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      120,
                      150,
                      {}
                    )}
                    alt="Product Image"
                    width={120}
                    height={150}
                    className="object-cover rounded-md"
                  />
                )}
                <div className="flex flex-col w-full justify-between">
                  <h3 className="text-lg font-semibold">
                    {item.productName?.original}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.availability?.status}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Qty: {item.quantity}</span>
                    <span className="text-black font-semibold">
                      GH₵{item.price?.amount}
                    </span>
                    <button
                      className="text-red-500 hover:underline"
                      disabled={isLoading}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold">Subtotal:</span>
            <span className="text-xl font-bold">GH₵{subtotal.toFixed(2)}</span>
          </div>

          {/* Cart Actions */}
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="rounded-md py-3 px-4 ring-1 ring-gray-300"
              onClick={() => router.push("/list?cat=all-products")}
            >
              Continue Shopping
            </button>
            <button
              className="rounded-md py-3 px-4 bg-black text-white disabled:cursor-not-allowed disabled:opacity-75"
              disabled={isLoading}
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
