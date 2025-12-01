const TrainigElement = ({hour, training}) => {
    return (
        <>  
            <div className="grid grid-cols-[auto_1fr] items-center bg-black/30 rounded p-2 min-h-[60px] gap-4">
                <div className="font-bold p-2 text-right [font-family:var(--font-manrope)]">{`${hour}:00`}</div>
                    <div className="text-xs text-center bg-lime-800/70 p-2 rounded-md w-full">
                        <div className="font-bold text-sm">{training.name}</div>
                        <div className="text-gray-300">{training.instructure}</div>
                    </div>
            </div>
        </>
    )
}

export default TrainigElement;