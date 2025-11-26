"use client"
export default function InputField({placeholder, label, name, type, id, required, defaultValue, readOnly}: {placeholder: string, label: string, name: string, type: string, id: string, required?: boolean, defaultValue?: string, readOnly?: boolean}) {
    return (
        <>
            <label 
                htmlFor={id} 
                className="block mb-1 text-sm text-left w-full [font-family:var(--font-manrope)] mb-[10px]" 
                style={{color: "#D9D9D9"}}
            >
                {label}
            </label>
            <input 
                id={id}
                name={name}
                type={type} 
                placeholder={placeholder}
                required={required}
                defaultValue={defaultValue}
                readOnly={readOnly}
                className={`block w-full px-3 py-2 rounded-[16px] h-[48px] text-black border-none focus:outline-none [font-family:var(--font-manrope)] pl-[10px] ${readOnly ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'}`}
            />
        </>
    )
}
