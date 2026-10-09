import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircleUserRound, X, Mail, Lock, LogIn, LogOut, CheckCircle, KeyRound } from 'lucide-react';
import { api } from '../../services/api';

export default function FloatingLogin({ isOpen: controlledOpen, onClose, onAuthChange }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleClose = () => {
    if (onClose) onClose();
    setInternalOpen(false);
    setIsChangingPassword(false);
    setCurrentPassword('');
    setNewPassword('');
    setPasswordConfirmation('');
    setPwdError('');
    setPwdSuccess('');
  };

  const [currentUser, setCurrentUser] = useState(() => api.getCurrentUser());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Password change state
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [pwdError, setPwdError] = useState('');
  const [pwdSuccess, setPwdSuccess] = useState('');
  const [isPwdLoading, setIsPwdLoading] = useState(false);

  useEffect(() => {
    const refreshUser = () => setCurrentUser(api.getCurrentUser());
    window.addEventListener('acm-auth-changed', refreshUser);
    return () => window.removeEventListener('acm-auth-changed', refreshUser);
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPwdError('');
    setPwdSuccess('');

    if (newPassword.length < 6) {
      setPwdError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== passwordConfirmation) {
      setPwdError('New password and confirmation do not match.');
      return;
    }

    setIsPwdLoading(true);
    try {
      const res = await api.changePassword({
        currentPassword,
        newPassword,
        passwordConfirmation
      });
      setPwdSuccess(res.message || 'Password successfully updated!');
      setCurrentPassword('');
      setNewPassword('');
      setPasswordConfirmation('');
      setTimeout(() => {
        setIsChangingPassword(false);
        setPwdSuccess('');
      }, 2000);
    } catch (err) {
      setPwdError(err.message || 'Failed to change password.');
    } finally {
      setIsPwdLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@nitk.edu.in')) {
      setError('Only official NITK educational email accounts (@nitk.edu.in) are permitted to sign in.');
      return;
    }

    setIsLoading(true);

    try {
      const data = await api.login(cleanEmail, password);
      api.saveAuth(data.token, data.user);
      setCurrentUser(data.user);
      onAuthChange?.(data.user);
      window.dispatchEvent(new Event('acm-auth-changed'));
      setSuccessMsg(`Welcome, ${data.user.name || 'Member'}!`);
      setTimeout(() => {
        handleClose();
        setSuccessMsg('');
      }, 1200);
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    api.logout();
    setCurrentUser(null);
    onAuthChange?.(null);
    window.dispatchEvent(new Event('acm-auth-changed'));
    handleClose();
  };

  return (
    <>
      {/* Floating Pill Trigger (Only shown when not controlled by Navbar) */}
      {!isControlled && (
        <div 
          onClick={() => setInternalOpen(true)}
          className="fixed top-6 right-4 md:right-6 z-50 group cursor-pointer mix-blend-difference text-white"
        >
          <div className="flex items-center gap-2 p-2 rounded-full border border-white/40 shadow-lg hover:bg-white/20 transition-all">
            <span className="hidden md:block text-sm font-medium pl-2 max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out">
              {currentUser ? currentUser.name : 'Login Portal'}
            </span>
            <CircleUserRound className="w-6 h-6 shrink-0" />
          </div>
        </div>
      )}

      {/* Login / Profile Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="absolute inset-0 bg-brand-navy/60 dark:bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-[#111] rounded-3xl shadow-2xl p-8 border border-black/10 dark:border-white/10 z-10"
            >
              <button 
                onClick={handleClose} 
                className="absolute top-6 right-6 text-gray-400 hover:text-brand-navy dark:hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {currentUser ? (
                /* Profile / Logged In State */
                <div className="text-center py-4">
                  <div className="w-20 h-20 rounded-full bg-brand-blue/20 border border-brand-blue flex items-center justify-center text-brand-blue text-2xl font-black mx-auto mb-4 uppercase">
                    {currentUser.name ? currentUser.name.charAt(0) : "U"}
                  </div>
                  <h3 className="text-2xl font-black text-brand-navy dark:text-white mb-1">
                    {currentUser.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">{currentUser.email}</p>

                  {/* Change Password Toggle / Section */}
                  <div className="mb-6 border-t border-black/10 dark:border-white/10 pt-4 text-left">
                    {!isChangingPassword ? (
                      <button
                        onClick={() => {
                          setIsChangingPassword(true);
                          setPwdError('');
                          setPwdSuccess('');
                        }}
                        className="w-full py-2.5 px-4 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-xs font-semibold text-brand-navy dark:text-white transition-colors flex items-center justify-between"
                      >
                        <span className="flex items-center gap-2">
                          <KeyRound className="w-4 h-4 text-brand-blue" /> Change Password
                        </span>
                        <span className="text-[10px] text-gray-400 font-normal">Update credentials</span>
                      </button>
                    ) : (
                      <form onSubmit={handleChangePassword} className="space-y-3 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-black/5 dark:border-white/5">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-brand-navy dark:text-white flex items-center gap-1.5">
                            <KeyRound className="w-3.5 h-3.5 text-brand-blue" /> Change Password
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setIsChangingPassword(false);
                              setCurrentPassword('');
                              setNewPassword('');
                              setPasswordConfirmation('');
                              setPwdError('');
                            }}
                            className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                          >
                            Cancel
                          </button>
                        </div>

                        {pwdError && (
                          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-medium">
                            {pwdError}
                          </div>
                        )}

                        {pwdSuccess && (
                          <div className="p-2.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500 text-[11px] font-medium flex items-center gap-1.5">
                            <CheckCircle className="w-3.5 h-3.5" /> {pwdSuccess}
                          </div>
                        )}

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Current Password
                          </label>
                          <input
                            type="password"
                            required
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-xs focus:outline-none focus:border-brand-blue text-brand-navy dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            New Password
                          </label>
                          <input
                            type="password"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="At least 6 characters"
                            className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-xs focus:outline-none focus:border-brand-blue text-brand-navy dark:text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">
                            Confirm New Password
                          </label>
                          <input
                            type="password"
                            required
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            placeholder="Re-enter new password"
                            className="w-full px-3 py-2 rounded-lg border border-black/10 dark:border-white/10 bg-white dark:bg-[#1a1a1a] text-xs focus:outline-none focus:border-brand-blue text-brand-navy dark:text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          disabled={isPwdLoading}
                          className="w-full py-2.5 rounded-xl bg-brand-blue text-brand-navy font-bold text-xs uppercase tracking-wider hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 mt-1"
                        >
                          {isPwdLoading ? "Updating..." : "Confirm & Save Password"}
                        </button>
                      </form>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full py-3.5 rounded-xl border border-red-500/30 text-red-500 hover:bg-red-500/10 font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              ) : (
                /* Login Form */
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl font-black text-brand-navy dark:text-white mb-2">Member Portal</h2>
                    <p className="text-xs text-gray-500">Sign in using your ACM NITK credentials.</p>
                  </div>

                  {error && (
                    <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                      {error}
                    </div>
                  )}

                  {successMsg && (
                    <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-semibold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" /> {successMsg}
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        NITK Email Address (@nitk.edu.in)
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="member@nitk.edu.in"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm focus:outline-none focus:border-brand-blue transition-colors text-brand-navy dark:text-white"
                        />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Must strictly end with @nitk.edu.in</p>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-sm focus:outline-none focus:border-brand-blue transition-colors text-brand-navy dark:text-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3.5 rounded-xl bg-brand-blue text-brand-navy font-bold uppercase tracking-widest text-xs hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
                    >
                      {isLoading ? "Authenticating..." : <>Sign In <LogIn className="w-4 h-4" /></>}
                    </button>

                    <div className="pt-2 text-center">
                      <p className="text-[11px] text-gray-400">
                        Default seed account: <code className="text-brand-blue">webmaster@nitk.edu.in</code> / <code className="text-brand-blue">password123</code>
                      </p>
                    </div>
                  </form>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
