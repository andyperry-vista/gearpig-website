import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, Minus, ExternalLink, Loader2 } from "lucide-react";
import { useCartStore } from "@/stores/cartStore";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer = ({ open, onOpenChange }: CartDrawerProps) => {
  const { items, isLoading, isSyncing, updateQuantity, removeItem, getCheckoutUrl, syncCart } = useCartStore();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.price.amount) * item.quantity), 0);

  // Sync cart with Shopify when drawer opens
  useState(() => { if (open) syncCart(); });

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl();
    if (checkoutUrl) {
      window.open(checkoutUrl, '_blank');
      onOpenChange(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="flex flex-col w-full sm:max-w-sm">
        <SheetHeader>
          <SheetTitle className="text-2xl">Shopping Cart</SheetTitle>
          <SheetDescription>
            {totalItems === 0 ? "Your cart is empty" : `${totalItems} item${totalItems !== 1 ? 's' : ''} in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto pr-2">
          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.variantId} className="flex gap-4 pb-4 border-b border-border/50">
                  <div className="w-16 h-16 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    {item.product.node.images?.edges?.[0]?.node && (
                      <img
                        src={item.product.node.images.edges[0].node.url}
                        alt={item.product.node.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground mb-1 line-clamp-2 text-sm">
                      {item.product.node.title}
                    </h4>
                    <p className="text-xs text-muted-foreground">{item.selectedOptions.map(o => o.value).join(' • ')}</p>
                    <p className="text-primary font-bold">
                      {item.price.currencyCode} {(parseFloat(item.price.amount) * item.quantity).toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.variantId, item.quantity - 1)}>
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-sm font-semibold">{item.quantity}</span>
                      <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => updateQuantity(item.variantId, item.quantity + 1)}>
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7 ml-auto text-destructive hover:text-destructive" onClick={() => removeItem(item.variantId)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-muted-foreground text-center">Your cart is empty</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        {items.length > 0 && (
          <div className="flex-shrink-0 space-y-4 border-t border-border/50 pt-4">
            <div className="space-y-2 w-full">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal:</span>
                <span>{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shipping:</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-foreground border-t border-border/50 pt-2">
                <span>Total:</span>
                <span className="text-primary">{items[0]?.price.currencyCode} {totalPrice.toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={handleCheckout} className="w-full" size="lg" disabled={isLoading || isSyncing}>
              {isLoading || isSyncing ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Checkout with Shopify
                </>
              )}
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
