import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/react-label";

interface ApiKeyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (key: string) => void;
}

export function ApiKeyModal({ open, onOpenChange, onSave }: ApiKeyModalProps) {
  const [key, setKey] = useState("");

  useEffect(() => {
    if (open) {
      const storedKey = localStorage.getItem("gemini_api_key");
      if (storedKey) setKey(storedKey);
    }
  }, [open]);

  const handleSave = () => {
    if (key.trim()) {
      localStorage.setItem("gemini_api_key", key.trim());
      onSave(key.trim());
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Gemini API Key</DialogTitle>
          <DialogDescription>
            To use the AI features, you need to provide your own Google Gemini API key.
            Your key is stored locally in your browser and never saved to our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="api-key">API Key</Label>
            <Input
              id="api-key"
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="AIzaSy..."
              type="password"
            />
          </div>
          <div className="text-sm text-muted-foreground">
            Don't have a key?{" "}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              Get one here
            </a>
            .
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Key</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

