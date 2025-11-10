'use client';

import { useTranslations, useLocale } from 'next-intl';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassCard from '@/components/majaz/GlassCard';
import Button from '@/components/majaz/Button';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  image: string;
  specialization: string;
  bio: string;
  email: string;
  phone: string;
  linkedin: string;
  stats: {
    experience: string;
    inspections: string;
    rating: string;
  };
  expertise: string[];
  certifications: string[];
}

// Mock data - in production, this would come from API/database
const getTeamMember = (id: string): TeamMember | null => {
  const members: Record<string, TeamMember> = {
    '1': {
      id: '1',
      name: 'Ahmed Al-Mansouri',
      role: 'Chief Executive Officer',
      department: 'Leadership',
      image: '/images/team/member-1.jpg',
      specialization: 'Business Strategy & Operations',
      bio: 'Ahmed brings over 15 years of experience in the automotive industry, with a proven track record in building successful vehicle assessment businesses across the Middle East. His vision has transformed Majaz into the leading luxury vehicle assessment service in the UAE.',
      email: 'ahmed@majaz.ae',
      phone: '+971 50 123 4567',
      linkedin: 'https://linkedin.com/in/ahmed-almansouri',
      stats: {
        experience: '15+ Years',
        inspections: '5,000+',
        rating: '4.9/5.0',
      },
      expertise: ['Business Strategy', 'Operations Management', 'Client Relations', 'Market Analysis'],
      certifications: ['MBA - Harvard Business School', 'Certified Automotive Executive', 'ISO 9001 Lead Auditor'],
    },
    '2': {
      id: '2',
      name: 'Sarah Johnson',
      role: 'Head of Inspections',
      department: 'Leadership',
      image: '/images/team/member-2.jpg',
      specialization: 'Automotive Engineering',
      bio: 'Sarah is a certified automotive engineer with extensive experience in luxury vehicle diagnostics and quality assurance. She leads our inspection team with precision and dedication to excellence.',
      email: 'sarah@majaz.ae',
      phone: '+971 50 123 4568',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      stats: {
        experience: '12+ Years',
        inspections: '8,500+',
        rating: '5.0/5.0',
      },
      expertise: ['Automotive Engineering', 'Quality Assurance', 'Team Leadership', 'Advanced Diagnostics'],
      certifications: ['ASE Master Technician', 'Automotive Engineering Degree', 'Luxury Vehicle Specialist'],
    },
    '3': {
      id: '3',
      name: 'Mohammed Al-Rashid',
      role: 'Senior Vehicle Inspector',
      department: 'Inspection',
      image: '/images/team/member-3.jpg',
      specialization: 'Luxury Vehicles',
      bio: 'Mohammed specializes in luxury and exotic vehicles, with deep expertise in European and premium Asian brands. His attention to detail ensures no issue goes unnoticed.',
      email: 'mohammed@majaz.ae',
      phone: '+971 50 123 4569',
      linkedin: 'https://linkedin.com/in/mohammed-alrashid',
      stats: {
        experience: '10+ Years',
        inspections: '6,200+',
        rating: '4.9/5.0',
      },
      expertise: ['Luxury Vehicles', 'Exotic Cars', 'European Brands', 'Performance Diagnostics'],
      certifications: ['Porsche Certified Technician', 'Mercedes-Benz Master Tech', 'BMW Specialist'],
    },
    '4': {
      id: '4',
      name: 'Emily Chen',
      role: 'Senior Vehicle Inspector',
      department: 'Inspection',
      image: '/images/team/member-4.jpg',
      specialization: 'Electric & Hybrid Systems',
      bio: 'Emily is our electric and hybrid vehicle specialist, bringing cutting-edge knowledge of modern automotive technology and sustainable transportation systems.',
      email: 'emily@majaz.ae',
      phone: '+971 50 123 4570',
      linkedin: 'https://linkedin.com/in/emily-chen',
      stats: {
        experience: '8+ Years',
        inspections: '4,100+',
        rating: '5.0/5.0',
      },
      expertise: ['Electric Vehicles', 'Hybrid Systems', 'Battery Diagnostics', 'Charging Infrastructure'],
      certifications: ['Tesla Certified Technician', 'EV Safety Specialist', 'High Voltage Systems Expert'],
    },
    '5': {
      id: '5',
      name: 'Fatima Al-Zaabi',
      role: 'Customer Success Manager',
      department: 'Support',
      image: '/images/team/member-5.jpg',
      specialization: 'Client Relations',
      bio: 'Fatima ensures every client receives exceptional service throughout their assessment journey. Her commitment to customer satisfaction has earned Majaz numerous 5-star reviews.',
      email: 'fatima@majaz.ae',
      phone: '+971 50 123 4571',
      linkedin: 'https://linkedin.com/in/fatima-alzaabi',
      stats: {
        experience: '7+ Years',
        inspections: '3,800+',
        rating: '5.0/5.0',
      },
      expertise: ['Customer Service', 'Relationship Management', 'Conflict Resolution', 'Service Excellence'],
      certifications: ['Customer Success Professional', 'Service Excellence Award', 'Bilingual Communication Expert'],
    },
    '6': {
      id: '6',
      name: 'David Thompson',
      role: 'Technical Support Specialist',
      department: 'Support',
      image: '/images/team/member-6.jpg',
      specialization: 'Diagnostics & Reporting',
      bio: 'David manages our technical documentation and reporting systems, ensuring every assessment report is comprehensive, accurate, and easy to understand.',
      email: 'david@majaz.ae',
      phone: '+971 50 123 4572',
      linkedin: 'https://linkedin.com/in/david-thompson',
      stats: {
        experience: '9+ Years',
        inspections: '5,500+',
        rating: '4.8/5.0',
      },
      expertise: ['Technical Documentation', 'Data Analysis', 'Quality Control', 'Report Generation'],
      certifications: ['Technical Writing Professional', 'Data Analytics Certified', 'ISO Documentation Specialist'],
    },
  };

  return members[id] || null;
};

export default function TeamSinglePage({ params }: { params: Promise<{ id: string; locale: string }> }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const t = useTranslations('team_single');
  const locale = useLocale();
  const isRTL = locale === 'ar';

  const member = getTeamMember(id);

  if (!member) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20 flex items-center justify-center" dir={isRTL ? 'rtl' : 'ltr'}>
        <GlassCard className="max-w-md p-12 text-center">
          <svg className="w-16 h-16 text-gold/40 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="font-playfair text-2xl font-bold text-ivory mb-4">{t('not_found.title')}</h2>
          <p className="text-ivory/70 mb-6">{t('not_found.description')}</p>
          <Link href={`/${locale}/team-list`}>
            <Button variant="primary" size="lg">
              {t('not_found.back_button')}
            </Button>
          </Link>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black py-20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link href={`/${locale}/team-list`} className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t('back_to_team')}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <GlassCard className="p-6 sticky top-24">
              {/* Profile Image */}
              <div className="relative h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-gold/20 to-black/40">
                <div className="w-full h-full flex items-center justify-center">
                  <svg className="w-32 h-32 text-gold/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Name and Role */}
              <h1 className="font-playfair text-3xl font-bold text-ivory mb-2">
                {member.name}
              </h1>
              <div className="text-gold font-semibold text-lg mb-4">
                {member.role}
              </div>
              <div className="flex items-center gap-2 text-ivory/60 text-sm mb-6 pb-6 border-b border-gold/20">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                {member.specialization}
              </div>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <a href={`mailto:${member.email}`} className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{member.email}</span>
                </a>
                <a href={`tel:${member.phone}`} className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{member.phone}</span>
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-ivory/80 hover:text-gold transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
              </div>

              {/* CTA */}
              <Link href={`/${locale}/booking`}>
                <Button variant="primary" size="md" className="w-full">
                  {t('book_inspection')}
                </Button>
              </Link>
            </GlassCard>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2 font-playfair">
                  {member.stats.experience}
                </div>
                <div className="text-ivory/70 text-sm">{t('stats.experience')}</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2 font-playfair">
                  {member.stats.inspections}
                </div>
                <div className="text-ivory/70 text-sm">{t('stats.inspections')}</div>
              </GlassCard>
              <GlassCard className="p-6 text-center">
                <div className="text-3xl font-bold text-gold mb-2 font-playfair">
                  {member.stats.rating}
                </div>
                <div className="text-ivory/70 text-sm">{t('stats.rating')}</div>
              </GlassCard>
            </div>

            {/* Bio */}
            <GlassCard className="p-8">
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-6">
                {t('bio.title')}
              </h2>
              <p className="text-ivory/80 leading-relaxed text-lg">
                {member.bio}
              </p>
            </GlassCard>

            {/* Expertise */}
            <GlassCard className="p-8">
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-6">
                {t('expertise.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {member.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gold/10 border border-gold/20">
                    <svg className="w-5 h-5 text-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-ivory">{skill}</span>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Certifications */}
            <GlassCard className="p-8">
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-6">
                {t('certifications.title')}
              </h2>
              <div className="space-y-4">
                {member.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-black/20 border border-gold/10">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <div className="text-ivory font-semibold">{cert}</div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
