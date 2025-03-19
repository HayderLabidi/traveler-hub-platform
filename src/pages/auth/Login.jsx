import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthLayout from "@/components/AuthLayout";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/providers/AuthProvider";
import { Spinner } from "@/components/ui/spinner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("passenger");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call with setTimeout
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic validation for demo purposes
      if (!email || !password) {
        toast({
          title: "Error",
          description: "Please fill in all fields",
          variant: "destructive",
        });
        return;
      }
      
      // Use the auth context to handle login
      login(email, userType);
    }, 1000);
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      userType={userType}
    >
      <Tabs defaultValue="passenger" onValueChange={(value) => setUserType(value)}>
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="passenger">Passenger</TabsTrigger>
          <TabsTrigger value="driver">Driver</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        
        <TabsContent value="passenger">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passenger-email">Email</Label>
              <Input
                id="passenger-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="passenger-password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-brand-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="passenger-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/passenger/register" className="text-brand-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </TabsContent>
        
        <TabsContent value="driver">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="driver-email">Email</Label>
              <Input
                id="driver-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="driver-password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-brand-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="driver-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
              Don't have an account?{" "}
              <Link to="/driver/register" className="text-brand-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </TabsContent>
        
        <TabsContent value="admin">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="admin-password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-brand-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <Spinner size="sm" />
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </AuthLayout>
  );
};

export default Login; 