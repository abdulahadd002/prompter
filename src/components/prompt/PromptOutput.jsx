import { useClipboard } from '../../hooks/useClipboard';
import { Button } from '../common';
import './PromptOutput.css';

export default function PromptOutput({ prompt, onEdit }) {
  const { copied, copyToClipboard } = useClipboard();

  if (!prompt) {
    return (
      <div className="prompt-output empty">
        <p>Your generated prompt will appear here</p>
      </div>
    );
  }

  return (
    <div className="prompt-output">
      <div className="output-toolbar">
        <Button
          variant="outline"
          size="small"
          onClick={() => copyToClipboard(prompt)}
        >
          {copied ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
        {onEdit && (
          <Button
            variant="secondary"
            size="small"
            onClick={onEdit}
          >
            Edit
          </Button>
        )}
      </div>
      <div className="output-content">
        <pre>{prompt}</pre>
      </div>
    </div>
  );
}
