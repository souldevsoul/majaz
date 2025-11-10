'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

type Role = 'all' | 'leadership' | 'inspection' | 'support';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: Role;
  image: string;
  specialization: string;
}

export default function TeamListPage() {
  const t = useTranslations('team');
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const [selectedRole, setSelectedRole] = useState<Role>('all');

  // Mock team data - in production, this would come from API/database
  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      role: 'Chief Executive Officer',
      department: 'leadership',
      image: '/images/team/member-1.jpg',
      specialization: 'Business Strategy & Operations',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Head of Inspections',
      department: 'leadership',
      image: '/images/team/member-2.jpg',
      specialization: 'Automotive Engineering',
    },
    {
      id: '3',
      name: 'Mohammed Al-Rashid',
      role: 'Senior Vehicle Inspector',
      department: 'inspection',
      image: '/images/team/member-3.jpg',
      specialization: 'Luxury Vehicles',
    },
    {
      id: '4',
      name: 'Emily Chen',
      role: 'Senior Vehicle Inspector',
      department: 'inspection',
      image: '/images/team/member-4.jpg',
      specialization: 'Electric & Hybrid Systems',
    },
    {
      id: '5',
      name: 'Fatima Al-Zaabi',
      role: 'Customer Success Manager',
      department: 'support',
      image: '/images/team/member-5.jpg',
      specialization: 'Client Relations',
    },
    {
      id: '6',
      name: 'David Thompson',
      role: 'Technical Support Specialist',
      department: 'support',
      image: '/images/team/member-6.jpg',
      specialization: 'Diagnostics & Reporting',
    },
  ];

  const roles: Role[] = ['all', 'leadership', 'inspection', 'support'];

  const roleIcons: Record<Role, string> = {
    all: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    leadership: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z',
    inspection: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
    support: 'M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z',
  };

  const filteredMembers = selectedRole === 'all'
    ? teamMembers
    : teamMembers.filter((member) => member.department === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
            {t('title')}
          </h1>
          <p className="text-xl text-ivory/70 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Role Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedRole === role
                  ? 'bg-gold text-black shadow-lg shadow-gold/30'
                  : 'bg-black/40 backdrop-blur-md text-ivory/70 hover:text-ivory border border-gold/20'
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={roleIcons[role]} />
              </svg>
              {t(`filters.${role}`)}
            </button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredMembers.map((member, index) => (
            <GlassCard
              key={member.id}
              className="overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-gold/20"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Link href={`/${locale}/team-single/${member.id}`}>
                <div className="relative h-64 bg-gray-800">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
                  {/* Placeholder for team member image */}
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gold/20 to-black/40">
                    <svg className="w-24 h-24 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-ivory mb-2">
                    {member.name}
                  </h3>
                  <div className="text-gold font-semibold mb-3">
                    {member.role}
                  </div>
                  <div className="flex items-center gap-2 text-ivory/60 text-sm mb-4">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {member.specialization}
                  </div>

                  <div className="flex items-center gap-2 text-gold hover:text-gold/80 transition-colors group">
                    <span className="font-semibold">{t('view_profile')}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              </Link>
            </GlassCard>
          ))}
        </div>

        {/* Empty State */}
        {filteredMembers.length === 0 && (
          <div className="text-center py-16">
            <GlassCard className="max-w-md mx-auto p-12">
              <svg className="w-16 h-16 text-gold/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <p className="text-ivory/70 text-lg">
                {t('no_members')}
              </p>
            </GlassCard>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <GlassCard className="p-12 text-center">
            <h2 className="font-playfair text-4xl font-bold text-ivory mb-4">
              {t('cta.title')}
            </h2>
            <p className="text-xl text-ivory/70 mb-8 max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/booking`}>
                <Button variant="primary" size="lg">
                  {t('cta.button_primary')}
                </Button>
              </Link>
              <Link href={`/${locale}/contact`}>
                <Button variant="secondary" size="lg">
                  {t('cta.button_secondary')}
                </Button>
              </Link>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
