import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  { q: 'What is ResumeIQ?', a: 'ResumeIQ is a free, privacy-first resume analyzer that runs entirely in your browser. It compares your resume against job descriptions, calculates ATS scores, and generates interview prep questions — without sending data to any server.' },
  { q: 'How does ATS scoring work?', a: 'Our ATS engine extracts keywords from both your resume and the job description, then calculates overlap for skills and terms. The score reflects how well your resume matches the role requirements using the same keyword-matching principles ATS systems use.' },
  { q: 'Is my resume uploaded to a server?', a: 'No. PDF and DOCX parsing happens locally using pdf.js and mammoth. Your resume text never leaves your device. There is no backend, API, or database.' },
  { q: 'What file formats are supported?', a: 'ResumeIQ supports PDF, DOCX, and TXT files up to 5MB. You can also paste resume text directly into the analyzer.' },
  { q: 'How are interview questions generated?', a: 'Interview questions are generated based on the skills that matched between your resume and the job description. Each question includes a category and a sample answer to help you prepare.' },
  { q: 'Can I save my analysis results?', a: 'Yes. Use the Save Analysis button on the results dashboard to bookmark reports in localStorage. You can also view your full analysis history from the navigation menu.' },
  { q: 'Do I need to create an account?', a: 'No account is required to use ResumeIQ. Creating a local account lets you personalize your profile, track achievements, and manage saved reports across sessions.' },
  { q: 'What suggestions does ResumeIQ provide?', a: 'Based on missing skills and your ATS score, ResumeIQ generates actionable suggestions to improve keyword coverage, highlight relevant experience, and strengthen your resume for the target role.' },
  { q: 'Is ResumeIQ really free?', a: 'Yes — ResumeIQ is free forever with no paywalls, subscriptions, or premium tiers. It was built as an open tool for students and job seekers.' },
  { q: 'Who built ResumeIQ?', a: 'ResumeIQ was built by Ishwari Ajaykumar Patil as a client-side portfolio project. It is designed for Digital Heroes and anyone preparing for technical interviews.' },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section id="faq-section" className="faq-view-wrapper container" aria-labelledby="faq-title">
      <div className="faq-view-header">
        <span className="section-badge" style={{ marginBottom: 12, display: 'inline-flex' }}>
          <HelpCircle size={12} /> FAQ
        </span>
        <h1 id="faq-title">Frequently Asked Questions</h1>
        <p>Everything you need to know about ResumeIQ.</p>
      </div>

      <div className="faq-accordion-group">
        {FAQ_ITEMS.map((item, idx) => {
          const expanded = openIndex === idx;
          return (
            <div key={idx} className={`faq-accordion-item ${expanded ? 'expanded' : ''} hover-lift`}>
              <button
                type="button"
                className="faq-accordion-header"
                onClick={() => setOpenIndex(expanded ? null : idx)}
                aria-expanded={expanded}
              >
                <span className="faq-question-title">{item.q}</span>
                <ChevronDown size={18} className="faq-toggle-icon" style={{ transform: expanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
              </button>
              {expanded && (
                <div className="faq-accordion-content">
                  <p className="faq-answer-text">{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
