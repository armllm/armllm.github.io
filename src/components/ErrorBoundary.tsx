import { Component, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: unknown) {
    console.error('Render error caught by ErrorBoundary:', error)
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
            <p className="text-white/70 mb-6">
              The page failed to load. This can happen after an update — please reload.
            </p>
            <button
              onClick={this.handleReload}
              className="px-6 py-2.5 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg shadow-lg shadow-accent/30 hover:shadow-accent/50 transition-all"
            >
              Reload
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
