import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Profile {
  id: string;
  display_name: string | null;
  phone: string | null;
  loyalty_points: number;
}

interface LoyaltyTier {
  id: number;
  name: string;
  min_points: number;
  discount_percentage: number;
}

export function useLoyalty() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [tiers, setTiers] = useState<LoyaltyTier[]>([]);
  const [currentTier, setCurrentTier] = useState<LoyaltyTier | null>(null);
  const [nextTier, setNextTier] = useState<LoyaltyTier | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTiers();
  }, []);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setProfile(null);
      setCurrentTier(null);
      setNextTier(null);
      setLoading(false);
    }
  }, [user, tiers]);

  const fetchTiers = async () => {
    const { data } = await supabase
      .from('loyalty_tiers')
      .select('*')
      .order('min_points', { ascending: true });
    if (data) setTiers(data);
  };

  const fetchProfile = async () => {
    if (!user) return;
    setLoading(true);
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (data) {
      setProfile(data);
      // Calculate current tier
      const sorted = [...tiers].sort((a, b) => b.min_points - a.min_points);
      const current = sorted.find(t => data.loyalty_points >= t.min_points) ?? null;
      setCurrentTier(current);
      // Calculate next tier
      const currentIndex = tiers.findIndex(t => t.id === current?.id);
      setNextTier(currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null);
    }
    setLoading(false);
  };

  const updateProfile = async (updates: { display_name?: string; phone?: string }) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);
    if (!error) await fetchProfile();
    return { error };
  };

  return { profile, tiers, currentTier, nextTier, loading, updateProfile, refetch: fetchProfile };
}
