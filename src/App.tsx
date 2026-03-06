import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useCartSync } from "@/hooks/useCartSync";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Merch from "./pages/Merch";
import MerchCategory from "./pages/MerchCategory";
import ProductDetail from "./pages/ProductDetail";
import Auth from "./pages/Auth";
import Member from "./pages/Member";
import NotFound from "./pages/NotFound";
import BackgroundPig from "./components/BackgroundPig";

const queryClient = new QueryClient();

const AppContent = () => {
  useCartSync();
  return (
    <>
    <BackgroundPig />
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/merch" element={<Merch />} />
      <Route path="/merch/:category" element={<MerchCategory />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/shop/:category" element={<ShopCategory />} />
      <Route path="/product/:handle" element={<ProductDetail />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/member" element={<Member />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
