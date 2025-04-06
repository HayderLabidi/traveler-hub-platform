
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentMethods = ({ paymentMethods }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            <CardTitle>Payment Methods</CardTitle>
          </div>
          <Button variant="outline" onClick={() => navigate("/payment-methods")}>
            Manage
          </Button>
        </div>
        <CardDescription>Your saved payment methods</CardDescription>
      </CardHeader>
      <CardContent>
        {paymentMethods && paymentMethods.length > 0 ? (
          paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg mb-2 hover:bg-muted/50 transition-colors">
              <div>
                <div className="font-medium">{method.type}</div>
                <div className="text-sm text-muted-foreground">
                  •••• {method.last4} • Expires {method.expiry}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No payment methods added
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PaymentMethods;
