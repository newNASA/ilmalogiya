import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { signInWithGoogle, firebaseSignOut } from "../firebase";
import { loginWithGoogle, logout as apiLogout, getProfile, getSavedItems, hasToken } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [savedPostIds, setSavedPostIds] = useState(new Set());
  const [savedQuoteIds, setSavedQuoteIds] = useState(new Set());

  async function loadSavedIds() {
    const data = await getSavedItems();
    if (!data) return;
    setSavedPostIds(new Set(data.saved_posts.results.map((p) => p.id)));
    setSavedQuoteIds(new Set(data.saved_quotes.results.map((q) => q.id)));
  }

  const fetchProfile = useCallback(async () => {
    if (!hasToken()) { setLoading(false); return; }
    const profile = await getProfile();
    if (profile) {
      setUser(profile);
      await loadSavedIds();
    } else {
      apiLogout();
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProfile(); }, [fetchProfile]);

  async function loginGoogle() {
    const idToken = await signInWithGoogle();
    const profile = await loginWithGoogle(idToken);
    setUser(profile);
    await loadSavedIds();
    return profile;
  }

  function logout() {
    firebaseSignOut().catch(() => {});
    apiLogout();
    setUser(null);
    setSavedPostIds(new Set());
    setSavedQuoteIds(new Set());
  }

  function updateUser(profile) {
    setUser(profile);
  }

  function toggleSavedPost(postId, isSaved) {
    setSavedPostIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.add(postId) : next.delete(postId);
      return next;
    });
  }

  function toggleSavedQuote(quoteId, isSaved) {
    setSavedQuoteIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.add(quoteId) : next.delete(quoteId);
      return next;
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, loginGoogle, logout, updateUser, savedPostIds, savedQuoteIds, toggleSavedPost, toggleSavedQuote }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
