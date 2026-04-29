import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data (in order of dependencies)
  console.log('Cleaning database...')
  await prisma.matchScore.deleteMany()
  await prisma.review.deleteMany()
  await prisma.invitation.deleteMany()
  await prisma.application.deleteMany()
  await prisma.taskSkill.deleteMany()
  await prisma.task.deleteMany()
  await prisma.freelancerSkill.deleteMany()
  await prisma.skill.deleteMany()
  await prisma.portfolio.deleteMany()
  await prisma.user.deleteMany()

  // Create Skills
  console.log('Creating skills...')
  const skillReact = await prisma.skill.create({ data: { skillName: 'React', category: 'Frontend' } })
  const skillNode = await prisma.skill.create({ data: { skillName: 'Node.js', category: 'Backend' } })
  const skillFigma = await prisma.skill.create({ data: { skillName: 'Figma', category: 'Design' } })
  const skillNext = await prisma.skill.create({ data: { skillName: 'Next.js', category: 'Frontend' } })
  const skillPostgres = await prisma.skill.create({ data: { skillName: 'PostgreSQL', category: 'Database' } })
  const skillPython = await prisma.skill.create({ data: { skillName: 'Python', category: 'Backend' } })

  // Create Clients
  console.log('Creating clients...')
  const client1 = await prisma.user.create({
    data: {
      name: 'TechFlow Systems',
      email: 'contact@techflow.com',
      password: 'hashed_password_1',
      role: 'CLIENT',
      bio: 'Leading SaaS provider for workflow automation.',
      location: 'Bangalore, India'
    }
  })

  const client2 = await prisma.user.create({
    data: {
      name: 'Creative Studio X',
      email: 'hello@creativestudio.com',
      password: 'hashed_password_2',
      role: 'CLIENT',
      bio: 'Award-winning digital agency focused on premium branding.',
      location: 'Mumbai, India'
    }
  })

  // Create Freelancers (4 as requested)
  console.log('Creating freelancers...')
  const freelancer1 = await prisma.user.create({
    data: {
      name: 'Aman Sharma',
      email: 'aman@example.com',
      password: 'hashed_password_3',
      role: 'FREELANCER',
      bio: 'Senior Full-stack Developer specializing in React, Node, and Postgres. I build scalable web applications with high performance.',
      location: 'Delhi, India',
      portfolios: {
        create: [
          { title: 'E-commerce Platform', description: 'Built a full-scale e-commerce app with Next.js and Stripe.', projectLink: 'https://github.com' },
          { title: 'Real-time Chat', description: 'Websocket based chat application using Node.js.', projectLink: 'https://github.com' }
        ]
      }
    }
  })

  const freelancer2 = await prisma.user.create({
    data: {
      name: 'Riya Gupta',
      email: 'riya@example.com',
      password: 'hashed_password_4',
      role: 'FREELANCER',
      bio: 'UI/UX Designer and Frontend Specialist. Passionate about creating beautiful, accessible, and user-centric interfaces.',
      location: 'Remote',
      portfolios: {
        create: [
          { title: 'Fintech Mobile App', description: 'UI/UX design for a modern banking application.', projectLink: 'https://figma.com' }
        ]
      }
    }
  })

  const freelancer3 = await prisma.user.create({
    data: {
      name: 'Vikram Singh',
      email: 'vikram@example.com',
      password: 'hashed_password_5',
      role: 'FREELANCER',
      bio: 'Python and Backend Architect. Expert in data processing, API design, and cloud infrastructure management.',
      location: 'Pune, India'
    }
  })

  const freelancer4 = await prisma.user.create({
    data: {
      name: 'Priya Verma',
      email: 'priya@example.com',
      password: 'hashed_password_6',
      role: 'FREELANCER',
      bio: 'Next.js and Tailwind CSS expert. I transform complex designs into pixel-perfect, responsive web experiences.',
      location: 'Hyderabad, India'
    }
  })

  // Assign Skills to Freelancers
  console.log('Assigning skills to freelancers...')
  // Aman
  await prisma.freelancerSkill.create({ data: { userId: freelancer1.id, skillId: skillReact.id, proficiencyLevel: 5, experienceYears: 4 } })
  await prisma.freelancerSkill.create({ data: { userId: freelancer1.id, skillId: skillNode.id, proficiencyLevel: 5, experienceYears: 3 } })
  await prisma.freelancerSkill.create({ data: { userId: freelancer1.id, skillId: skillPostgres.id, proficiencyLevel: 4, experienceYears: 2 } })
  
  // Riya
  await prisma.freelancerSkill.create({ data: { userId: freelancer2.id, skillId: skillFigma.id, proficiencyLevel: 5, experienceYears: 5 } })
  await prisma.freelancerSkill.create({ data: { userId: freelancer2.id, skillId: skillReact.id, proficiencyLevel: 3, experienceYears: 2 } })
  
  // Vikram
  await prisma.freelancerSkill.create({ data: { userId: freelancer3.id, skillId: skillPython.id, proficiencyLevel: 5, experienceYears: 6 } })
  await prisma.freelancerSkill.create({ data: { userId: freelancer3.id, skillId: skillPostgres.id, proficiencyLevel: 5, experienceYears: 4 } })
  
  // Priya
  await prisma.freelancerSkill.create({ data: { userId: freelancer4.id, skillId: skillNext.id, proficiencyLevel: 5, experienceYears: 3 } })
  await prisma.freelancerSkill.create({ data: { userId: freelancer4.id, skillId: skillReact.id, proficiencyLevel: 4, experienceYears: 3 } })

  // Create Tasks
  console.log('Creating tasks...')
  const task1 = await prisma.task.create({
    data: {
      clientId: client1.id,
      title: 'Full-stack Dashboard Development',
      description: 'We need a robust dashboard built with React and Node.js for our new automation tool. Requires deep knowledge of relational databases.',
      budgetMin: 2500,
      budgetMax: 4500,
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      status: 'OPEN',
      taskSkills: {
        create: [
          { skillId: skillReact.id, requiredLevel: 4 },
          { skillId: skillNode.id, requiredLevel: 4 },
          { skillId: skillPostgres.id, requiredLevel: 3 }
        ]
      }
    }
  })

  const task2 = await prisma.task.create({
    data: {
      clientId: client2.id,
      title: 'Premium Brand Identity & Figma Design',
      description: 'Looking for a top-tier designer to create our new brand guidelines and a complete high-fidelity Figma prototype for our website.',
      budgetMin: 1500,
      budgetMax: 3000,
      deadline: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
      status: 'OPEN',
      taskSkills: {
        create: [
          { skillId: skillFigma.id, requiredLevel: 5 }
        ]
      }
    }
  })

  const task3 = await prisma.task.create({
    data: {
      clientId: client1.id,
      title: 'Data Migration Pipeline in Python',
      description: 'We are moving our legacy data to PostgreSQL and need a high-performance migration script written in Python.',
      budgetMin: 1000,
      budgetMax: 2000,
      deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'OPEN',
      taskSkills: {
        create: [
          { skillId: skillPython.id, requiredLevel: 5 },
          { skillId: skillPostgres.id, requiredLevel: 4 }
        ]
      }
    }
  })

  // Create Match Scores (Simulated Engine Output)
  console.log('Simulating matching engine...')
  await prisma.matchScore.create({
    data: { taskId: task1.id, freelancerId: freelancer1.id, score: 95.5, matchedSkillsCount: 3, totalRequiredSkills: 3 }
  })
  await prisma.matchScore.create({
    data: { taskId: task1.id, freelancerId: freelancer4.id, score: 72.0, matchedSkillsCount: 2, totalRequiredSkills: 3 }
  })
  await prisma.matchScore.create({
    data: { taskId: task2.id, freelancerId: freelancer2.id, score: 98.0, matchedSkillsCount: 1, totalRequiredSkills: 1 }
  })
  await prisma.matchScore.create({
    data: { taskId: task3.id, freelancerId: freelancer3.id, score: 99.5, matchedSkillsCount: 2, totalRequiredSkills: 2 }
  })

  console.log('Database seeded successfully with 4 freelancers and comprehensive data!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
