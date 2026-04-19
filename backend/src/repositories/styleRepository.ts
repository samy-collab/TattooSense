import type { PrismaClient } from "@prisma/client";

export class StyleRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findActiveStyles() {
    return this.prisma.tattooStyle.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" }
    });
  }

  findStylesWithRules() {
    return this.prisma.tattooStyle.findMany({
      where: { isActive: true },
      include: {
        compatibilityRules: {
          where: { isActive: true },
          include: {
            answerOption: {
              include: { question: true }
            },
            question: true
          }
        }
      }
    });
  }
}
