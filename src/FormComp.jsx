import {Link} from 'react-router-dom';
import {useState} from 'react';

const TForms = (props) => {
  // props = [[], [], [], [], []]
    // submitFunction() - pass function to control submit button
    // user - pass if form needs a username, must pass setName
    // pass - pass if form needs a password, must pass setPass(pass, setPass)

    // email - email if form needs a email(setEamil, email)

    // toggle - checkmark depending on need setToggle

    // Link buttons, pass description and route

    return (
        <div>
            <form onSubmit={props.submitFunction} 
  className='transition duration-300 mx-20 border bg-gray-200
  rounded-lg border-2 hover:border-blue-400 border-gray-300 hover:bg-gray-100'
  >
    {/* Puts a username if username is specified */}
    <Field
    label='Signin ID*'
    place='User1032'
    value={props.username}
    setMethod={props.setPass}
    name='username'
    onChange={props.setName}
    />
    
<Field
    label='Email*'
    type='email'
    place="User1032@gmail.com"
    value={props.email}
    onChange={props.setEmail}
    name='email'
    />   

<Field
    label='Password ID*'
    place="************"
    type='password'
    value={props.password}
    onChange={props.setPass}
    name='password'
    />   


    { /* Creates a txt box to stay logged in */}
    <CheckBox
      value={props.tos}
      note = 'I agree with the Terms of Service and Privacy Policy*'
    
    />
    <CheckBox
      value={props.staylogged}
      note = 'Keep me signed in for 7 days'
    />
          {/*onChange={e => props.setToggle(e.target.value)}*/ }

   

    
    <div>

    <button className='flex transition duration-500  form-control 
                       border-blue-500 text-blue-500 font-bold border
                       rounded-lg py-2 px-5 hover:bg-blue-700 hover:text-white ml-12 my-5'
     type="submit">
      Submit
    </button>
    </div>

    <HLinks page = {props.page}/>

    

  </form>




        </div>


    ); 

}

const CheckBox = (props) => {
    const [toggled, setToggled] = useState(false);
  
    const handleClick = () => {
      setToggled(!toggled);
      if (props.onChange) {
        props.onChange();
      }
    };
  
    if(props.value===true)
    return (
      <div className="flex items-center cursor-pointer hover:text-blue-600 my-4" onClick={handleClick}>
        <div className={
            `w-3 h-3 border 
            ${toggled ? "bg-gray-500" : " bg-white border-gray-400"} 
             rounded ml-12 mr-2 hover:bg-blue-500 transition duration-300`}>
         </div>
        <div> {props.note} </div>
        
      </div>
    );
  };

const Field = (props) => {
    //props.value, props.setMethod, props.label, props.type, props.place, props.name
    if(props.value===true)
    return (

        <div>
        <div className='text-lg font-semibold mt-5 mx-12'>
        {props.label}
        </div>
        <input type={props.type} placeholder={props.place} name={props.name}
        onChange={e => props.setMethod(e.target.value)}
        className='border-3 border border-gray-400 mx-12 mt-2 px-2 py-1 bg-gray-300 rounded-lg hover:bg-gray-100'
         />
        </div>
    );
}

const HLinks = (props) => {
  //url x2
  //names x2
  if(props.page==='login') {
    return(
      <div className='flex flex-row my-5'>
    <Link className='transition mx-12 hover:text-blue-500 duration-300 hover:underline'
      to='/create'
    >
    No account?
   </Link>

   <Link className='transition mx-12 hover:text-blue-500 duration-300 hover:underline'
      to='/forgot'
    >
   Forgot password?
   </Link>
   </div>
    );
   
  }
   return(
      <div className='flex flex-row my-5'>
      <Link className='transition mx-12 hover:text-blue-500 duration-300 hover:underline'
to='/login'
>
Already have one?
</Link>

<Link className='transition mx-12 hover:text-blue-500 duration-300 hover:underline'
to='/contact'> Contact Us
</Link>
     </div>
    );
}

export  {CheckBox, TForms, Field};


