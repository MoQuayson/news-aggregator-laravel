// src/components/ErrorBoundary.tsx
import React from "react";
import { Button } from "./ui/button";

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="container flex h-screen flex-col items-center justify-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">{this.state.error?.message || "An unexpected error occurred"}</p>
          <Button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
          >
            Try again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
