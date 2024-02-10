/* Header of application with logo , task and user */
import { LOGO_URL,PHOTO_URL } from '../utils/constants';

const Header = () => {
 
  return (
    <div className='grid grid-flow-col p-1 m-1 shadow-lg'> 
    <div className='col-span-1'>
        <img   
        className="h-16"
        alt="logo"
        src={LOGO_URL}
        />
      </div>
       
      <div className="col-span-10 py-4 px-16 font-bold">
     
          Task - Data Table and Bar Chart using Plotly, React and Tailwind          
      
      </div> 
      <div className='col-span-1'>
        <img 
        className='h-10 py-2'
        alt="user-icon"
        src={PHOTO_URL}
        />
      </div>
  </div>
  )
}

export default Header
