import Main from '@/components/Main/Main';
import Header from '@/components/Header/Header';


export default function Home() {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex flex-1 flex-col p-4'>
        <Main />
      </main>
    </div>
  );
}
