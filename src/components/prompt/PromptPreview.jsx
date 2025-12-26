import { usePrompt } from '../../context/PromptContext';
import { generatePrompt } from '../../utils/promptGenerator';
import { useClipboard } from '../../hooks/useClipboard';
import { Button } from '../common';
import './PromptPreview.css';

export default function PromptPreview() {
  const { state, dispatch } = usePrompt();
  const { copied, copyToClipboard } = useClipboard();

  const generatedPrompt = generatePrompt(state.projectType, state.formData);

  const handleCopy = () => {
    copyToClipboard(generatedPrompt);
  };

  const handleSave = () => {
    dispatch({
      type: 'SAVE_TO_HISTORY',
      payload: {
        id: Date.now(),
        projectType: state.projectType,
        formData: state.formData,
        prompt: generatedPrompt,
        createdAt: new Date().toISOString()
      }
    });
  };

  return (
    <div className="prompt-preview">
      <div className="preview-header">
        <h3>Generated Prompt</h3>
        <div className="preview-buttons">
          <Button
            variant="outline"
            size="small"
            onClick={handleCopy}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </div>
      <div className="preview-content">
        <pre>{generatedPrompt}</pre>
      </div>
    </div>
  );
}
