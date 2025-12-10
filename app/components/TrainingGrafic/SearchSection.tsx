import type { Dispatch, SetStateAction } from "react";
import ButtonGradient from "../ButtonGradient";
import SearchInput from "./SearchInput";

interface SearchSectionProps {
  startDate: string;
  endDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  setEndDate: Dispatch<SetStateAction<string>>;
  onSearch: () => void;
}

export default function SearchSection({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
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
        date={startDate} 
        setDate={setStartDate} 
      /> 

      <SearchInput 
        id="endDate" 
        label="Do:" 
        date={endDate} 
        setDate={setEndDate} 
      />

      <ButtonGradient nameButton="Pokaż" onClick={onSearch} />
    </div>
  );
}
