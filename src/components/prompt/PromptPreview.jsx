import { usePrompt } from '../../context/PromptContext';
import { generatePrompt } from '../../utils/promptGenerator';
import { useClipboard } from '../../hooks/useClipboard';
import { Button } from '../common';
import './PromptPreview.css';

export default function PromptPreview() {
  const { state, dispatch } = usePrompt();
  const { copied, copyToClipboard } = useClipboard();

  const generatedPrompt = generatePrompt(state.projectType, state.formData);
  const isEditing = state.editingId !== null;

  const handleCopy = () => {
    copyToClipboard(generatedPrompt);
  };

  const handleExport = () => {
    const blob = new Blob([generatedPrompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${state.formData.projectName || 'prompt'}-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (isEditing) {
      const existingItem = state.history.find(h => h.id === state.editingId);
      dispatch({
        type: 'UPDATE_IN_HISTORY',
        payload: {
          ...existingItem,
          projectType: state.projectType,
          formData: state.formData,
          prompt: generatedPrompt
        }
      });
    } else {
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
    }
  };

  return (
    <div className="prompt-preview">
      <div className="preview-header">
        <h3>{isEditing ? 'Edit Prompt' : 'Generated Prompt'}</h3>
        <div className="preview-buttons">
          <Button
            variant="outline"
            size="small"
            onClick={handleCopy}
            ariaLabel={copied ? 'Copied to clipboard' : 'Copy to clipboard'}
          >
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          <Button
            variant="outline"
            size="small"
            onClick={handleExport}
            ariaLabel="Export as markdown file"
          >
            Export
          </Button>
          <Button
            variant="primary"
            size="small"
            onClick={handleSave}
            ariaLabel={isEditing ? 'Update prompt' : 'Save prompt'}
          >
            {isEditing ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
      <div className="preview-content">
        <pre>{generatedPrompt}</pre>
      </div>
    </div>
  );
}
