"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

/**
 * Catches render-time errors in the component tree and displays
 * a recovery UI instead of a white screen.
 */
export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-surface flex items-center justify-center p-8">
          <div className="max-w-md w-full text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-2xl bg-error-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-error text-[40px]">
                error
              </span>
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">
              Something went wrong
            </h1>
            <p className="text-on-surface-variant font-body-md text-body-md leading-relaxed">
              The application encountered an unexpected error. This has been
              logged. You can try reloading.
            </p>
            {this.state.error && (
              <pre className="text-left text-[12px] font-mono bg-surface-container-lowest rounded-xl p-4 text-error overflow-x-auto max-h-32 border border-error/10">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleRetry}
                className="px-6 py-2.5 rounded-xl bg-primary text-on-primary font-title-md text-title-md hover:shadow-lg transition-all active:scale-95"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 rounded-xl bg-surface-container-high text-on-surface font-title-md text-title-md hover:bg-surface-bright transition-all active:scale-95"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
