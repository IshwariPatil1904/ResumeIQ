import React from 'react';
import { Layers, Check, X } from 'lucide-react';
import { SKILLS_TAXONOMY } from '../utils/constants';

/**
 * SkillCategories component that displays job description requirements grouped by category,
 * showing which ones are matched and which ones are missing.
 */
export default function SkillCategories({ matchingSkills, missingSkills }) {
  // Convert arrays to Sets for O(1) lookups
  const matchedSet = new Set(matchingSkills.map(s => s.toLowerCase()));
  const missingSet = new Set(missingSkills.map(s => s.toLowerCase()));

  // Map category keys to human-friendly titles
  const categoryTitles = {
    frontend: 'Frontend Development',
    backend: 'Backend Development',
    database: 'Databases & Caching',
    cloud: 'Cloud & Infrastructure',
    devops: 'DevOps & CI/CD',
    languages: 'Programming Languages',
    tools: 'Developer Tools'
  };

  // Build the list of categories that contain at least one skill requested in the job description
  const activeCategories = [];

  Object.entries(SKILLS_TAXONOMY).forEach(([key, skillsInTaxonomy]) => {
    const categorySkills = [];

    skillsInTaxonomy.forEach((skill) => {
      const nameLower = skill.name.toLowerCase();
      const isMatched = matchedSet.has(nameLower);
      const isMissing = missingSet.has(nameLower);

      if (isMatched || isMissing) {
        categorySkills.push({
          name: skill.name,
          status: isMatched ? 'matched' : 'missing'
        });
      }
    });

    if (categorySkills.length > 0) {
      activeCategories.push({
        key,
        title: categoryTitles[key] || key,
        skills: categorySkills
      });
    }
  });

  if (activeCategories.length === 0) return null;

  return (
    <div className="skill-categories-card card" data-aos="fade-up">
      <div className="card-header">
        <div className="card-title-group">
          <Layers className="text-primary" size={20} />
          <h2>Skill Categorization</h2>
        </div>
        <p className="card-subtitle-small">Requested job skills mapped by structural area.</p>
      </div>

      <div className="card-body">
        <div className="skill-categories-grid">
          {activeCategories.map((category) => (
            <div key={category.key} className="skill-category-panel">
              <h3 className="category-panel-title">{category.title}</h3>
              <ul className="category-skill-list">
                {category.skills.map((skill, index) => (
                  <li 
                    key={`${category.key}-${index}`} 
                    className={`category-skill-item ${skill.status === 'matched' ? 'matched' : 'missing'}`}
                  >
                    <span className="skill-status-icon">
                      {skill.status === 'matched' ? (
                        <Check size={14} className="text-success" />
                      ) : (
                        <X size={14} className="text-warning" />
                      )}
                    </span>
                    <span className="skill-item-name">{skill.name}</span>
                    <span className={`skill-item-status-pill ${skill.status}`}>
                      {skill.status === 'matched' ? 'Match' : 'Missing'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
