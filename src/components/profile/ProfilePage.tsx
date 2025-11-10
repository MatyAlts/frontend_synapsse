"use client";
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { UserProfile } from '@/redux/types';
import ProfileCard from './ProfileCard';
import SecurityCard from './SecurityCard';
import { authService } from '@/services/authService';
import { userService } from '@/services/userService';
import { ApiException } from '@/services/api';

const EMPTY_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  province: '',
  zipCode: '',
};

type NotificationState = { type: 'success' | 'error'; message: string } | null;

const ProfilePage: React.FC = () => {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState<NotificationState>(null);
  const [userProfile, setUserProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const originalProfile = useRef<UserProfile | null>(null);

  useEffect(() => {
    const token = authService.getToken();
    if (!token) {
      router.push('/login?redirect=/profile');
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const profile = await userService.getProfile();
        setUserProfile(profile);
      } catch (error) {
        if (error instanceof ApiException && (error.status === 401 || error.status === 403)) {
          authService.logout();
          router.push('/login?redirect=/profile');
          return;
        }
        const message = error instanceof Error ? error.message : 'No pudimos cargar tus datos.';
        setNotification({ type: 'error', message });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  useEffect(() => {
    if (!notification) return;
    const timeout = setTimeout(() => setNotification(null), 4000);
    return () => clearTimeout(timeout);
  }, [notification]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleStartEditing = () => {
    originalProfile.current = { ...userProfile };
    setIsEditing(true);
  };

  const handleCancelEditing = () => {
    if (originalProfile.current) {
      setUserProfile(originalProfile.current);
    }
    setIsEditing(false);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const updated = await userService.updateProfile({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        phone: userProfile.phone,
        address: userProfile.address,
        city: userProfile.city,
        province: userProfile.province,
        zipCode: userProfile.zipCode,
      });
      setUserProfile(updated);
      const storedUser = authService.getUser();
      if (storedUser) {
        authService.saveUser({
          ...storedUser,
          firstName: updated.firstName,
          lastName: updated.lastName,
          phone: updated.phone,
          address: updated.address,
          city: updated.city,
          province: updated.province,
          postalCode: updated.zipCode,
        });
        window.dispatchEvent(new Event('user-logged-in'));
      }
      setIsEditing(false);
      setNotification({ type: 'success', message: 'Tus datos fueron actualizados correctamente.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'No pudimos actualizar tu perfil.';
      setNotification({ type: 'error', message });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordSuccess = (message: string) => {
    setNotification({ type: 'success', message });
  };

  const handlePasswordError = (message: string) => {
    setNotification({ type: 'error', message });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[url('/plant.png')] bg-cover flex items-center justify-center">
        <div className="rounded-3xl bg-white/80 px-8 py-6 shadow-lg">
          <p className="text-lg text-gray-700">Cargando tu información...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url('/plant.png')] bg-cover">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-light text-gray-800 mb-2">Mi Cuenta</h2>
          <p className="text-gray-500 text-lg font-light">Gestiona tu información personal.</p>
        </div>

        {notification && (
          <div
            className={`rounded-2xl border px-4 py-3 text-sm sm:text-base ${
              notification.type === 'success'
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-red-200 bg-red-50 text-red-700'
            }`}
          >
            {notification.message}
          </div>
        )}

        <ProfileCard
          userProfile={userProfile}
          isEditing={isEditing}
          onEdit={handleStartEditing}
          onCancel={handleCancelEditing}
          handleInputChange={handleInputChange}
          handleSaveProfile={handleSaveProfile}
          isSaving={isSaving}
        />

        <SecurityCard onSuccess={handlePasswordSuccess} onError={handlePasswordError} />

        <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-3xl border border-green-200 p-6 text-center text-sm text-green-800">
          🌿 Mantené tu información actualizada para recibir tus productos sin inconvenientes.
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
