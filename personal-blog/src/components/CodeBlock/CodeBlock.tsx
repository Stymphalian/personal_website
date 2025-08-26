import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  filename,
}) => {
  return (
    <div className='code-block'>
      {/* CodeBlock component will be implemented in task 5.3 */}
      <div className='text-sm text-gray-500 mb-2'>CodeBlock Component</div>
      {filename && <div className='text-xs text-gray-400 mb-2'>{filename}</div>}
      <pre className='text-sm'>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
