/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout, setLastActivity } from '@/redux/features/auth/authSlice';
import { useLogoutUserMutation } from '@/redux/features/auth/auth.api';
import { useRouter } from 'next/navigation';

const IdleLogoutManager = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const lastActivity = useAppSelector((state) => state.auth.lastActivity);
  const [logoutUser] = useLogoutUserMutation();

  // 1 minutes for testing
  // const timeout = 1 * 60 * 1000;

  // 10 minutes (10 * 60 * 1000 ms) as per client requirement
  const timeout = 10 * 60 * 1000;

  const handleOnIdle = async () => {
    if (user) {
      console.log('User is idle. Logging out...');
      try {
        await logoutUser({}).unwrap();
        console.log('Logout API called successfully.');
      } catch (error) {
        console.error('Failed to call logout API:', error);
      } finally {
        dispatch(logout());
        console.log('Redux state cleared. Redirecting to login...');
        router.push('/login');
      }
    }
  };

  // Check last activity on mount to detect if browser was closed for too long
  useEffect(() => {
    if (user && lastActivity) {
      const now = Date.now();
      if (now - lastActivity > timeout) {
        console.log('Session expired due to inactivity while site was closed.');
        handleOnIdle();
      }
    }
  }, [user, lastActivity]);

  const handleOnAction = () => {
    if (user) {
      dispatch(setLastActivity(Date.now()));
    }
  };

  useIdleTimer({
    timeout,
    onIdle: handleOnIdle,
    onAction: handleOnAction,
    debounce: 500,
  });

  return null;
};

export default IdleLogoutManager;
