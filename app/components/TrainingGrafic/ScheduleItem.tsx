import type { Training } from "../../lib/types/training";

interface ScheduleItemProps {
  hour: number;
  training?: Training;
  onSignUp?: () => void;
}

export default function ScheduleItem({ hour, training, onSignUp }: ScheduleItemProps) {
  return (
    <div className="[font-family:var(--font-manropeSemiBold)]" style={{ display: 'flex', alignItems: 'center', background: 'rgba(235, 240, 230, 0.2)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" ,borderRadius: '36px',padding: '16px',height: '60px', width: "600px"}}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
        <div style={{color: '#fff', fontWeight: 'bold', fontSize: '20px'}}>
          {hour}:00
        </div>
        <div style={{color: '#80FF00', fontSize: '12px'}}>
          55 min
        </div>
      </div>

      <div style={{ flex: 1, borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center'}}>
        {training ? (
          <>
            <div style={{ flex: 1 }}>
              <div style={{color: '#fff', fontSize: '12px',marginBottom: '4px' }}> {training.categorie} </div>
              <div style={{ color: '#fff', fontWeight: 'bold',fontSize: '20px'}}>
                {training.name}
              </div>
            </div>
            <div style={{
              color: '#fff',
              fontSize: '14px',
              width: '150px',
              textAlign: 'center'
            }}>
              {training.instructure}
            </div>
            <button onClick={onSignUp} style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: '#80FF00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}>
              <span style={{
                color: '#303030',
                fontSize: '24px',
                fontWeight: 'bold'
              }}>+</span>
            </button>
          </>
        ) : (
          <div style={{
            color: '#6b7280',
            textAlign: 'center',
            width: '100%'
          }}>
            Brak zajęć
          </div>
        )}
      </div>
    </div>
  );
}
