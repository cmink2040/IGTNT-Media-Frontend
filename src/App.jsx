import reactLogo from './assets/react.svg'
import IgtntLogo from './assets/IgtntLogo.svg'
import './App.css'
import {TForms,Field} from './FormComp.jsx'
import {TipCard,SearchBar} from './PostCard.jsx'
import {PopupIcon} from './Note.jsx'


import * as Icons from './Icons.jsx';
import {BrowserRouter, Routes, Route, Outlet, Link, 
  useParams, useNavigate} from 'react-router-dom';
import {useState, useEffect, useRef} from 'react';

import Cookies from 'js-cookie';
import axios from 'axios';

import { Editor } from '@tinymce/tinymce-react';
/* 
FOR DEPLOYMENT: FOR TINYMCE
Copy the contents of the tinymce-react-demo/build directory
to the root directory of the web server.
*/

const BACK_URL = import.meta.env.VITE_API_BACKURL;
const FRONT_URL = import.meta.env.VITE_API_URL;
const TINY_KEY = import.meta.env.VITE_API_TINY;
export default App;
function App() {
  let location = window.location.host;
  let subdomain = location.split('.')[0];
  if (subdomain === 'www') {
    subdomain = location.split('.')[1];
  }
  console.log(subdomain);

  const[loggedInUser, setLoggedIn] = useState('');
  const[toggle, changeTog] = useState('off');
  const[loglogoff, changeLog] = useState('off');
  useEffect(() => {
    const handleSaveUsername = () => {
      Cookies.set('username', loggedInUser,  { path: '/', expires:7 }); // Save cookie for 7 days
    };
    const storedUser = Cookies.get('username','');
    console.log("updated for: "+loggedInUser);
    if(loggedInUser==='') {
      if(storedUser!=='' && storedUser!==undefined) {setLoggedIn(storedUser);}}
    if(toggle==='on') {handleSaveUsername(); changeTog('off');}
    if(loglogoff==='on') {
      if(loggedInUser!=='') {setLoggedIn('');}
       changeLog('off');}
  },[toggle,loglogoff,loggedInUser,setLoggedIn, changeLog, changeTog])

  const handleUsernameChange = (user, toggle) => {
    console.log(user+" logged in with: "+toggle);
    setLoggedIn(user);
    if(toggle==='on') changeTog('on');
  };
  const handleClearUsername = () => {
    changeLog('on');
  };
  return(
    <BrowserRouter>
      <Routes>
        { /* Home page routes www.igtneurotechnology.com
         subdomain === FRONT_URL && 
         (
          <Route path='/' element={<NavNav logUser={loggedInUser}/>} >
          <Route index element={<ReactDefault/>} />
          <Route path='home' element={<Home/>} />
          <Route path='about'element={<Updates />}/>
          </Route>         
         )
        */}

        { /*Skygate route www.skygate.igtneurotechnology.com*/
        // subdomain === 'skygate' && (
          <Route path='/' element={<div><NavNav logUser={loggedInUser}/>
             <SApp/>
 </div>}>            
            <Route index element={<UserHome/>} />       
            <Route path='explore' element={<UserSearch/>} />
            <Route path='createpost' element={<MakeNewPost/>} />
            <Route path='aboutuser' element={<UserAbout/>} />
            <Route path='login' element={<LoginA callMethod={handleUsernameChange} />} />
            <Route path='logout' element={<LogOut logOut={handleClearUsername}/>}  />
            <Route path='create' element={<Create/>} />
            <Route path='contacts' element={<ContactS/>} />
            <Route path='setting' element={<SettingP/>} />
            <Route path='profile/:userName' element={<UserPg/>} />
          </Route>
        // )
        }

        { /*cmink route www.cmink.igtneurotechnology.com */

        }      
      </Routes>
    </BrowserRouter>
  );
}




const NavNav = (props) => {
const LoggedInInter = () => {
  const [profileURL, setURL] = useState('');
  useEffect(() => {
    const fetchURL = async () => {
      const response = await axios.get(BACK_URL+'User/'+props.logUser+"/");
      setURL(response.data[0].profileImage);
    }
    fetchURL();
  },[profileURL]);
  return(
    <div className='container justify-end items-center space-x-3'>
    <Col> 
      <Dropdown>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <img src={profileURL} className="img-fluid" alt="logicon" />
        </Dropdown.Toggle>
        <Dropdown.Menu>
              <Dropdown.Item as={Link} to={'skygate/profile/'+props.logUser}>
              <div className="d-flex align-items-center">
              <Col sm={3} className="d-flex justify-content-center">
                <img src={Icons.person} className="img-fluid" alt="logicon" />
              </Col>
              <Col sm={1}></Col>
              <Col sm={8} >
                Profile
              </Col>
            </div>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="skygate/create">
              <div className="d-flex align-items-center">
              <Col sm={3} className="d-flex justify-content-center">
                <img src={Icons.settings} className="img-fluid" alt="logicon" />
              </Col>
              <Col sm={1}></Col>
              <Col sm={8} >
                Settings
              </Col>
            </div>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="skygate/contact">
              <div className="d-flex align-items-center">
              <Col sm={3} className="d-flex justify-content-center">
                <img src={Icons.contactsupport} className="img-fluid" alt="logicon" />
              </Col>
              <Col sm={1}></Col>
              <Col sm={8} >
                Contact
              </Col>
            </div>
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="skygate/logout">
              <div className="d-flex align-items-center">
              <Col sm={3} className="d-flex justify-content-center">
                <img src={Icons.logout} className="img-fluid" alt="logicon" />
              </Col>
              <Col sm={1}></Col>
              <Col sm={8} >
                Logout
              </Col>
            </div>
              </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      </Col>
    </div>
      );
}
const LoggedOutInter = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    console.log("Toggled");
    setShowDropdown(!showDropdown);
  }
  const NewLink = (props) => {
    return(
      <Link to={props.location}
             className=
             { `${props.className} 
             transition duration-500 flex justify-center items-center py-3 px-4
             hover:bg-blue-700 rounded hover:text-sky-300 font-semibold pointer-events-auto` }>   
            {props.picture==='true' && (
              <img src={props.source} className="img-fluid" alt="logicon" /> 
            )}
                          
               {props.captionl}    
      </Link>
    );
  };
  return (
    <div className=' flex  '>
      <div className='flex items-center space-x-3'>
       <button 
       className='transition duration-400 hover:bg-gray-700 hover:text-blue-400
       rounded-full px-4 py-2 font-semibold'
        onClick={
          ()=> { 
          window.location.href = `http://www.skygate.${FRONT_URL}/create`;
           }}
        > Join now 
        </button>

       <button 
       className=' transition duration-400
       hover:bg-blue-400 rounded-full px-4 py-2 border border-blue-500
        font-semibold text-blue-500 hover:text-white'
        onClick={()=>{
          window.location.href = `http://www.skygate.${FRONT_URL}/login`;
        }}
        > 
        Sign in
        </button>
        <img src={Icons.menu} alt="My image" 
        className="transition duration-400 img-fluid hover:bg-gray-400 rounded py-2" 
        onClick={toggleDropdown}/>
     </div>
        
   { (showDropdown)===true && ( 
    
   <div className="fixed right-0 text-gray-700 bg-sky-300 w-60
                   h-screen  rounded-lg z-50" 
    onClick={toggleDropdown}>
            <NewLink location='/login' picture='true' source={Icons.downloadLogo} 
            captionl='Login'/>
          
            <NewLink location='/create' picture='true' source={Icons.add} captionl='Sign Up'/>
          
            <NewLink location='/contact' picture='true' source={Icons.contactsupport} 
            captionl='Contact'/>
         
            <NewLink location='/terms' captionl='Terms of Service'/>
         
            <NewLink location='/privacy' captionl='Privacy Policy'/>

           <NewLink location='/about' captionl='About'/>
          
            <NewLink location='/legal' captionl='Legal'/>              
    </div>
    )
}
    </div>
  );

  }

return(
  <div>
    <div className="sticky top-0  relative w-full bg-blue-400 py-1 rounded-lg">
        <div className='flex left-0 top-0 flex text-center items-center'>
          <Link to='/'>
          <img src={IgtntLogo} alt='logo' className=' w-10 h-10  ml-3 '/>
          </Link>
            <div className=' transition ease-in	duration-100 hover:scale-125 
              hover:text-blue-500 font-mono ml-2 text-center '> 
              IGTNT 
            </div>

            <div className='flex justify-end w-full pr-2'>
          {(props.logUser!=='') ? 
          <LoggedInInter us={props.logUser} 
          /> 
          :
          <LoggedOutInter />
          }         
        </div>
        </div>

        
    </div>
   

  <Outlet />
  </div>
);
}

//: /
const Home = () => {
return(
<h1>PATH</h1>
);
}

//: /home:main blot
const Updates = () => {}

//: /app
const SApp = () => {
return(
<nav className="fixed flex flex-row mx-auto justify-around bottom-0 w-full bg-blue-400 pt-3 
rounded-lg">
      <div>
        <Link to="/" className=''>
                <img src={Icons.home} className="img-fluid" alt="logicon" />            
          </Link>
      </div>
      
      <div>
        <Link to="/explore/">
        <img src={Icons.search} className="img-fluid" alt="logicon" /> 
        </Link>
      </div>
      <div>
        <Link to="/createpost/">
        <img src={Icons.addbox} className="img-fluid" alt="logicon" /> 
        </Link>
      </div>
      <div>
        <Link to="/contacts/">
        <img src={Icons.contacts} className="img-fluid" alt="logicon" />            
        </Link>
      </div>
      <div>
        <Link to="/setting/">
        <img src={Icons.settings} className="img-fluid" alt="logicon" /> 
        </Link>
      </div>
    </nav>

);
}

//: /app/post/

const UserPg = () => {
let { userName } = useParams();
const [exists, setExists] = useState(false);
const [username, setUsername] = useState('');
const [followers, setFollower] = useState(0);
const [following, setFollowing] = useState(0);

const getStuff = async () => {
  try {
    const response = await axios.get(`${BACK_URL}/User/${userName}/`);
    setUsername(response.data[0].userN);
    setFollower(response.data[0].FollowersCount);
    setFollowing(response.data[0].FollowingCount);
    setExists(true);
  } catch (error) {
    console.error(error);
  }
}

useEffect(() => {
  getStuff();
});

return (
  exists ?
  <Col>
   <h1> Hello {username}!</h1>
   <h3> You have: {following} followers</h3>
   <h3 className='mb-3'> You have: {followers} followers</h3>
  </Col>
   
   : null
);
}

//: /app/home/
const UserHome = () => {
  return(
    <div className='m-4'>
      fqwefwef
      <TipCard/>
    </div>
  );
}

//: /app/search/
const UserSearch = () => {
  return(
    <div>
      <SearchBar/>
    </div>
  );

}

//: /app/makenewpost/
const MakeNewPost = () => {
const editorRef = useRef(null);
const log = () => {
  if (editorRef.current) {
    console.log(editorRef.current.getContent());
  }
};
return (

  <div className="container text-center" >
  <h1  className="mb-2 text-center"> Create your next post!</h1>
  <form onSubmit={log}>
    <div className='form-group'>
      <h4 className='text-center'>Title/Name (This won't show up in the post, unless you type it)</h4>
      <input type="text" placeholder="Username input" name="username" className='text-center mb-2'/>
    </div>

   
    <h3>Your Post</h3>
    <Editor 
  apiKey={TINY_KEY}
  onInit={(evt, editor) => editorRef.current = editor}
  initialValue="<p>Enter your post!</p>"
  init={{
    height: 500,
    menubar: false,
    plugins: [
      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
    ],
    toolbar: 'undo redo | blocks | ' +
      'bold italic forecolor | alignleft aligncenter ' +
      'alignright alignjustify | bullist numlist outdent indent | ' +
      'removeformat | help',
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
  }}/>
     <div className="form-group">
  <label htmlFor="exampleForm.SelectCustom" className="block font-medium text-gray-700">
    Select Type of Post
  </label>
  <select id="exampleForm.SelectCustom" className="text-center form-select mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" name="type">
    <option value="" disabled selected hidden>Specify Here</option>
    <option value="tips">Tips</option>
    <option value="blog">Blog</option>
    <option value="important">Announcment/Important</option>
    <option value="other">Other(Recommended to specify in post)</option>
  </select>
</div>
     
     <div className='form-group my-2 mb-3 '>
      <input type="text" placeholder="Tags or Keywords" name="password" className="text-center"/>
    </div>
    <button className="mb-5 my-2" variant="primary" type="submit" onClick={log}>
      Post!
    </button>
  </form>
  
</div>
);
}

//: /app/login/
const LoginA = (props) => {
const navigate = useNavigate();
const [name, setName] = useState();
const [passw, setPass] = useState();
const [toggle, setToggle] = useState(false);

 const handleSubmit = async (event) =>  {
  event.preventDefault();
  console.log(name+" "+passw+" "+toggle);
  const results = await axios.get(BACK_URL + "User/" + name + "/");
  if(passw === results.data[0].password) {
    navigate('/skygate/profile/'+name+'/');
    props.callMethod(name, toggle);
  }
  else {
    console.log("FAILED!");
    /*Display Error */
  }
}
return(
  <div className='w-full h-screen bg-gray-400 pt-24'>  
  <TForms 
    username={true}
    setName={setName}
    password={true}
    setPass={setPass}
    staylogged={true}
    page='login'
    submitFunction={handleSubmit}
  />
  <PopupIcon/>
  </div>
  );

}

const LogOut = (props) => {
const navigate = useNavigate();
navigate('/skygate/home/');
Cookies.remove('username'); 
console.log('your mf cookie was killed');
props.logOut();
}

const Create = () => {
  const [name, setName] = useState();
  const [passw, setPass] = useState();
  const [email, setEmail] = useState();
  const [showEmail, toggle] = useState(false);
 const navigate = useNavigate();
 /* Username and Password Verification */
 const handleSubmit = async (event) =>  {
  event.preventDefault(); 

  const results = await axios.get(BACK_URL + "User/" + name + "/");
  console.log(results.data[0]);
  console.log(results.data);
  console.log(results.data.length);
  //TESTING PURPOSES:
  
  if(results.data.length === 0) {
    toggle(true);
  }
  else {
    console.log("FAILED!");
    /*Display Error */
  }
}
  const handleSubmitStep2 = (event) => {
    event.preventDefault();
    /* Render Email Vertification */
    /* validate pass & email */
    if(passw.length()<6) {
      console.log("FAILED");
      /*Display Error*/
      return null;
    }
    const Obji = {
      name: name,
      password: passw,
      email: email
    }
    axios.post(BACK_URL + "User/" + name + "/", Obji);
    console.log("Person made");
    /* login */
    navigate('/home');
  };


  function submitTest(event) {
    event.preventDefault(); 
    toggle(true);
  }
return(
  <div className='w-full h-screen bg-gray-400 pt-24'>  
   <TForms 
    username={true}
    setName={(e)=>setName(e)}
    password={true}
    setPass={(e)=>setPass(e)}
    email={true}
    setEmail={(e)=>setEmail(e)}
    staylogged={true}
    submitFunction={
     // handleSubmit
     submitTest
    }
    tos={true}
  />
  { showEmail && (
  <div className='fixed inset-0 flex justify-center items-center'>
    <TForms 
    submitFunction={
      handleSubmitStep2
    }
      email={true}
      setEmail={(e)=>setEmail(e)}
      label='Verify your Email'
      type='email'
      place="6 Digit Code"
      value={email}
       name='email'

    />
    
  </div>
  )
  }

  </div>
  );
}

//: /app/about/
const UserAbout = () => {}
const ContactS = () => {}
const SettingP = () => {

}
