import { Spinner } from "@/components/ui/spinner";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-4">
        <Spinner size="lg" className="text-brand-500" />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}; 