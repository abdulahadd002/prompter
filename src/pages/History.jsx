import { PromptHistory } from '../components/prompt';
import './History.css';

export default function History() {
  return (
    <div className="history-page">
      <h1>Prompt History</h1>
      <p className="history-description">
        View and manage your saved prompts
      </p>
      <PromptHistory />
    </div>
  );
}
