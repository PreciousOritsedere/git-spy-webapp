function ErrorFallback({ error }) {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre className="errorMessage">{error.message}</pre>
      </div>
    )
  }
  
  export default ErrorFallback;