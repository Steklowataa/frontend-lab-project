interface ErrorMessageProps {
  message: string;
}

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div style={{
      color: '#ef4444',
      marginBottom: '16px',
      padding: '12px',
      background: 'rgba(239, 68, 68, 0.1)',
      borderRadius: '8px'
    }}>
      {message}
    </div>
  );
}