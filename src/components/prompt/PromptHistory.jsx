import { useNavigate } from 'react-router-dom';
import { usePrompt } from '../../context/PromptContext';
import { useClipboard } from '../../hooks/useClipboard';
import { Card, Button } from '../common';
import './PromptHistory.css';

export default function PromptHistory() {
  const { state, dispatch } = usePrompt();
  const { copyToClipboard } = useClipboard();
  const navigate = useNavigate();

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_FROM_HISTORY', payload: id });
  };

  const handleEdit = (id) => {
    dispatch({ type: 'EDIT_PROMPT', payload: id });
    navigate('/builder');
  };

  const handleExport = (item) => {
    const blob = new Blob([item.prompt], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.formData.projectName || 'prompt'}-${new Date(item.createdAt).toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProjectTypeLabel = (type) => {
    const labels = {
      mobile: 'Mobile App',
      web: 'Web App',
      api: 'API/Backend',
      desktop: 'Desktop App'
    };
    return labels[type] || type;
  };

  if (state.history.length === 0) {
    return (
      <div className="prompt-history empty" role="status">
        <p>No saved prompts yet</p>
        <p className="hint">Generate and save prompts to see them here</p>
      </div>
    );
  }

  return (
    <div className="prompt-history" role="list" aria-label="Saved prompts">
      {state.history.map((item) => (
        <Card key={item.id} className="history-item" role="listitem">
          <div className="history-header">
            <span className="history-type">{getProjectTypeLabel(item.projectType)}</span>
            <span className="history-date">
              {formatDate(item.createdAt)}
              {item.updatedAt && <span className="updated-label"> (edited)</span>}
            </span>
          </div>
          <h4 className="history-name">{item.formData.projectName || 'Untitled'}</h4>
          <div className="history-preview">
            {item.prompt.substring(0, 150)}...
          </div>
          <div className="history-actions">
            <Button
              variant="outline"
              size="small"
              onClick={() => copyToClipboard(item.prompt)}
              ariaLabel="Copy prompt to clipboard"
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="small"
              onClick={() => handleExport(item)}
              ariaLabel="Export prompt as markdown file"
            >
              Export
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => handleEdit(item.id)}
              ariaLabel="Edit this prompt"
            >
              Edit
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleDelete(item.id)}
              ariaLabel="Delete this prompt"
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
