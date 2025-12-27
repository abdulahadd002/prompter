import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-text">Prompter - Generate structured prompts for your projects</p>
        <p className="footer-copyright">{new Date().getFullYear()} - Built for developers</p>
      </div>
    </footer>
  );
}
