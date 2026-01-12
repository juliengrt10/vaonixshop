import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface ErrorFallbackProps {
    error: Error;
    resetErrorBoundary: () => void;
}

export function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4 text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Une erreur est survenue</h1>
            <p className="text-muted-foreground max-w-[500px] mb-8">
                Nous sommes désolés, mais quelque chose s'est mal passé. {error.message ? `(${error.message})` : ''}
            </p>
            <div className="flex gap-4">
                <Button onClick={() => window.location.reload()} variant="outline">
                    Recharger la page
                </Button>
                <Button onClick={resetErrorBoundary}>
                    Réessayer
                </Button>
            </div>
        </div>
    );
}
