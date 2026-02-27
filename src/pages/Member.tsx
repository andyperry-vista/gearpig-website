import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useLoyalty } from '@/hooks/useLoyalty';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { Trophy, Star, Zap, Crown } from 'lucide-react';

const tierIcons: Record<string, React.ReactNode> = {
  Bronze: <Star className="h-8 w-8 text-amber-600" />,
  Silver: <Zap className="h-8 w-8 text-slate-400" />,
  Gold: <Trophy className="h-8 w-8 text-yellow-400" />,
  Platinum: <Crown className="h-8 w-8 text-purple-400" />,
};

const tierColors: Record<string, string> = {
  Bronze: 'from-amber-900/40 to-amber-700/20 border-amber-700/30',
  Silver: 'from-slate-600/40 to-slate-400/20 border-slate-500/30',
  Gold: 'from-yellow-700/40 to-yellow-500/20 border-yellow-600/30',
  Platinum: 'from-purple-800/40 to-purple-500/20 border-purple-600/30',
};

const Member = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const { profile, tiers, currentTier, nextTier, loading, updateProfile } = useLoyalty();
  const navigate = useNavigate();
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate('/auth');
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (profile) {
      setEditName(profile.display_name || '');
      setEditPhone(profile.phone || '');
    }
  }, [profile]);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-28 pb-16 flex items-center justify-center min-h-[80vh]">
          <p className="text-muted-foreground">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  const points = profile?.loyalty_points ?? 0;
  const progressToNext = nextTier
    ? ((points - (currentTier?.min_points ?? 0)) / (nextTier.min_points - (currentTier?.min_points ?? 0))) * 100
    : 100;

  const handleSave = async () => {
    const { error } = await updateProfile({ display_name: editName, phone: editPhone }) ?? {};
    if (error) {
      toast.error('Failed to update profile');
    } else {
      toast.success('Profile updated!');
      setEditing(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-28 pb-16 px-4 max-w-4xl mx-auto">
        {/* Tier Card */}
        <Card className={`mb-8 bg-gradient-to-br ${tierColors[currentTier?.name ?? 'Bronze']} border`}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-4 mb-4">
              {tierIcons[currentTier?.name ?? 'Bronze']}
              <div>
                <h2 className="font-['Beelzebrush_Black_BB'] text-3xl text-foreground">
                  {currentTier?.name ?? 'Bronze'} Member
                </h2>
                <p className="text-muted-foreground">
                  {currentTier?.discount_percentage}% discount on all purchases
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{points} points</span>
                {nextTier && (
                  <span className="text-muted-foreground">
                    {nextTier.min_points - points} points to {nextTier.name}
                  </span>
                )}
              </div>
              <Progress value={progressToNext} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Profile */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Email</label>
                <p className="text-foreground">{user?.email}</p>
              </div>
              {editing ? (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground">Display Name</label>
                    <Input value={editName} onChange={e => setEditName(e.target.value)} className="bg-muted border-border mt-1" />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <Input value={editPhone} onChange={e => setEditPhone(e.target.value)} className="bg-muted border-border mt-1" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleSave} size="sm">Save</Button>
                    <Button onClick={() => setEditing(false)} size="sm" variant="ghost">Cancel</Button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-sm text-muted-foreground">Display Name</label>
                    <p className="text-foreground">{profile?.display_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Phone</label>
                    <p className="text-foreground">{profile?.phone || 'Not set'}</p>
                  </div>
                  <Button onClick={() => setEditing(true)} size="sm" variant="outline">Edit Profile</Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* All Tiers */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Loyalty Tiers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tiers.map(tier => (
                <div
                  key={tier.id}
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    currentTier?.id === tier.id
                      ? 'border-primary/50 bg-primary/5'
                      : 'border-border bg-muted/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tierIcons[tier.name]}
                    <div>
                      <p className="font-medium text-foreground">{tier.name}</p>
                      <p className="text-xs text-muted-foreground">{tier.min_points} points</p>
                    </div>
                  </div>
                  <span className="font-['Beelzebrush_Black_BB'] text-xl text-primary">
                    {tier.discount_percentage}%
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Button onClick={handleSignOut} variant="ghost" className="text-muted-foreground hover:text-destructive">
            Sign Out
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Member;
