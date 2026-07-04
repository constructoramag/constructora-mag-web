import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary atrapó un error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
          <div className="max-w-md text-center">
            <h2 className="text-3xl font-bold mb-4 text-[var(--primary)]">Algo salió mal</h2>
            <p className="text-gray-400 mb-8">
              Ha ocurrido un error inesperado al cargar esta sección. Estamos trabajando para solucionarlo.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-[var(--primary)] text-black px-6 py-2 rounded-lg font-bold"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
