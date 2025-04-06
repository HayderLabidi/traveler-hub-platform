
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { History, Star, Mail } from "lucide-react";

const Statistics = ({ rating, totalRides, memberSince }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center">
          <History className="h-5 w-5 mr-2" />
          <CardTitle>Your Statistics</CardTitle>
        </div>
        <CardDescription>Your ride history and ratings</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-2" />
              <span className="text-sm text-muted-foreground">Rating</span>
            </div>
            <div className="text-2xl font-bold">{rating}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <History className="h-4 w-4 mr-2" />
              <span className="text-sm text-muted-foreground">Total Rides</span>
            </div>
            <div className="text-2xl font-bold">{totalRides}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-2" />
              <span className="text-sm text-muted-foreground">Member Since</span>
            </div>
            <div className="text-2xl font-bold">{memberSince}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Statistics;
