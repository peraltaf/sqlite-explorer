'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Alert,
  AlertDescription,
  AlertTitle
} from '../ui/alert';
import { Button } from '../ui/button';
import ParseFile from '@/app/actions/db_info';
import Overview from '../Overview/Overview';
import {
  dbInfoStore,
  dbFileStore
} from '@/context/store';
import { Separator } from '../ui/separator';


const FileUpload = () =>  {
  const [uploadAlert, setUploadAlert] = useState<'block'|'none'>('none');
  const [uploadAlertMsg, setUploadAlertMsg] = useState<string>('');
  const [uploadButton, setUploadButton] = useState<boolean>(true);
  const { dbInfo, setDbInfo } = dbInfoStore();
  const { setDbFile } = dbFileStore();

  const processDbFile = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await ParseFile(formData);
    setDbFile(formData.get('backupFile') as File)
    setDbInfo(res);
  }

  const loadSample = async () => {
    const fileLocation = `chinook.db`;
    const res = await ParseFile(fileLocation);

    setDbFile(fileLocation);
    setDbInfo(res);
  }

  const validateFile = (e:ChangeEvent<HTMLInputElement>) => {
    const acceptedType = /(\.db|\.sqlite3)$/i;
    if (!acceptedType.exec(e.target.value)) {
      setUploadAlert('block');
      setUploadAlertMsg('The filetype is not a SQLite3 DB file.');
      setUploadButton(true);
    } else {
      setUploadAlert('none');
      setUploadButton(false);
    }
  }

  return (
    <>
      {
        !dbInfo && <div className='flex justify-center items-center flex-1 p-4 rounded-lg'>
          <div>
            <p className='pb-8'>Start by selecting a local SQLite3 database file. 
              <br />
              <br />
              <strong>Your files and data are your own. It is not stored and it is simply processed in the current browser session.</strong>
            </p>
            <form onSubmit={(e:FormEvent<HTMLFormElement>) => processDbFile(e)}>
              <Label htmlFor='backupFile'>Load SQLite3 Database</Label>
              <Input
                id='backupFile'
                name='backupFile'
                onChange={validateFile}
                type='file'
              />

              <Alert
                className='mt-2'
                style={{ display: uploadAlert }}
                variant='destructive'
              >
                <AlertTitle>Error</AlertTitle>
                <AlertDescription className='text-left'>
                  {uploadAlertMsg}
                </AlertDescription>
              </Alert>

              <Button
                className='mt-2 w-full'
                disabled={uploadButton}
                type='submit'
              >
                View Database
              </Button>

            </form>

            <div className='flex items-center gap-4'>
              <Separator className='flex-1' />
              <span className='text-muted-foreground'>OR</span>
              <Separator className='flex-1' />
            </div>

            <Button
              className='mt-2 w-full'
              onClick={loadSample}
            >
              Load Sample File
            </Button>
          </div>
        </div>
      }
      
      {
        dbInfo && <Overview dbInfo={dbInfo}/>
      }
    </>
  );
}

export default FileUpload;
