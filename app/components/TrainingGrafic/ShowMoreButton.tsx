import { AiOutlineCaretDown } from "react-icons/ai";

export default function ShowMoreButton({ onClick }: { onClick: () => void }){
  return (
    <div style={{ textAlign: 'center', marginTop: '24px' }}>
      <button onClick={onClick} style={{
        color: '#80FF00',
        fontWeight: '600',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '5px'
      }}>
        Pokaż więcej
        <AiOutlineCaretDown width={50} height={50} color={"#80FF10"}/>
      </button>
    </div>
  );
}
