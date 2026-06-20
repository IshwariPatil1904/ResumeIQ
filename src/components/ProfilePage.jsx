import React, { useState } from 'react';
import { Award, Calendar, Bookmark, Edit3, Trophy, Star, Target, Zap } from 'lucide-react';
import { saveProfile } from '../utils/storage';
import AnimatedCounter from './AnimatedCounter';

const AVATARS = ['👤', '🚀', '💼', '🎯', '⭐', '🏆', '💡', '🔥'];
const ACHIEVEMENTS = [
  { id: 'first', title: 'First Scan', desc: 'Complete your first analysis', icon: Target, unlockAt: 1 },
  { id: 'pro', title: 'Resume Pro', desc: 'Upload 5 resumes', icon: Star, unlockAt: 5 },
  { id: 'master', title: 'ATS Master', desc: 'Score 80%+ on any scan', icon: Trophy, unlockAt: 80 },
  { id: 'speed', title: 'Speed Runner', desc: 'Run 10 analyses', icon: Zap, unlockAt: 10 },
];

export default function ProfilePage({ profile, stats, onProfileUpdate, addToast }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [avatar, setAvatar] = useState(profile.avatar);

  const handleSave = () => {
    const updated = { ...profile, name: name.trim(), email: email.trim(), avatar };
    saveProfile(updated);
    onProfileUpdate(updated);
    setEditing(false);
    addToast('Profile updated!', 'success');
  };

  const formatDate = (iso) => {
    if (!iso) return 'Never';
    return new Date(iso).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="profile-wrapper container">
      <div className="profile-card-layout card">
        <div className="profile-main-header">
          <div className="profile-avatar-display" aria-hidden="true">{avatar}</div>
          <div className="profile-name-fields">
            {editing ? (
              <>
                <input className="auth-input" value={name} onChange={(e) => setName(e.target.value)} aria-label="Name" />
                <input className="auth-input" style={{ marginTop: 8 }} value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
              </>
            ) : (
              <>
                <h2>{profile.name}</h2>
                <p>{profile.email || 'No email set'}</p>
              </>
            )}
          </div>
          <button
            type="button"
            className="button button-secondary hover-scale"
            onClick={() => (editing ? handleSave() : setEditing(true))}
          >
            <Edit3 size={14} className="button-icon" />
            {editing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        {editing && (
          <div className="profile-avatar-emoji-picker-container">
            <span className="profile-avatar-picker-label">Choose Avatar</span>
            <div className="profile-avatar-options-row">
              {AVATARS.map((a) => (
                <button
                  key={a}
                  type="button"
                  className={`profile-avatar-option-btn ${avatar === a ? 'selected' : ''}`}
                  onClick={() => setAvatar(a)}
                  aria-label={`Avatar ${a}`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="profile-stats-row">
          <div className="profile-stat-box hover-lift">
            <div className="profile-stat-box-val"><AnimatedCounter value={profile.resumeCount || stats.totalAnalyses} /></div>
            <div className="profile-stat-box-lbl"><Award size={12} /> Resume Count</div>
          </div>
          <div className="profile-stat-box hover-lift">
            <div className="profile-stat-box-val" style={{ fontSize: '0.95rem' }}>{formatDate(profile.lastAnalysis)}</div>
            <div className="profile-stat-box-lbl"><Calendar size={12} /> Last Analysis</div>
          </div>
          <div className="profile-stat-box hover-lift">
            <div className="profile-stat-box-val"><AnimatedCounter value={profile.savedReportsCount} /></div>
            <div className="profile-stat-box-lbl"><Bookmark size={12} /> Saved Reports</div>
          </div>
        </div>

        <div className="profile-achievements-section">
          <h3>Achievements</h3>
          <div className="profile-achievements-row">
            {ACHIEVEMENTS.map(({ id, title, desc, icon: Icon, unlockAt }) => {
              let unlocked = false;
              if (id === 'first') unlocked = stats.totalAnalyses >= 1;
              if (id === 'pro') unlocked = stats.resumeUploads >= 5;
              if (id === 'master') unlocked = (stats.atsScores || []).some((s) => s >= 80);
              if (id === 'speed') unlocked = stats.totalAnalyses >= 10;

              return (
                <div key={id} className={`achievement-pill ${unlocked ? 'unlocked' : 'locked'} hover-lift`}>
                  <span className="achievement-icon-wrapper-circle"><Icon size={16} /></span>
                  <div className="achievement-info-texts">
                    <h4>{title}</h4>
                    <p>{desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
