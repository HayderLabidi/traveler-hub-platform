
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { Mail, ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      
      toast({
        title: "Reset link sent",
        description: "If an account exists with that email, you'll receive a password reset link.",
      });
    }, 1500);
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a link to reset your password"
    >
      {!isSubmitted ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send reset link"}
          </Button>
          
          <div className="mt-4 text-center">
            <Link to="/login" className="text-sm text-brand-500 hover:underline inline-flex items-center">
              <ArrowLeft className="mr-1 h-3 w-3" />
              Back to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-4">
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <p className="text-green-700 dark:text-green-300">
              Reset link sent! Check your email.
            </p>
          </div>
          
          <p className="text-sm text-muted-foreground">
            Didn't receive an email? Check your spam folder or try again.
          </p>
          
          <Button variant="outline" className="mt-4" onClick={() => setIsSubmitted(false)}>
            Try again
          </Button>
          
          <div className="mt-4">
            <Link to="/login" className="text-sm text-brand-500 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;
