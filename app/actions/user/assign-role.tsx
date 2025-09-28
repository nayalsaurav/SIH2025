"use server";

import { Role } from "@/generated/prisma";
import { getServerSession } from "@/lib/get-session";
import prisma from "@/lib/prisma";

export const assignRoleAction = async (role: Role) => {
  const session = await getServerSession();
  const user = session?.user;
  if (!user) return;
  const data = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role,
    },
  });
  user.role = role;
};
