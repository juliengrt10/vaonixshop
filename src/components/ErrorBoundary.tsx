import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
          <Card className="max-w-2xl w-full">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-destructive/10 rounded-full">
                  <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>
              </div>
              <CardTitle className="text-2xl">Une erreur est survenue</CardTitle>
              <CardDescription className="text-base">
                Nous sommes désolés, une erreur inattendue s'est produite. 
                Veuillez réessayer ou retourner à l'accueil.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {this.state.error && process.env.NODE_ENV === 'development' && (
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm font-mono text-destructive break-all">
                    {this.state.error.message}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  onClick={this.handleGoHome}
                  variant="default"
                  className="flex-1"
                  size="lg"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Retour à l'accueil
                </Button>
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Recharger la page
                </Button>
              </div>

              <p className="text-sm text-muted-foreground text-center">
                Si le problème persiste, veuillez contacter notre support technique.
              </p>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
