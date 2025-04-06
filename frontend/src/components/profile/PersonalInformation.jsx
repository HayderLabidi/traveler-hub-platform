
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "lucide-react";

const PersonalInformation = ({ profile, onChange }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center">
          <User className="h-5 w-5 mr-2" />
          <CardTitle>Personal Information</CardTitle>
        </div>
        <CardDescription>Update your personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={profile.name}
            onChange={(e) => onChange({...profile, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => onChange({...profile, email: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            value={profile.phone}
            onChange={(e) => onChange({...profile, phone: e.target.value})}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInformation;
