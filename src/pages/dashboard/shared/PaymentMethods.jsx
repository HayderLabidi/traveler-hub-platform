import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const PaymentMethods = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, type: "Visa", last4: "4242", expiryMonth: "12", expiryYear: "25", isDefault: true },
    { id: 2, type: "Mastercard", last4: "5555", expiryMonth: "06", expiryYear: "24", isDefault: false }
  ]);
  
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: ""
  });

  const handleAddCard = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const last4 = newCard.cardNumber.slice(-4);
      const newId = paymentMethods.length > 0 ? Math.max(...paymentMethods.map(pm => pm.id)) + 1 : 1;
      
      setPaymentMethods([
        ...paymentMethods,
        {
          id: newId,
          type: "Visa", // Simplified - would normally determine this from card number
          last4,
          expiryMonth: newCard.expiryMonth,
          expiryYear: newCard.expiryYear,
          isDefault: paymentMethods.length === 0 // Make default if it's the first card
        }
      ]);
      
      setNewCard({
        cardNumber: "",
        cardholderName: "",
        expiryMonth: "",
        expiryYear: "",
        cvc: ""
      });
      
      setIsAddingNew(false);
      setIsLoading(false);
      
      toast({
        title: "Card added",
        description: "Your new payment method has been added successfully."
      });
    }, 1500);
  };

  const handleDeleteCard = (id) => {
    setPaymentMethods(prevMethods => {
      const deletedCard = prevMethods.find(method => method.id === id);
      const newMethods = prevMethods.filter(method => method.id !== id);
      
      // If we're deleting the default card, make the first remaining card (if any) the default
      if (deletedCard?.isDefault && newMethods.length > 0) {
        return newMethods.map((method, index) => 
          index === 0 ? { ...method, isDefault: true } : method
        );
      }
      
      return newMethods;
    });
    
    toast({
      title: "Card removed",
      description: "Your payment method has been removed."
    });
  };

  const handleSetDefault = (id) => {
    setPaymentMethods(prevMethods => 
      prevMethods.map(method => ({
        ...method,
        isDefault: method.id === id
      }))
    );
    
    toast({
      title: "Default payment updated",
      description: "Your default payment method has been updated."
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <NavBar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <main className="container mx-auto p-4 py-8 mt-16 flex-grow">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold">Payment Methods</h1>
            <Button variant="outline" onClick={() => navigate(-1)}>
              Back to Dashboard
            </Button>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentMethods.length > 0 ? (
                <div className="space-y-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-muted-foreground" />
                        <div>
                          <div className="font-medium">
                            {method.type} •••• {method.last4}
                            {method.isDefault && (
                              <span className="ml-2 text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900 px-2 py-0.5 rounded">
                                Default
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {!method.isDefault && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSetDefault(method.id)}
                          >
                            Set default
                          </Button>
                        )}
                        <Button 
                          variant="destructive" 
                          size="icon" 
                          onClick={() => handleDeleteCard(method.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground mb-4">No payment methods added yet</p>
                </div>
              )}
              
              {!isAddingNew && (
                <Button 
                  onClick={() => setIsAddingNew(true)} 
                  className="w-full mt-4"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add New Payment Method
                </Button>
              )}
            </CardContent>
          </Card>
          
          {isAddingNew && (
            <Card>
              <CardHeader>
                <CardTitle>Add New Payment Method</CardTitle>
                <CardDescription>
                  Enter your card details to add a new payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={newCard.cardNumber}
                      onChange={(e) => setNewCard({...newCard, cardNumber: e.target.value})}
                      required
                      maxLength={19}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cardholderName">Cardholder Name</Label>
                    <Input
                      id="cardholderName"
                      placeholder="John Doe"
                      value={newCard.cardholderName}
                      onChange={(e) => setNewCard({...newCard, cardholderName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiryMonth">Month</Label>
                      <Input
                        id="expiryMonth"
                        placeholder="MM"
                        value={newCard.expiryMonth}
                        onChange={(e) => setNewCard({...newCard, expiryMonth: e.target.value})}
                        required
                        maxLength={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="expiryYear">Year</Label>
                      <Input
                        id="expiryYear"
                        placeholder="YY"
                        value={newCard.expiryYear}
                        onChange={(e) => setNewCard({...newCard, expiryYear: e.target.value})}
                        required
                        maxLength={2}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        placeholder="123"
                        value={newCard.cvc}
                        onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                        required
                        maxLength={3}
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => setIsAddingNew(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="flex-1"
                      disabled={isLoading}
                    >
                      {isLoading ? "Adding..." : "Add Card"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PaymentMethods; 