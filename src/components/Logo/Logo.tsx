import { dbInfoStore, tabStore } from '@/context/store';
import Link from 'next/link';


const Logo = () => {
  const { setDbInfo } = dbInfoStore();
  const { setActiveTab } = tabStore();

  const reset = () => {
    setDbInfo(undefined);
    setActiveTab('overview');
  }

  return (
    <div className='logo-holder logo'>
      <Link
        href='/'
        onClick={reset}
        className='flex items-center flex-col text-lg font-semibold md:text-base'
      >
        <h3>SQLite3</h3>
        <p>Explorer</p> 
      </Link>
    </div>
  )
}

export default Logo;
