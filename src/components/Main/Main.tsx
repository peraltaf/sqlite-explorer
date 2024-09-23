'use client';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import FileUpload from '../FileUpload/FileUpload';
import { dbInfoStore } from '@/context/store';
import Tables from '../Tables/Tables';
import Query from '../Query/Query';


const Main = () => {
  const { dbInfo } = dbInfoStore();

  return (
    <Tabs defaultValue='overview' className='w-full h-full'>
      { dbInfo &&
        <div className='flex justify-center border-b-[1px] pb-8'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <TabsTrigger value='tables'>Tables</TabsTrigger>
            <TabsTrigger value='query'>Query</TabsTrigger>
          </TabsList>
        </div>
      }
      <TabsContent value='overview' className='h-full'>
        <FileUpload />
      </TabsContent>
      <TabsContent value='tables'>
        { dbInfo && <Tables /> }
      </TabsContent>
      <TabsContent value='query'>
        <Query />
      </TabsContent>
    </Tabs>
  )
}

export default Main;
