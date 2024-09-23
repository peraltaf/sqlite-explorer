import SyntaxHighlighter from 'react-syntax-highlighter';
import CopyButton from '@/components/CopyButton/CopyButton';


type Props = {
  code: string;
  language: string;
  style: { [key: string]: React.CSSProperties };
};

const CodeBlock = ({ code, language, style }: Props) => {
  return (
    <div className='CodeBlockClass'>
      <CopyButton code={code} />
      <SyntaxHighlighter
        language={language}
        style={style}
        wrapLines={true}
        wrapLongLines={true}
        showLineNumbers={true}
        showInlineLineNumbers={false}
        customStyle={{
          border: '1px solid #c3c3c3',
          borderRadius: '5px',
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeBlock;