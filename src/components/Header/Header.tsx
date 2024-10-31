'use client';

import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Menu } from 'lucide-react';
import Logo from '../Logo/Logo';
import ThemePicker from '../ThemePicker/ThemePicker';


const Header = () => {
  return (    
    <header className='sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-100'>
      <nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Logo />
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='shrink-0 md:hidden'
          >
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left'>
          <nav className='grid gap-6 text-lg font-medium'>
            <Logo />
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          
        </form>
        <ThemePicker />
      </div>
    </header>
  )
}

export default Header;
