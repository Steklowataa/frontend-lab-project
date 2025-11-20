export default function InputField({placeholder, label}: {placeholder: string, label: string}) {
    return (
        <>
            <label style={{backgroundColor: "gray-800"}} className="block text-gray-800 dark:text-gray-200 mb-[10px] [font-family:var(--font-manrope)] text-[16px]">{ label }</label>
            <input 
                type="text" 
                className="w-[312px] h-[48px] rounded-[15px] px-[10px] [font-family:var(--font-manrope)] border-none " 
                placeholder={placeholder}/>
        </>
    )
}