
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import PassengerDriverChat from "./PassengerDriverChat";

const ChatDialog = ({ isOpen, onClose, driver, rideDetails, passengerID }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>Chat with {driver?.name || "Your Driver"}</DialogTitle>
          <DialogDescription>
            Communicate about your ride details and arrangements
          </DialogDescription>
        </DialogHeader>
        <PassengerDriverChat
          driverId={driver?.id || "driver-1"}
          passengerId={passengerID || "passenger-1"}
          rideId={rideDetails?.id || "ride-1"}
          driverName={driver?.name || "Your Driver"}
          driverPhoto={driver?.image || "https://randomuser.me/api/portraits/men/32.jpg"}
          closeChat={handleClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;
