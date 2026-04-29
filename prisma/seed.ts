import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing data
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

  // Create Users (Clients)
  const client1 = await prisma.user.create({
    data: {
      name: 'Acme Corp',
      email: 'contact@acme.com',
      password: 'hashed_password', // Mocked
      role: 'CLIENT',
      bio: 'Innovative tech startup building the future.',
      location: 'San Francisco, CA'
    }
  })

  // Create Users (Freelancers)
  const freelancer1 = await prisma.user.create({
    data: {
      name: 'Aman Sharma',
      email: 'aman@example.com',
      password: 'hashed_password',
      role: 'FREELANCER',
      bio: 'Full-stack web developer with 5 years experience.',
      location: 'Remote'
    }
  })

  const freelancer2 = await prisma.user.create({
    data: {
      name: 'Riya Gupta',
      email: 'riya@example.com',
      password: 'hashed_password',
      role: 'FREELANCER',
      bio: 'UI/UX Designer and Frontend Specialist.',
      location: 'Remote'
    }
  })

  // Create Skills
  const skillReact = await prisma.skill.create({ data: { skillName: 'React', category: 'Frontend' } })
  const skillNode = await prisma.skill.create({ data: { skillName: 'Node.js', category: 'Backend' } })
  const skillFigma = await prisma.skill.create({ data: { skillName: 'Figma', category: 'Design' } })

  // Assign Skills to Freelancers
  await prisma.freelancerSkill.create({
    data: {
      userId: freelancer1.id,
      skillId: skillReact.id,
      proficiencyLevel: 5,
      experienceYears: 5
    }
  })

  await prisma.freelancerSkill.create({
    data: {
      userId: freelancer1.id,
      skillId: skillNode.id,
      proficiencyLevel: 4,
      experienceYears: 3
    }
  })

  await prisma.freelancerSkill.create({
    data: {
      userId: freelancer2.id,
      skillId: skillFigma.id,
      proficiencyLevel: 5,
      experienceYears: 4
    }
  })

  await prisma.freelancerSkill.create({
    data: {
      userId: freelancer2.id,
      skillId: skillReact.id,
      proficiencyLevel: 3,
      experienceYears: 2
    }
  })

  // Create Task
  const task1 = await prisma.task.create({
    data: {
      clientId: client1.id,
      title: 'Build a Modern Dashboard Web App',
      description: 'We need a React and Node.js expert to build a beautiful, responsive dashboard for our users.',
      budgetMin: 3000,
      budgetMax: 5000,
      deadline: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      status: 'OPEN'
    }
  })

  const task2 = await prisma.task.create({
    data: {
      clientId: client1.id,
      title: 'Design Landing Page in Figma',
      description: 'Looking for a talented designer to create a high-converting landing page.',
      budgetMin: 500,
      budgetMax: 1000,
      deadline: new Date(new Date().setDate(new Date().getDate() + 14)),
      status: 'OPEN'
    }
  })

  // Task Skills
  await prisma.taskSkill.create({
    data: { taskId: task1.id, skillId: skillReact.id, requiredLevel: 4 }
  })
  await prisma.taskSkill.create({
    data: { taskId: task1.id, skillId: skillNode.id, requiredLevel: 3 }
  })
  await prisma.taskSkill.create({
    data: { taskId: task2.id, skillId: skillFigma.id, requiredLevel: 4 }
  })

  // Match Scores (Simulating the Matching Engine Output)
  await prisma.matchScore.create({
    data: {
      taskId: task1.id,
      freelancerId: freelancer1.id,
      score: 92.5,
      matchedSkillsCount: 2,
      totalRequiredSkills: 2
    }
  })

  await prisma.matchScore.create({
    data: {
      taskId: task1.id,
      freelancerId: freelancer2.id,
      score: 45.0,
      matchedSkillsCount: 1,
      totalRequiredSkills: 2
    }
  })

  await prisma.matchScore.create({
    data: {
      taskId: task2.id,
      freelancerId: freelancer2.id,
      score: 95.0,
      matchedSkillsCount: 1,
      totalRequiredSkills: 1
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
