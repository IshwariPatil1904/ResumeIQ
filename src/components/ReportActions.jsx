import React, { useState } from 'react';
import { Copy, Download, FileText, Printer, Check } from 'lucide-react';

/**
 * Report actions component that provides copy to clipboard, text download, and PDF printing hooks.
 */
export default function ReportActions({
  score,
  strength,
  matchingSkills,
  missingSkills,
  matchingKeywords,
  missingKeywords,
  suggestions,
  questions,
  analytics
}) {
  const [copied, setCopied] = useState(false);

  // Generate a clean text report
  const generateTextReport = () => {
    let report = `==================================================\n`;
    report += `          RESUMEIQ - ATS ANALYSIS REPORT          \n`;
    report += `==================================================\n\n`;
    report += `MATCH SCORE: ${score}%\n`;
    report += `RESUME STRENGTH: ${strength}\n\n`;
    
    report += `--------------------------------------------------\n`;
    report += `RESUME METRICS\n`;
    report += `--------------------------------------------------\n`;
    report += `- Word Count: ${analytics?.wordCount || 0}\n`;
    report += `- Character Count: ${analytics?.charCount || 0}\n`;
    report += `- Projects Identified: ${analytics?.projectsDetected || 0}\n`;
    report += `- Technical Skills Matched: ${matchingSkills.length}\n\n`;

    report += `--------------------------------------------------\n`;
    report += `SKILLS COMPARISON\n`;
    report += `--------------------------------------------------\n`;
    report += `Matched Skills: ${matchingSkills.join(', ') || 'None'}\n`;
    report += `Missing Skills: ${missingSkills.join(', ') || 'None'}\n\n`;

    report += `--------------------------------------------------\n`;
    report += `RESUME IMPROVEMENT SUGGESTIONS\n`;
    report += `--------------------------------------------------\n`;
    if (suggestions && suggestions.length > 0) {
      suggestions.forEach((s, idx) => {
        report += `${idx + 1}. [${s.title}] ${s.description}\n`;
      });
    } else {
      report += `No suggestions needed! Your resume matches perfectly.\n`;
    }
    report += `\n`;

    report += `--------------------------------------------------\n`;
    report += `TAILORED INTERVIEW PREPARATION QUESTIONS\n`;
    report += `--------------------------------------------------\n`;
    if (questions && questions.length > 0) {
      questions.forEach((q, idx) => {
        report += `Q${idx + 1} (${q.category}): ${q.question}\n`;
        report += `A: ${q.answer}\n\n`;
      });
    } else {
      report += `No questions generated.\n`;
    }

    report += `==================================================\n`;
    report += `Report generated client-side by ResumeIQ.\n`;
    report += `Build by Ishwari Ajaykumar Patil (ishwari.patil24@vit.edu)\n`;
    report += `==================================================\n`;

    return report;
  };

  const handleCopy = async () => {
    try {
      const text = generateTextReport();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadTxt = () => {
    const text = generateTextReport();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ResumeIQ_ATS_Report_${score}percent.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="report-actions-card card" data-aos="fade-up">
      <div className="card-header">
        <h2>Report Operations</h2>
        <p className="card-subtitle-small">Export or print your ATS report locally.</p>
      </div>

      <div className="card-body action-buttons-row">
        <button
          onClick={handleCopy}
          className={`button ${copied ? 'button-success' : 'button-secondary'} flex-grow-btn`}
          aria-label="Copy resume report details to clipboard"
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
          <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
        </button>

        <button
          onClick={handleDownloadTxt}
          className="button button-secondary flex-grow-btn"
          aria-label="Download analysis report as a text file"
        >
          <Download size={16} />
          <span>Download TXT</span>
        </button>

        <button
          onClick={handlePrint}
          className="button button-primary flex-grow-btn"
          aria-label="Print or save report as a PDF"
        >
          <Printer size={16} />
          <span>Save PDF / Print</span>
        </button>
      </div>
    </div>
  );
}
