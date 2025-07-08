import {Link} from 'react-router-dom'

export function BottomWarning({label,buttonText,to}){
    return <div className="text-sm flex justify-center">
        <div>
            {label}
        </div>
        <Link className='pointer underline cursor-pointer px-1 py-0.5' to={to}>{buttonText}</Link>
    </div>
}