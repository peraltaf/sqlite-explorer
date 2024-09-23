'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import FileUpload from '../FileUpload/FileUpload';
import { dbInfoStore, tabStore } from '@/context/store';
import Tables from '../Tables/Tables';
import Query from '../Query/Query';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UndoDot } from 'lucide-react';


const Main = () => {
  const { dbInfo, setDbInfo } = dbInfoStore();
  const { activeTab, setActiveTab } = tabStore();

  const onTabChange = (tab:string) => setActiveTab(tab);

  const reset = () => {
    setDbInfo(undefined);
    setActiveTab('overview');
  }

  return (
    <Tabs
      className='w-full h-full'
      value={activeTab}
      onValueChange={onTabChange}
    >
      { dbInfo &&
        <div className='flex items-center justify-center border-b-[1px] pb-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='tables'>Tables</TabsTrigger>
            <TabsTrigger value='query'>Query</TabsTrigger>
          </TabsList>

          <Separator orientation='vertical' />

          <Button
            aria-label='Reset'
            className='ml-2'
            size='icon'
            variant='ghost'
            onClick={reset}
          >
            <UndoDot />
          </Button>
        </div>
      }
      <TabsContent value='overview' className='h-full'>
        <FileUpload />
      </TabsContent>
      <TabsContent value='tables'>
        { dbInfo && <Tables /> }
      </TabsContent>
      <TabsContent value='query'>
        { dbInfo && <Query /> }
      </TabsContent>
    </Tabs>
  )
}

export default Main;
