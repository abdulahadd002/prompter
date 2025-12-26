import { PromptBuilder } from '../components/prompt';
import './Builder.css';

export default function Builder() {
  return (
    <div className="builder-page">
      <h1>Prompt Builder</h1>
      <p className="builder-description">
        Fill in the details about your project to generate a structured prompt
      </p>
      <PromptBuilder />
    </div>
  );
}
