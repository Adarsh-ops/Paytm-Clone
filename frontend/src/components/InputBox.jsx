

export function InputBox({title,placeholder,onChange}){
    return <div className="py-0.5">
        <div className="text-sm font-bold p-1">{title}</div>
        <div className="rounded-md">
            <input onChange={onChange} type="text" name={title} id={title} placeholder={placeholder} className="w-full border-2 rounded-lg p-1"/>
        </div>
    </div>
}