export default function ShowMoreButton({ onClick }: { onClick: () => void }){
  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <button onClick={onClick} style={{
        color: '#84cc16',
        fontWeight: '600',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer'
      }}>
        Pokaż więcej
      </button>
    </div>
  );
}
