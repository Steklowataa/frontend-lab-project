import { useState } from "react"
import SearchInput from "./SearchInput"
import getDayOfWeek from "../../lib/functions/getDayOfWeek"


export default function InputField() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    return (
        <>
        <div className="flex gap-[20px]">
            <div>
                <label className="text-[20px] [font-family:var(--font-manropeSemiBold)] mr-[10px]">Od:</label>
                <SearchInput date={startDate} setDate={setStartDate}/>
            </div>

            <div>
                <label className="text-[20px] [font-family:var(--font-manropeSemiBold)] mr-[10px]">Do:</label>
                <SearchInput date={endDate} setDate={setEndDate}/>
            </div>
        </div>
        </>
    )
}