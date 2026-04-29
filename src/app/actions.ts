"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Hardcoded IDs for demonstration purposes based on the seed data
const DEMO_CLIENT_EMAIL = "contact@acme.com";
const DEMO_FREELANCER_EMAIL = "aman@example.com";

export async function createNewTask(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const budgetMin = parseFloat(formData.get("budgetMin") as string);
  const budgetMax = parseFloat(formData.get("budgetMax") as string);
  const skillId = formData.get("skillId") as string;

  const client = await prisma.user.findUnique({
    where: { email: DEMO_CLIENT_EMAIL },
  });

  if (!client) throw new Error("Demo client not found");

  const newTask = await prisma.task.create({
    data: {
      clientId: client.id,
      title,
      description,
      budgetMin,
      budgetMax,
      status: "OPEN",
      taskSkills: {
        create: {
          skillId: skillId,
          requiredLevel: 3, // Defaulting to intermediate level for demo
        }
      }
    },
  });

  revalidatePath("/tasks");
  revalidatePath("/client/dashboard");
  redirect("/client/dashboard");
}

export async function applyForTask(taskId: string) {
  const freelancer = await prisma.user.findUnique({
    where: { email: DEMO_FREELANCER_EMAIL },
  });

  if (!freelancer) throw new Error("Demo freelancer not found");

  // Check if already applied
  const existingApp = await prisma.application.findFirst({
    where: {
      taskId,
      freelancerId: freelancer.id,
    }
  });

  if (existingApp) {
    return { error: "Already applied" };
  }

  await prisma.application.create({
    data: {
      taskId,
      freelancerId: freelancer.id,
      proposalText: "I am highly interested in this task.",
      bidAmount: 0, // Placeholder
      status: "PENDING",
    }
  });

  revalidatePath("/tasks");
  revalidatePath("/freelancer/dashboard");
  redirect("/freelancer/dashboard");
}

export async function inviteFreelancer(freelancerId: string) {
  const client = await prisma.user.findUnique({
    where: { email: DEMO_CLIENT_EMAIL },
    include: { tasks: { orderBy: { createdAt: 'desc' }, take: 1 } }
  });

  if (!client || client.tasks.length === 0) throw new Error("Client has no tasks to invite to");

  const latestTask = client.tasks[0];

  // Check if already invited
  const existingInvite = await prisma.invitation.findFirst({
    where: {
      taskId: latestTask.id,
      clientId: client.id,
      freelancerId,
    }
  });

  if (existingInvite) {
    return { error: "Already invited" };
  }

  await prisma.invitation.create({
    data: {
      taskId: latestTask.id,
      clientId: client.id,
      freelancerId,
      message: "I would like to invite you to work on my latest project. Please check the details.",
      status: "PENDING",
    }
  });

  revalidatePath("/freelancers");
  revalidatePath("/client/invitations");
  redirect("/client/invitations");
}

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const role = formData.get("role") as "CLIENT" | "FREELANCER";
  const location = formData.get("location") as string;
  const bio = formData.get("bio") as string;

  // Basic validation
  if (!name || !email || !password || !role) {
    throw new Error("Missing required fields");
  }

  // Check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    // Return error, but since we are using basic server actions without useActionState,
    // we'll just redirect to an error or handle it simply.
    throw new Error("Email already registered");
  }

  // Note: In a real app, hash the password using bcrypt. For this demo, storing as plain text.
  await prisma.user.create({
    data: {
      name,
      email,
      password: password, // Demonstration only
      role,
      location: location || null,
      bio: bio || null,
    }
  });

  // Revalidate entire app state
  revalidatePath("/", "layout");
  
  if (role === 'CLIENT') {
    redirect("/client/dashboard");
  } else {
    redirect("/freelancer/dashboard");
  }
}
