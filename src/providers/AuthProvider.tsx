import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

type UserType = 'passenger' | 'driver' | 'admin' | null;

type AuthContextType = {
  user: {
    type: UserType;
    email: string;
  } | null;
  login: (email: string, type: UserType) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<{ type: UserType; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user data on mount
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = (email: string, type: UserType) => {
    const userData = { email, type };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    
    // Navigate to appropriate dashboard
    switch (type) {
      case 'passenger':
        navigate('/passenger/dashboard');
        break;
      case 'driver':
        navigate('/driver/dashboard');
        break;
      case 'admin':
        navigate('/admin/dashboard');
        break;
    }

    toast({
      title: "Success!",
      description: `Welcome back, ${email}`,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  // If still loading, show nothing
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isAuthenticated: !!user,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 