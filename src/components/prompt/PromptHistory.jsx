import { usePrompt } from '../../context/PromptContext';
import { useClipboard } from '../../hooks/useClipboard';
import { Card, Button } from '../common';
import './PromptHistory.css';

export default function PromptHistory() {
  const { state, dispatch } = usePrompt();
  const { copyToClipboard } = useClipboard();

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_FROM_HISTORY', payload: id });
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
      <div className="prompt-history empty">
        <p>No saved prompts yet</p>
        <p className="hint">Generate and save prompts to see them here</p>
      </div>
    );
  }

  return (
    <div className="prompt-history">
      {state.history.map((item) => (
        <Card key={item.id} className="history-item">
          <div className="history-header">
            <span className="history-type">{getProjectTypeLabel(item.projectType)}</span>
            <span className="history-date">{formatDate(item.createdAt)}</span>
          </div>
          <div className="history-preview">
            {item.prompt.substring(0, 150)}...
          </div>
          <div className="history-actions">
            <Button
              variant="outline"
              size="small"
              onClick={() => copyToClipboard(item.prompt)}
            >
              Copy
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
