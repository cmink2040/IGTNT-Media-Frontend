import {useState,useEffect} from 'react';

const PopupIcon = () => {
    const [showInfo, setInfo] = useState('hidden');
    useEffect(()=>{
        console.log(showInfo);
    })
    return (
        <div className='flex items-center m-14 relative h-4'>
            <div
                className="
                cursor-pointer
                text-center rounded-full bg-white pt-1
                text-black hover:bg-gray-500 h-8 w-8
                transition duration-300 "
                onMouseEnter={() => {
                    setInfo('')}}
                onMouseLeave={() => setInfo('hidden')}
            >
                ?
            </div>
        <div 
            className = {`absolute  ml-10
            bg-white border border-gray-200 p-4
            rounded-lg shadow-md pointer-events-none ${showInfo}`} 
            >
          <p>This is the information box!</p>
        </div>
        </div>
    );
};

export {PopupIcon};

