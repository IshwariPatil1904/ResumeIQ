import React, { useState } from 'react';
import { Check, Shield, Sparkles, Github, PartyPopper } from 'lucide-react';
import { saveUser, saveAuth, addNotification } from '../utils/storage';

export default function RegisterPage({ onNavigate, onLogin, addToast }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [terms, setTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const next = {};
    if (!name.trim()) next.name = 'Name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6) next.password = 'Minimum 6 characters';
    if (password !== confirm) next.confirm = 'Passwords do not match';
    if (!terms) next.terms = 'You must accept the terms';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const user = {
      isLoggedIn: true,
      name: name.trim(),
      email: email.trim(),
      password,
      avatar: '🚀',
      resumeCount: 0,
      lastAnalysis: null,
      savedReportsCount: 0,
    };

    saveAuth({ email: user.email, remember: true });
    saveUser(user);
    setSuccess(true);

    setTimeout(() => {
      onLogin(user);
      addNotification('Account created — welcome to ResumeIQ!');
      addToast('Account created successfully!', 'success');
      onNavigate('home');
    }, 1800);
  };

  if (success) {
    return (
      <div className="auth-wrapper container">
        <div className="auth-success-card card animate-fade-in">
          <div className="auth-success-icon"><PartyPopper size={48} className="text-primary" /></div>
          <h2>Welcome aboard!</h2>
          <p>Your account has been created locally. Redirecting...</p>
          <div className="overlay-progress-bar" style={{ marginTop: 24 }}>
            <div className="overlay-progress-fill auth-success-progress" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper container">
      <div className="auth-container">
        <div className="auth-info-side">
          <div className="auth-info-glow" aria-hidden="true" />
          <div className="auth-info-header">
            <span className="auth-info-badge"><Shield size={12} /> 100% Client Side</span>
            <h2>Join thousands optimizing their resumes</h2>
            <p>Create a free local account to track history, save reports, and unlock achievements.</p>
          </div>
          <ul className="auth-feature-list">
            <li className="auth-feature-item"><Check size={16} className="text-success" /> Save analysis history</li>
            <li className="auth-feature-item"><Check size={16} className="text-success" /> Export &amp; bookmark reports</li>
            <li className="auth-feature-item"><Check size={16} className="text-success" /> No data leaves your browser</li>
          </ul>
        </div>

        <div className="auth-form-side">
          <div className="auth-form-header">
            <h3>Create account</h3>
            <p>
              Already have one?{' '}
              <button type="button" className="auth-form-redirect-link" onClick={() => onNavigate('login')}>
                Sign in
              </button>
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="auth-form-group">
              <label htmlFor="reg-name">Full Name</label>
              <input id="reg-name" type="text" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
              {errors.name && <span className="auth-error-text" role="alert">{errors.name}</span>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-email">Email</label>
              <input id="reg-email" type="email" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              {errors.email && <span className="auth-error-text" role="alert">{errors.email}</span>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-password">Password</label>
              <input id="reg-password" type="password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              {errors.password && <span className="auth-error-text" role="alert">{errors.password}</span>}
            </div>

            <div className="auth-form-group">
              <label htmlFor="reg-confirm">Confirm Password</label>
              <input id="reg-confirm" type="password" className="auth-input" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="••••••••" />
              {errors.confirm && <span className="auth-error-text" role="alert">{errors.confirm}</span>}
            </div>

            <div className="auth-form-group">
              <label className="checkbox-label-group">
                <input type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                I agree to the Terms of Service and Privacy Policy
              </label>
              {errors.terms && <span className="auth-error-text" role="alert">{errors.terms}</span>}
            </div>

            <button type="submit" className="button button-primary auth-submit-btn hover-scale hover-glow">
              <Sparkles size={16} className="button-icon" />
              Create Account
            </button>
          </form>

          <div className="social-auth-divider">or sign up with</div>
          <div className="social-auth-grid">
            <button type="button" className="social-auth-btn hover-scale">Google</button>
            <button type="button" className="social-auth-btn hover-scale"><Github size={16} /> GitHub</button>
          </div>
        </div>
      </div>
    </div>
  );
}
