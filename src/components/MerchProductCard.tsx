import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ruler } from "lucide-react";

import creamFront from "@/assets/merch/cream-front.png";
import creamBack from "@/assets/merch/cream-back.png";
import blackFront from "@/assets/merch/black-front.png";
import blackBack from "@/assets/merch/black-back.png";
import navyFront from "@/assets/merch/navy-front.png";
import navyBack from "@/assets/merch/navy-back.png";
import armyFront from "@/assets/merch/army-front.png";
import armyBack from "@/assets/merch/army-back.png";
import whiteFront from "@/assets/merch/white-front.png";
import whiteBack from "@/assets/merch/white-back.png";

const COLORS = [
  { id: "black", label: "Black", hex: "#1a1a1a", front: blackFront, back: blackBack },
  { id: "navy", label: "Navy", hex: "#1B2A4A", front: navyFront, back: navyBack },
  { id: "army", label: "Army Green", hex: "#4B5320", front: armyFront, back: armyBack },
  { id: "cream", label: "Cream", hex: "#F5F0E1", front: creamFront, back: creamBack },
  { id: "white", label: "White", hex: "#F8F8F8", front: whiteFront, back: whiteBack },
] as const;

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

const MerchProductCard = () => {
  const [selectedColor, setSelectedColor] = useState<typeof COLORS[number]>(COLORS[0]);
  const [view, setView] = useState<"front" | "back">("front");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  return (
    <Card className="bg-[hsl(320,60%,15%)] border-border/20 overflow-hidden hover:border-primary/50 transition-colors duration-300 max-w-sm w-full">
      {/* Image with front/back toggle */}
      <div className="relative aspect-square overflow-hidden bg-muted cursor-pointer" onClick={() => setView(v => v === "front" ? "back" : "front")}>
        <img
          src={view === "front" ? selectedColor.front : selectedColor.back}
          alt={`Signature Tee – ${selectedColor.label} (${view})`}
          className="object-cover w-full h-full transition-opacity duration-300"
        />
        {/* View toggle pills */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex rounded-full border border-border/40 bg-background/80 backdrop-blur-sm text-xs overflow-hidden">
          <button
            onClick={(e) => { e.stopPropagation(); setView("front"); }}
            className={`px-3 py-1 transition-colors ${view === "front" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Front
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setView("back"); }}
            className={`px-3 py-1 transition-colors ${view === "back" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
          >
            Back
          </button>
        </div>
      </div>

      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-foreground">Signature Collection Tee</h3>
          <p className="text-xl font-bold text-primary mt-1">£29.99</p>
        </div>

        {/* Color swatches */}
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">
            Colour — {selectedColor.label}
          </span>
          <div className="flex gap-2 mt-2">
            {COLORS.map((color) => (
              <button
                key={color.id}
                onClick={() => { setSelectedColor(color); setView("front"); }}
                className={`h-7 w-7 rounded-full border-2 transition-all ${
                  selectedColor.id === color.id
                    ? "border-primary scale-110 ring-2 ring-primary/30"
                    : "border-border/40 hover:border-foreground/40"
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        {/* Size selector */}
        <div>
          <span className="text-xs text-muted-foreground uppercase tracking-wider">Size</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-3 py-1.5 text-xs font-medium rounded border transition-all ${
                  selectedSize === size
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border/40 text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
          >
            <Ruler className="h-3 w-3" />
            Size Guide
          </a>
        </div>

        {/* Material & Fit */}
        <div className="text-xs text-muted-foreground border-t border-border/20 pt-3 space-y-1">
          <p>100% Premium Cotton · 180 GSM</p>
          <p>Regular Fit · Crew Neck</p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full bg-secondary/10 hover:bg-secondary hover:text-secondary-foreground text-foreground border border-secondary/20 hover:border-secondary transition-all duration-300 neon-button"
          disabled={!selectedSize}
        >
          {selectedSize ? "Add to Cart" : "Select a Size"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MerchProductCard;
