import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const AgeVerification = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem("age-verified");
    if (!verified) {
      setOpen(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem("age-verified", "true");
    setOpen(false);
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-card border-primary/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-display text-primary">Age Verification</AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            This website contains adult content. By entering, you confirm that you are at least 18 years of age (or the legal age of majority in your jurisdiction).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleVerify}
            className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto"
          >
            I AM 18+
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AgeVerification;
