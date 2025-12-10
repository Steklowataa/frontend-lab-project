import type { SignedUpTraining } from "../../lib/types/training";
import { BiSolidTrashAlt } from "react-icons/bi";


interface SidePanelProps {
  signedUpTrainings: SignedUpTraining[];
  onUnsubscribe: (docId: string) => void;
}

export default function SidePanel({ signedUpTrainings, onUnsubscribe }: SidePanelProps) {
  return (
    <div style={{
      marginTop: "50px",
      width: '400px',
      minHeight: '600px',
      borderRadius: '16px',
      background: 'rgba(235, 240, 230, 0.2)',
      backdropFilter: "blur(10px)",
      WebkitBackdropFilter: "blur(10px)",
      padding: '20px',
      color: 'white',
      alignSelf: 'flex-start',
    }}>
      <h2 style={{ fontSize: '24px', fontFamily: 'var(--font-manropeSemiBold)', marginBottom: '20px', textAlign: 'center' }}>
        Zapisane zajęcia
      </h2>
      {signedUpTrainings.length === 0 ? (
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-manrope)' }}>Brak zapisanych zajęć.</p>
      ) : (
        <div className="flex flex-col gap-y-[16px] w-full">
          {signedUpTrainings.map(training => (
            <div key={training.docId || training.signUpId} className="[font-family:var(--font-manropeSemiBold)]" style={{ display: 'flex', alignItems: 'center', background: 'rgba(235, 240, 230, 0.2)', backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" ,borderRadius: '36px', height: '65px', width: "380px", paddingLeft: "10px", paddingRight: "10px"}}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '50px', marginRight: '10px' }}>
                <div style={{color: '#fff', fontWeight: 'bold', fontSize: '16px'}}>
                  {training.hour}:00
                </div>
                <div style={{color: '#80FF00', fontSize: '10px'}}>
                  55 min
                </div>
              </div>

              <div style={{ flex: 1, display: 'flex', alignItems: 'center'}}>
                <div style={{ flex: 1 }}>
                  <div style={{color: '#fff', fontSize: '10px', marginBottom: '2px' }}> {training.categorie} </div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px'}}>
                      {training.name}
                  </div>
                </div>
                <div style={{
                  color: '#fff',
                  fontSize: '12px',
                  width: '120px',
                  textAlign: 'center'
                }}>
                  {training.instructure}
                </div>
                <button 
                    onClick={() => training.docId && onUnsubscribe(training.docId)}
                    disabled={!training.docId}
                    style={{
                        width: '35px',
                        height: '35px',
                        borderRadius: '50%',
                        background: '#80FF00',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                 <BiSolidTrashAlt width={60} height={60}/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
