import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const NUM_USERS = 20;
const NUM_LOCATIONS = 20;
const NUM_EVENTS = 20;
const NUM_COMMENTS = 40;
const NUM_SOCIAL_INTERACTIONS = 40;
const NUM_NOTIFICATIONS = 40;
const NUM_FOLLOW_RELATIONS = 50;

enum CategoriesEnumEs {
    PARTIES = "Fiestas",
    CONCERTS = "Conciertos",
    CLUBS = "Clubs", 
    FESTIVALS = "Festivales",
    SPORTS = "Deporte",
    THEATER = "Teatro",
    EXHIBITIONS = "Exhibición",
    EDUCATION = "Educativo",
    CULTURE = "Cultura"
}

enum CategoriesEnumEn {
    PARTIES = "Parties",
    CONCERTS = "Concerts",
    CLUBS = "Clubs", 
    FESTIVALS = "Festivals",
    SPORTS = "Sports",
    THEATER = "Theather",
    EXHIBITIONS = "Exhibitions",
    EDUCATION = "Education",
    CULTURE = "Culture"
}

const categoriesData = [
    { id: "1", labelEs: CategoriesEnumEs.CULTURE, labelEn: CategoriesEnumEn.CULTURE, icon: "palette" },
    { id: "2", labelEs: CategoriesEnumEs.EDUCATION, labelEn: CategoriesEnumEn.EDUCATION, icon: "bookshelf" },
    { id: "3", labelEs: CategoriesEnumEs.PARTIES, labelEn: CategoriesEnumEn.PARTIES, icon: "party-popper" },
    { id: "4", labelEs: CategoriesEnumEs.CONCERTS, labelEn: CategoriesEnumEn.CONCERTS, icon: "music" },
    { id: "5", labelEs: CategoriesEnumEs.FESTIVALS, labelEn: CategoriesEnumEn.FESTIVALS, icon: "bookmark-music-outline" },
    { id: "6", labelEs: CategoriesEnumEs.SPORTS, labelEn: CategoriesEnumEn.SPORTS, icon: "trophy" },
    { id: "7", labelEs: CategoriesEnumEs.THEATER, labelEn: CategoriesEnumEn.THEATER, icon: "theater" },
    { id: "8", labelEs: CategoriesEnumEs.EXHIBITIONS, labelEn: CategoriesEnumEn.EXHIBITIONS, icon: "image" },
    { id: "9", labelEs: CategoriesEnumEs.CLUBS, labelEn: CategoriesEnumEn.CLUBS, icon: "account-group" },
  ];
async function main() {
    console.log("Seeding database...");

    const users = await Promise.all(
        Array.from({ length: NUM_USERS }).map(() =>
            prisma.user.create({
                data: {
                    username: faker.internet.username(),
                    fullName: faker.person.fullName(),
                    email: faker.internet.email(),
                    profileImage: faker.image.avatar(),
                    birthDate: faker.date.birthdate({ min: 18, max: 60, mode: 'age' }),
                    biography: faker.lorem.sentence(),
                    following_counter: 0,
                    followers_counter: 0,
                },
            })
        )
    );

    const categories = await Promise.all(
        categoriesData.map((category) =>
            prisma.category.create({
                data: {
                    categoryId: parseInt(category.id), 
                    nameEs: category.labelEs, 
                    nameEn: category.labelEn, 
                    description: faker.lorem.sentence(),
                },
            })
        )
    );

    const locations = await Promise.all(
        Array.from({ length: NUM_LOCATIONS }).map(() =>
            prisma.location.create({
                data: {
                    latitude: parseFloat(faker.location.latitude().toString()),
                    longitude: parseFloat(faker.location.longitude().toString()),
                    description: faker.location.city(),
                },
            })
        )
    );

    const events = await Promise.all(
        Array.from({ length: NUM_EVENTS }).map(() => {
            const randomUser = faker.helpers.arrayElement(users);
            const randomCategory = faker.helpers.arrayElement(categories);
            const randomLocation = faker.helpers.arrayElement(locations);
            const randomEventImage = faker.image.url();
            const eventMusic = "https://crnarpvpafbywvdzfukp.supabase.co/storage/v1/object/public/DONT%20DELETE/EventsMusic.mp3"; 
            return prisma.event.create({
                data: {
                    userId: randomUser.userId,
                    categoryId: randomCategory.categoryId,
                    locationId: randomLocation.locationId,
                    title: faker.lorem.words(3),
                    description: faker.lorem.paragraph(),
                    date: faker.date.future(),
                    eventImage: randomEventImage,
                    eventMusic: eventMusic, 
                    startsAt: faker.date.future(),
                    endsAt: faker.date.future(),
                },
            });
        })
    );

    const comments = await Promise.all(
        Array.from({ length: NUM_COMMENTS }).map(() => {
            const randomUser = faker.helpers.arrayElement(users);
            const randomEvent = faker.helpers.arrayElement(events);
            return prisma.comment.create({
                data: {
                    userId: randomUser.userId,
                    eventId: randomEvent.eventId,
                    text: faker.lorem.sentence(),
                },
            });
        })
    );

    const socialInteractions = [];
    const uniqueInteractions = new Set();

    while (socialInteractions.length < NUM_SOCIAL_INTERACTIONS) {
        const randomUser = faker.helpers.arrayElement(users);
        const randomEvent = faker.helpers.arrayElement(events);
        const key = `${randomUser.userId}-${randomEvent.eventId}`;

        if (!uniqueInteractions.has(key)) {
            uniqueInteractions.add(key);
            socialInteractions.push(
                prisma.socialInteraction.create({
                    data: {
                        userId: randomUser.userId,
                        eventId: randomEvent.eventId,
                    },
                })
            );
        }
    }

    await Promise.all(socialInteractions);

    const followRelations = [];
    const uniqueFollows = new Set();

    while (followRelations.length < NUM_FOLLOW_RELATIONS) {
        const follower = faker.helpers.arrayElement(users);
        const followed = faker.helpers.arrayElement(users);
        const key = `${follower.userId}-${followed.userId}`;

        if (follower.userId !== followed.userId && !uniqueFollows.has(key)) {
            uniqueFollows.add(key);
            followRelations.push(
                prisma.followUser.create({
                    data: {
                        userIdFollows: follower.userId,
                        userIdFollowedBy: followed.userId,
                        createdAt: faker.date.recent(),
                    },
                })
            );
        }
    }

    const followRelationsData = await Promise.all(followRelations);

    const followersCountMap = new Map();
    const followingCountMap = new Map();

    for (const follow of followRelationsData) {
        const followerId = follow.userIdFollows;
        const followedId = follow.userIdFollowedBy;

        followingCountMap.set(followerId, (followingCountMap.get(followerId) || 0) + 1);
        followersCountMap.set(followedId, (followersCountMap.get(followedId) || 0) + 1);
    }

    await Promise.all(users.map(user => {
        return prisma.user.update({
            where: { userId: user.userId },
            data: {
                following_counter: followingCountMap.get(user.userId) || 0,
                followers_counter: followersCountMap.get(user.userId) || 0,
            }
        });
    }));

    const notifications = await Promise.all(
        Array.from({ length: NUM_NOTIFICATIONS }).map(() => {
            const fromUser = faker.helpers.arrayElement(users);
            const toUser = faker.helpers.arrayElement(users);
            const image = faker.image.url(); 

            return prisma.notification.create({
                data: {
                    fromUserId: fromUser.userId,
                    toUserId: toUser.userId,
                    type: faker.helpers.arrayElement(['LIKE', 'COMMENT', 'FOLLOW']),
                    message: faker.lorem.sentence(),
                    eventImage: image
                },
            });
        })
    );

    console.log("Database seeding completed.");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
