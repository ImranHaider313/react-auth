import { useNavigate } from 'react-router-dom';
import Button from '@/components/Button';

const Navigation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('hasToken');
    navigate('/auth/sign-in');
  };

  return (
    <nav className='flex items-center justify-between flex-wrap bg-grey-500 p-6'>
      <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
        <div className='text-sm lg:flex-grow'></div>
        <div>
          <Button text='Logout' onClick={handleLogout} />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
