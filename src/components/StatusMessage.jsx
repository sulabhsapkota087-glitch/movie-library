export default function StatusMessage({ type, title, children }) {
  return (
    <div className={`status status-${type}`} role={type === 'error' ? 'alert' : 'status'}>
      {type === 'loading' && <span className="spinner" aria-hidden="true" />}
      <p className="status-title">{title}</p>
      {children && <p className="status-text">{children}</p>}
    </div>
  )
}
