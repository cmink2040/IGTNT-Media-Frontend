import {useState, useEffect} from 'react';
import * as Icons from './Icons.jsx';
import {Link} from 'react-router-dom';

const TipCard = (props) => {
    /*  */
    return(
        <div className='bg-gray-300 rounded-lg mx-3 p-2 hover:bg-gray-400'>
            {/* Title */}
            <div className='font-bold flex justify-center py-1'>
                {props.title}
            </div>
            {/* Render <HTML> file here */}
            <div className=''>
                {props.content}
            </div>
        </div>
    );
}
const BlogCard = () => {

}
const PostsCard = () => {}

const CardLoader = () => {
    //Search Engine Filter: Submit with Backend Request
    //User Preferences: Submit with Backend Request
    //Query Amount: Max # of cards to pull from DB
    //Size and Screen: 
}
const SearchBar = () => {
    const [SearchQuery, Update] = useState('');
    const [NumOfResults, RAResults] = useState(0);
    const [Results, SearchFound] = useState([]);
    const [ShowSearch, ToggleA] = useState('false');
    const [ShowFilter, ToggleB] = useState('false');

    useEffect (()=> {
        console.log(SearchQuery)
        /* Make Request to Backend to Search for specific Items */
        console.log(ShowSearch);
        SearchFound([...Results, ['bullurl','bull url name']])
        RAResults(SearchQuery.length);
        console.log(NumOfResults);
    }, [SearchQuery,ShowSearch]);

    return(
        <div className='text-center w-full px-10 z-40' onClick={()=>{ToggleA('false')}}>
            <div className='flex relative justify-center w-full ' >
                    <input className='bg-gray-200 flex justify-center border
                    hover:border-3 hover:border-blue-500 shadow-2xl w-full rounded-full
                    text-center py-2' 
                    placeholder='Search to your favorite posts'
                    onClick = {() => { console.log('toggled')}}
                    onChange={(e) => {Update(e.target.value); ToggleA('true'); console.log("Changed")}}       
                    />
                        <img src={Icons.search} 
                        className='
                        absolute  right-0  items-center object-cover transition duration-500
                        hover:border-gray-400 border hover:bg-gray-300
                        hover:border-3 rounded-full h-10 p-2 w-10'/>
                        
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" 
                        fill="currentColor" onClick={()=>{ToggleA('false');ToggleB('true')}}
                        className="absolute flex item-center object-cover left-0
                        h-10 w-10 py-2 hover:border-gray-400 border hover:bg-gray-300
                        hover:border-3 rounded-full transition duration-500">
                        <path d="M18.75 12.75h1.5a.75.75 0 000-1.5h-1.5a.75.75 
                        0 000 1.5zM12 6a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 6zM12 18a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 0112 18zM3.75 6.75h1.5a.75.75 0 100-1.5h-1.5a.75.75 0 000 1.5zM5.25 18.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 010 1.5zM3 12a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5A.75.75 0 013 12zM9 3.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5zM12.75 12a2.25 2.25 0 114.5 0 2.25 2.25 0 01-4.5 0zM9 15.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                        </svg>

            </div>
            {/* Dropdown with SearchEngine Filters */
                (NumOfResults>0 && ShowSearch==='true') && (
                <ul className='w-2/3 bg-gray-200 p-3 border hover:border-3 mx-auto
                hover:border-blue-300 rounded-lg flex flex-col items-center'> 
                    {
                        Results.map((item) => (
                            <Link to={item[0]} key={item.id} className='w-full py-1'>
                            <li className='hover:bg-gray-500 rounded-lg 
                            p-1 hover:text-sky-300 transiton duration-500'>
                                {item[1]}</li>
                            </Link>
                        ))
                    }

                </ul>)

                    
            }
            {(ShowFilter==='true')
                     && (
                    <div className='relative bg-gray-100 hover:bg-blue-100 px-4 py-7 mt-1 rounded-lg flex 
                     flex-col justify-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                         fill="currentColor" 
                         className="w-6 h-6 absolute right-0 top-0 mr-1 mt-1
                         hover:fill-red-700 transition duration-300"
                         onClick={()=>{ToggleB('false')}}
                         >
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clip-rule="evenodd" />
                        </svg>
                      
                    </div>
                )}
            <div className=''> Data</div>
            
        </div>
    );
}


const TextEditor = () => {

}
export {TipCard, BlogCard,PostsCard, CardLoader, TextEditor,SearchBar};