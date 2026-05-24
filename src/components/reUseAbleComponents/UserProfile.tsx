/* eslint-disable @next/next/no-img-element */
'use client';

import { useEffect, useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useGetMyPatientProfilesQuery } from '@/redux/api/patient.api';
import { IPatient } from '@/types/patient';
import { setSelectedPatient } from '@/redux/features/auth/patientSlice';
import { useAppDispatch } from '@/redux/hooks';

const STORAGE_KEY = 'selectedPatientId';

/* UI Type */
interface ProfileUser {
  id: string;
  name: string;
  relation: string;
  age: number;
  avatar: string;
}

export default function ProfileSelectDropdown() {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<ProfileUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ProfileUser | null>(null);

  const { data, isLoading, isError } = useGetMyPatientProfilesQuery({});
  const dispatch = useAppDispatch();

  /* convert API → UI */
  useEffect(() => {
    if (!data?.data) return;

    const mappedUsers: ProfileUser[] = data.data.map((patient: IPatient) => ({
      id: patient.id,
      name: patient.name,
      relation: patient.relationship,
      age: patient.age ?? 0,
      avatar:
        patient.profilePhoto ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          patient.name,
        )}&background=random`,
    }));

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUsers(mappedUsers);

    /* restore from localStorage */
    const savedId = localStorage.getItem(STORAGE_KEY);

    if (savedId) {
      const foundUser = mappedUsers.find((u: ProfileUser) => u.id === savedId);
      if (foundUser) {
        setSelectedUser(foundUser);
        window.dispatchEvent(
          new CustomEvent('selectedPatientChanged', { detail: foundUser.id }),
        );
        return;
      }
    }

    /* default select first */
    if (mappedUsers.length > 0) {
      const first = mappedUsers[0];
      setSelectedUser(first);
      localStorage.setItem(STORAGE_KEY, first.id);
      window.dispatchEvent(
        new CustomEvent('selectedPatientChanged', { detail: first.id }),
      );
    }
  }, [data]);

  /* save to localStorage when changed */
  useEffect(() => {
    if (selectedUser?.id) {
      localStorage.setItem(STORAGE_KEY, selectedUser.id);
      dispatch(setSelectedPatient(selectedUser?.id));
    }
  }, [dispatch, selectedUser]);

  /* loading */
  if (isLoading) {
    return <div className="p-4 text-center">Loading profiles...</div>;
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-red-500">
        Failed to load profiles
      </div>
    );
  }

  if (!selectedUser) {
    return <div className="p-4 text-center">No profiles found</div>;
  }

  return (
    <div className="relative w-full">
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer rounded-xl bg-muted p-4 shadow-md hover:shadow-lg transition flex flex-col items-center">
        {open ? (
          <ChevronUp className="h-4 w-4 text-gray-400 mb-2" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-400 mb-2" />
        )}

        <div className="relative">
          <img
            src={selectedUser.avatar}
            alt={selectedUser.name}
            className="w-16 h-16 rounded-full object-cover"
          />

          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {selectedUser.age}
          </span>
        </div>

        <p className="text-sm font-semibold capitalize mt-2">
          {selectedUser.name}
        </p>

        <p className="text-xs capitalize font-medium text-secondary">
          ({selectedUser.relation})
        </p>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute bottom-full mb-2 w-full bg-white border rounded-xl shadow-lg z-50">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => {
                setSelectedUser(user);
                localStorage.setItem(STORAGE_KEY, user.id); // save immediately
                window.dispatchEvent(
                  new CustomEvent('selectedPatientChanged', { detail: user.id }),
                );
                setOpen(false);
              }}
              className="flex items-center p-3 hover:bg-gray-100 cursor-pointer">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />

              <div className="flex flex-col ml-4">
                <p className="text-sm font-medium capitalize">{user.name}</p>

                <p className="text-xs capitalize font-medium text-secondary">
                  ({user.relation})
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
