import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: '24px',
          textAlign: 'center',
          color: '#52525b',
          background: '#f4f4f5',
          borderRadius: '12px',
          margin: '16px'
        }}>
          <h3 style={{ color: '#09090b', marginBottom: '8px' }}>Something went wrong</h3>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>
            {this.state.error?.message || 'Failed to render 3D canvas.'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false })}
            style={{
              padding: '6px 14px',
              borderRadius: '6px',
              background: '#7c3aed',
              color: '#fff',
              fontSize: '13px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
