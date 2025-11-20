"use client";

import { FormEvent, useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/react-label";

export default function SignInPage() {
  const router = useRouter();
  const { status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showVerifiedMessage, setShowVerifiedMessage] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState("/templates");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCallback = params.get("callbackUrl");
    if (urlCallback) {
      setCallbackUrl(urlCallback);
    }
    const verifiedParam = params.get("verified");
    if (verifiedParam === "1") {
      setShowVerifiedMessage(true);
      params.delete("verified");
      const newQuery = params.toString();
      const newUrl = `${window.location.pathname}${
        newQuery ? `?${newQuery}` : ""
      }`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  useEffect(() => {
    if (!showVerifiedMessage) {
      return;
    }
    const timer = setTimeout(() => {
      setShowVerifiedMessage(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [showVerifiedMessage]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      // Check if it's an email verification error
      if (result.error.includes("verify your email")) {
        setError(result.error);
      } else {
        setError("Invalid email or password");
      }
      return;
    }

    router.push(callbackUrl);
  };

  const handleGoogle = async () => {
    await signIn("google", { callbackUrl });
  };

  if (status === "loading" || status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="w-full max-w-md border border-border rounded-lg p-6 bg-card text-center">
          <p className="text-sm text-muted-foreground">
            {status === "loading"
              ? "Checking your session..."
              : "Redirecting you to your account..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md border border-border rounded-lg p-6 bg-card">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in with your email and password or continue with Google.
        </p>

        {showVerifiedMessage && (
          <div className="mb-4 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-3">
          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800 dark:text-green-200">
                Email verified successfully!
              </p>
              <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                You can now sign in to your account.
              </p>
            </div>
          </div>
        )}

        <form onSubmit={onSubmit} className="space-y-4 mb-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-500" role="alert">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <Button
          type="button"
          variant="outline"
          className="w-full mb-2"
          onClick={handleGoogle}
        >
          Continue with Google
        </Button>

        <p className="text-xs text-muted-foreground mt-4 text-center">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-primary hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}


