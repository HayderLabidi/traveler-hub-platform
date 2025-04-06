import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { User, Car, ArrowRight } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";

const RegisterChoice = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout
      title="Join RideShare"
      subtitle="Choose how you want to use our platform"
    >
      <div className="grid gap-6 md:grid-cols-2 max-w-3xl mx-auto">
        {/* Passenger Card */}
        <Card 
          className="overflow-hidden border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-md cursor-pointer"
          onClick={() => navigate("/passenger/register")}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <User className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Passenger</h3>
                  <p className="text-blue-100 text-sm">Book rides with trusted drivers</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-4">
              <p>• Book rides instantly</p>
              <p>• Track your ride in real-time</p>
              <p>• Rate and review drivers</p>
              <p>• Multiple payment options</p>
            </div>
            
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
              size="sm"
            >
              Register as Passenger
            </Button>
          </CardContent>
        </Card>

        {/* Driver Card */}
        <Card 
          className="overflow-hidden border-2 hover:border-green-500 transition-all duration-300 hover:shadow-md cursor-pointer"
          onClick={() => navigate("/driver/register")}
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Driver</h3>
                  <p className="text-green-100 text-sm">Earn money by driving passengers</p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground mb-4">
              <p>• Set your own schedule</p>
              <p>• Earn competitive rates</p>
              <p>• Get paid weekly</p>
              <p>• Flexible working hours</p>
            </div>
            
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white" 
              size="sm"
            >
              Register as Driver
            </Button>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
};

export default RegisterChoice; 