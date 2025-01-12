import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function clearDatabase() {
    try {
        console.log("Clearing database...");

        await prisma.socialInteraction.deleteMany();
        await prisma.comment.deleteMany();
        await prisma.notification.deleteMany();
        await prisma.followUser.deleteMany();
        await prisma.event.deleteMany();
        await prisma.category.deleteMany();
        await prisma.location.deleteMany();
        await prisma.user.deleteMany();

        console.log("Database cleared successfully.");
    } catch (error) {
        console.error("Error clearing the database:", error);
    } finally {
        await prisma.$disconnect();
    }
}

clearDatabase();
