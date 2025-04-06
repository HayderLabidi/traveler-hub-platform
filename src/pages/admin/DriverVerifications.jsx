import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, XCircle, Eye, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DriverVerifications = () => {
  const [selectedVerification, setSelectedVerification] = useState(null);
  const { toast } = useToast();

  // Mock data - replace with actual API calls
  const verifications = [
    {
      id: 1,
      driverName: "John Doe",
      status: "pending",
      submittedAt: "2024-03-20",
      documents: {
        license: "license.jpg",
        insurance: "insurance.jpg",
        registration: "registration.jpg",
        kycSelfie: "selfie.jpg"
      }
    },
    {
      id: 2,
      driverName: "Jane Smith",
      status: "verified",
      submittedAt: "2024-03-19",
      documents: {
        license: "license.jpg",
        insurance: "insurance.jpg",
        registration: "registration.jpg",
        kycSelfie: "selfie.jpg"
      }
    },
    {
      id: 3,
      driverName: "Mike Johnson",
      status: "rejected",
      submittedAt: "2024-03-18",
      documents: {
        license: "license.jpg",
        insurance: "insurance.jpg",
        registration: "registration.jpg",
        kycSelfie: "selfie.jpg"
      }
    }
  ];

  const handleStatusChange = async (id, newStatus) => {
    // Here you would typically make an API call to update the status
    toast({
      title: "Status updated",
      description: `Driver verification status has been updated to ${newStatus}.`,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <div className="flex items-center gap-1 text-yellow-500">
            <Clock className="w-4 h-4" />
            <span>Pending</span>
          </div>
        );
      case "verified":
        return (
          <div className="flex items-center gap-1 text-green-500">
            <CheckCircle2 className="w-4 h-4" />
            <span>Verified</span>
          </div>
        );
      case "rejected":
        return (
          <div className="flex items-center gap-1 text-red-500">
            <XCircle className="w-4 h-4" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">Driver Verifications</h1>
            <p className="text-muted-foreground">
              Review and manage driver verification requests
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Verification Requests</CardTitle>
              <CardDescription>List of all driver verification requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Submitted Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {verifications.map((verification) => (
                    <TableRow key={verification.id}>
                      <TableCell>{verification.driverName}</TableCell>
                      <TableCell>{getStatusBadge(verification.status)}</TableCell>
                      <TableCell>{verification.submittedAt}</TableCell>
                      <TableCell>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl">
                            <DialogHeader>
                              <DialogTitle>Verification Details</DialogTitle>
                              <DialogDescription>
                                Review driver verification documents
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label>Driver's License</Label>
                                <img
                                  src={verification.documents.license}
                                  alt="Driver's License"
                                  className="w-full h-48 object-cover rounded-md"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Insurance Document</Label>
                                <img
                                  src={verification.documents.insurance}
                                  alt="Insurance"
                                  className="w-full h-48 object-cover rounded-md"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>Vehicle Registration</Label>
                                <img
                                  src={verification.documents.registration}
                                  alt="Registration"
                                  className="w-full h-48 object-cover rounded-md"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>KYC Selfie</Label>
                                <img
                                  src={verification.documents.kycSelfie}
                                  alt="KYC Selfie"
                                  className="w-full h-48 object-cover rounded-md"
                                />
                              </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-4">
                              {verification.status === "pending" && (
                                <>
                                  <Button
                                    variant="outline"
                                    onClick={() => handleStatusChange(verification.id, "rejected")}
                                  >
                                    Reject
                                  </Button>
                                  <Button
                                    onClick={() => handleStatusChange(verification.id, "verified")}
                                  >
                                    Approve
                                  </Button>
                                </>
                              )}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DriverVerifications; 