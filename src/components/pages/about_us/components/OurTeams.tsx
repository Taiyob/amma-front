'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useGetAllTeamsQuery } from '@/redux/api/team.api';
import { ITeamMember } from '@/types/team.type';

const TeamMemberCard = ({ member, index }: { member: ITeamMember; index: number }) => {

  return (
    <div className="group overflow-hidden">
      <div className="relative h-96 w-full overflow-hidden rounded-md transition-all duration-500 group-hover:rounded-xl">
        <Image
          className="h-full w-full object-cover object-top grayscale transition-all duration-500 hover:grayscale-0"
          src={member.image}
          alt={member.name}
          width="826"
          height="1239"
          sizes="(max-width: 768px) 100vw, 280px"
        />
      </div>
      <div className="px-2 pt-4">
        <div className="flex justify-between">
          <h3 className="text-base font-medium transition-all duration-500 group-hover:tracking-wider">
            {member.name}
          </h3>
          <span className="text-xs">_0{index + 1}</span>
        </div>

        <div className="mt-1 flex items-center justify-between">
          <span className="inline-block text-sm text-gray-600 dark:text-gray-400">
            {member.designation}
          </span>
          <Link
            href={`mailto:${member.email}`}
            className="text-primary-600 dark:text-primary-400 text-sm tracking-wide hover:underline transition-all duration-500">
            Contact
          </Link>
        </div>

        <div className="mt-2 text-sm text-gray-500 transition-opacity duration-500">
          <p>
            {member.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function TeamSection() {
  const { data, isLoading, isError } = useGetAllTeamsQuery({});
  const teams: ITeamMember[] = data?.data 
    ? [...data.data].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : [];

  if (isLoading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-40 items-center justify-center text-red-500">
        Failed to load team members. Please try again later.
      </div>
    );
  }

  return (
    <section className="py-16 md:py-20 dark:bg-transparent">
      <div className="mx-auto max-w-7xl px-6">

          {/* <h2 className="text-3xl font-bold sm:text-4xl capitalize text-center">
              Our Leadership Team
          </h2> */}

              <h2 className="text-3xl md:text-4xl capitalize text-center lg:text-5xl font-bold text-gray-900 tracking-tight">
              Our Leadership Team
              </h2>
      
        <div className="mt-12 md:mt-24">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {teams.map((member, index) => (
              <TeamMemberCard key={member.id || index} member={member} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


