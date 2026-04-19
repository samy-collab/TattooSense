import type { FastifyPluginAsync } from "fastify";
import { StyleRepository } from "../repositories/styleRepository.js";

export const styleRoutes: FastifyPluginAsync = async (app) => {
  app.get("/styles", async () => {
    const styles = await new StyleRepository(app.prisma).findActiveStyles();
    return {
      styles: styles.map((style) => ({
        key: style.key,
        name: style.name,
        summary: style.summary,
        characteristics: style.characteristics,
        visualTraits: style.visualTraits
      }))
    };
  });
};
