import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Download, CreditCard, DollarSign, BarChart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PaymentsPage = () => {
  const [transactions, setTransactions] = useState([
    { 
      id: "TRX-1001",
      user: "John Smith",
      type: "Ride Payment",
      amount: "$24.50",
      method: "Credit Card",
      date: "2023-07-15",
      status: "Completed"
    },
    { 
      id: "TRX-1002",
      user: "Michael Davis",
      type: "Driver Payout",
      amount: "$18.38",
      method: "Bank Transfer",
      date: "2023-07-15",
      status: "Completed"
    },
    { 
      id: "TRX-1003",
      user: "Sarah Johnson",
      type: "Ride Payment",
      amount: "$18.75",
      method: "PayPal",
      date: "2023-07-15",
      status: "Completed"
    },
    { 
      id: "TRX-1004",
      user: "David Thompson",
      type: "Driver Payout",
      amount: "$14.06",
      method: "Bank Transfer",
      date: "2023-07-16",
      status: "Processing"
    },
    { 
      id: "TRX-1005",
      user: "Emily Wilson",
      type: "Ride Refund",
      amount: "$15.00",
      method: "Credit Card",
      date: "2023-07-16",
      status: "Completed"
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter(
    (transaction) =>
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    totalRevenue: "$12,456.78",
    weeklyRevenue: "$2,345.67",
    payoutsPending: "$1,875.42",
    avgTransactionValue: "$22.50"
  };

  return (
    <DashboardLayout userType="admin">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Payment Reports</h1>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Reports
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold">{stats.totalRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly Revenue</p>
                  <p className="text-2xl font-bold">{stats.weeklyRevenue}</p>
                </div>
                <BarChart className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Payouts Pending</p>
                  <p className="text-2xl font-bold">{stats.payoutsPending}</p>
                </div>
                <CreditCard className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Transaction</p>
                  <p className="text-2xl font-bold">{stats.avgTransactionValue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>View all payment transactions on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Transactions</TabsTrigger>
                <TabsTrigger value="payments">Ride Payments</TabsTrigger>
                <TabsTrigger value="payouts">Driver Payouts</TabsTrigger>
                <TabsTrigger value="refunds">Refunds</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                <div className="flex mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex ml-2 space-x-2">
                    <Button variant="outline">Filter</Button>
                    <Button variant="outline">Export</Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Transaction ID</TableHead>
                        <TableHead>User</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Payment Method</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">{transaction.id}</TableCell>
                            <TableCell>{transaction.user}</TableCell>
                            <TableCell>{transaction.type}</TableCell>
                            <TableCell>{transaction.amount}</TableCell>
                            <TableCell>{transaction.method}</TableCell>
                            <TableCell>{transaction.date}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                transaction.status === "Completed" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300" 
                                  : transaction.status === "Processing"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"
                                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300"
                              }`}>
                                {transaction.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-6">
                            No transactions found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="payments">
                <div className="p-8 text-center text-muted-foreground">
                  This tab would show only ride payment transactions
                </div>
              </TabsContent>
              
              <TabsContent value="payouts">
                <div className="p-8 text-center text-muted-foreground">
                  This tab would show only driver payout transactions
                </div>
              </TabsContent>
              
              <TabsContent value="refunds">
                <div className="p-8 text-center text-muted-foreground">
                  This tab would show only refund transactions
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default PaymentsPage;