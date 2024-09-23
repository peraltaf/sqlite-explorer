import Link from 'next/link';


const Logo = () => {
  const handleClick = () => {
    window.location.reload();
  }

  return (
    <div className='logo-holder logo'>
      <Link
        href='/'
        onClick={handleClick}
        className='flex items-center flex-col text-lg font-semibold md:text-base'
      >
        <h3>SQLite3</h3>
        <p>Explorer</p> 
      </Link>
    </div>
  )
}

export default Logo;
