import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Files } from 'lucide-react';
import { toast } from 'sonner';


type Props = {
  code: string;
};

const CopyButton = ({ code }: Props) => {
  return (
    <button className='CopyButtonClass'>
      <CopyToClipboard
        text={code}
        onCopy={() => toast('Copied code')}
      >
        <div>
          <Files color='#F8F8F8' />
        </div>
      </CopyToClipboard>
    </button>
  );
}

export default CopyButton;
