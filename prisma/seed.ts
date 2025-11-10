import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting MAJAZ database seed...')

  // Create demo user
  const hashedPassword = await bcrypt.hash('Demo123!@#', 10)

  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@majaz.ae' },
    update: {},
    create: {
      email: 'demo@majaz.ae',
      name: 'Ahmed Al Maktoum',
      phone: '+971501234567',
      password: hashedPassword,
      locale: 'en',
      countryPref: 'UAE',
      emailVerified: new Date()
    }
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create team members (inspectors and operators)
  const teamMembers = [
    {
      name: 'Mohammed Al Rashid',
      nameAr: 'محمد الراشد',
      role: 'INSPECTOR' as const,
      title: 'Senior Vehicle Inspector',
      titleAr: 'مفتش مركبات أول',
      bio: 'ASE Certified Master Technician with 15 years of experience in luxury vehicle inspection. Specializes in European and Japanese luxury brands.',
      bioAr: 'فني معتمد ASE مع 15 عاماً من الخبرة في فحص المركبات الفاخرة. متخصص في العلامات التجارية الأوروبية واليابانية الفاخرة.',
      email: 'mohammed@majaz.ae',
      phone: '+971501111111',
      location: 'Dubai',
      inspectionsCompleted: 847,
      rating: 4.96,
      image: '/images/team/inspector-1.jpg',
      active: true
    },
    {
      name: 'Fatima Hassan',
      nameAr: 'فاطمة حسن',
      role: 'INSPECTOR' as const,
      title: 'Luxury Vehicle Specialist',
      titleAr: 'أخصائية المركبات الفاخرة',
      bio: 'Former dealership service manager with expertise in high-end SUVs and sports cars. Certified in paint thickness analysis and structural inspection.',
      bioAr: 'مديرة خدمة وكالة سابقة مع خبرة في سيارات الدفع الرباعي الفاخرة والسيارات الرياضية. معتمدة في تحليل سمك الطلاء وفحص الهيكل.',
      email: 'fatima@majaz.ae',
      phone: '+971501111112',
      location: 'Dubai',
      inspectionsCompleted: 623,
      rating: 4.98,
      image: '/images/team/inspector-2.jpg',
      active: true
    },
    {
      name: 'Omar Abdullah',
      nameAr: 'عمر عبدالله',
      role: 'OPERATOR' as const,
      title: 'Assessment Coordinator',
      titleAr: 'منسق التقييم',
      bio: 'Manages assessment operations and client communications. Expert in UAE automotive market dynamics and auction strategies.',
      bioAr: 'يدير عمليات التقييم واتصالات العملاء. خبير في ديناميكيات سوق السيارات في الإمارات واستراتيجيات المزادات.',
      email: 'omar@majaz.ae',
      phone: '+971501111113',
      location: 'Dubai',
      inspectionsCompleted: 1240,
      rating: 4.95,
      image: '/images/team/operator-1.jpg',
      active: true
    },
    {
      name: 'Sara Al Mansouri',
      nameAr: 'سارة المنصوري',
      role: 'ADMIN' as const,
      title: 'Operations Manager',
      titleAr: 'مديرة العمليات',
      bio: 'Oversees all MAJAZ operations with a focus on quality assurance and client satisfaction. MBA in Operations Management.',
      bioAr: 'تشرف على جميع عمليات مجاز مع التركيز على ضمان الجودة ورضا العملاء. ماجستير إدارة أعمال في إدارة العمليات.',
      email: 'sara@majaz.ae',
      phone: '+971501111114',
      location: 'Dubai',
      inspectionsCompleted: 312,
      rating: 4.99,
      image: '/images/team/admin-1.jpg',
      active: true
    },
    {
      name: 'Khalid Ibrahim',
      nameAr: 'خالد إبراهيم',
      role: 'INSPECTOR' as const,
      title: 'Mechanical Systems Expert',
      titleAr: 'خبير الأنظمة الميكانيكية',
      bio: 'Specialized in engine diagnostics, transmission systems, and performance analysis. 12 years with premium automotive brands.',
      bioAr: 'متخصص في تشخيص المحرك، أنظمة النقل، وتحليل الأداء. 12 عاماً مع العلامات التجارية الممتازة للسيارات.',
      email: 'khalid@majaz.ae',
      phone: '+971501111115',
      location: 'Abu Dhabi',
      inspectionsCompleted: 534,
      rating: 4.94,
      image: '/images/team/inspector-3.jpg',
      active: true
    },
    {
      name: 'Layla Ahmed',
      nameAr: 'ليلى أحمد',
      role: 'INSPECTOR' as const,
      title: 'Exotic & Sports Car Specialist',
      titleAr: 'أخصائية السيارات الرياضية والنادرة',
      bio: 'Expert in high-performance and exotic vehicles. Trained in Italy and Germany with supercar manufacturers.',
      bioAr: 'خبيرة في المركبات عالية الأداء والنادرة. تدربت في إيطاليا وألمانيا مع مصنعي السيارات الخارقة.',
      email: 'layla@majaz.ae',
      phone: '+971501111116',
      location: 'Dubai',
      inspectionsCompleted: 289,
      rating: 4.97,
      image: '/images/team/inspector-4.jpg',
      active: true
    }
  ]

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: member,
      create: member
    })
    console.log(`✅ Created team member: ${member.name}`)
  }

  console.log('🎉 Seed completed successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
