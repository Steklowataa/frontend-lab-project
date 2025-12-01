import ButtonGradient from "../ButtonGradient";
import SearchInput from "./SearchInput";

interface SearchSectionProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEndDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
}

export default function SearchSection({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSearch
}: SearchSectionProps) {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '16px', 
      marginBottom: '32px', 
      justifyContent: 'center' 
    }}>
      <SearchInput 
        id="startDate" 
        label="Od:" 
        value={startDate} 
        onChange={onStartDateChange} 
      /> 

      <SearchInput 
        id="endDate" 
        label="Do:" 
        value={endDate} 
        onChange={onEndDateChange} 
      />

      <ButtonGradient nameButton="Pokaż" onClick={onSearch} />
    </div>
  );
}
