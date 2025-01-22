const { likeEventSchema, commentEventSchema, signUpSchema, eventSchema, editProfileSchema, locationSchema, searchEventSchema, searchUserSchema } = require("./validationSchemas.js");
const authenticateUser = require("./authenticateUser.js"); 
const express = require("express");
const cors = require("cors");
const app = express();
const { PrismaClient } = require("@prisma/client"); 

const db = new PrismaClient(); 
// Middleware para permitir CORS
app.use(cors());

// Middleware para parsear JSON
app.use(express.json());

// addLocation
app.post("/api/locations", authenticateUser , async(req, res) => {
  const validationResult = locationSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      data: validationResult.error.errors,
      success: false      
    });
  }

  try{
    const {
      latitude, 
      longitude
    } = req.body; 

    const location = await db.location.create({
      data: {
        latitude:  parseFloat(latitude), 
        longitude: parseFloat(longitude), 
      }
    }); 

    res.json({
      data: location, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to create location" });
  }
})

// deleteLocation
app.delete("/api/locations/:locationId", authenticateUser , async(req, res) => {
  try{
    const { locationId } = req.params; 

    const location = await db.location.delete({
      where: {
        locationId: locationId
      }
    })
    console.log("Se ha eliminado exitosamente la location ", location); 
    res.json({
      data: location, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to delete location" });
  }
})
// addEvent 
app.post("/api/events", authenticateUser, async(req, res) => {
  const validationResult = eventSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      data: validationResult.error.errors,
      success: false      
    });
  }

  // TODO: falta fecha endsAt > startsAt 

  const { 
    userId, 
    eventImage, 
    categoryId, 
    locationId, 
    title, 
    description, 
    date, 
    startsAt, 
    endsAt, 
    eventMusic
  } = req.body;   

  try{
    const event = await db.event.create({
      data:{
        userId: userId, 
        eventImage: eventImage, 
        categoryId: parseInt(categoryId), 
        locationId: locationId, 
        title: title, 
        description: description, 
        date: date, 
        startsAt: startsAt, 
        endsAt: endsAt, 
        eventMusic: eventMusic
      }
    }); 
    
    res.json({
      data: event, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to create event" });
  }
  
})

// updateEvent 
app.post("/api/events/:eventId", authenticateUser , async(req, res) => {
  const validationResult = eventSchema.safeParse(req.body);
  const { eventId } = req.params; 

  if (!validationResult.success) {
    return res.status(400).json({
      data: validationResult.error.errors,
      success: false      
    });
  }

  const { 
    userId, 
    eventImage, 
    categoryId, 
    latitude, 
    longitude, 
    title, 
    description, 
    date, 
    startsAt, 
    endsAt, 
    eventMusic, 
    locationId, 
  } = req.body; 
     
    try{
      const event = await db.event.update({
        where: {
          eventId: eventId
        }, 
        data:{
          userId: userId, 
          eventImage: eventImage, 
          categoryId: parseInt(categoryId), 
          locationId: locationId, 
          title: title, 
          description: description, 
          date: date, 
          startsAt: startsAt, 
          endsAt: endsAt, 
          eventMusic: eventMusic
        }
      }); 

      res.json({
        data: event, 
        success: true
      })

    }catch(error){
      console.error(error); 
      res.status(500).json({ error: "FAILED to create event" });
    }

})
// getEventDetails
app.get("/api/events/:eventId", authenticateUser , async(req, res) => { 
  try{
    const { eventId } = req.params;

    const eventDetails = await db.event.findFirst({
      where: {
        eventId: eventId
      }, 
      include: {
        user: {
          select: {
            username: true, 
            profileImage: true,
            userId: true
          }
        }, 
        location:{
          select:{
            latitude: true, 
            longitude: true, 
            locationId: true
          }
        }, 
        category:{
          select: {
            nameEs: true, 
            categoryId: true
          }
        }
      }
    })

    if(!eventDetails){
      res.json({
        data: "Event not found", 
        success: false
      })

      return
    }
    res.json({
      data: eventDetails, 
      success: true
    })
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "Something went wrong" });
  }  
 
})

//getProfile
app.get("/api/users/:userId", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params; 
    const user = await db.user.findFirst({
      where: {
        userId: userId
      }
    })
    res.json({ data: user, success: true });
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user profile" });
  }
})

//updateProfile
app.put("/api/users/:userId", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params;
    const { fullName, biography, profileImage } = req.body;
    const validationResult = editProfileSchema.safeParse(req.body);

    console.log(fullName, biography, profileImage);
    console.log(validationResult);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }
    const user = await db.user.update({
      where: { userId },
      data: { fullName, biography, profileImage }
    });
    res.json({ data: user, success: true });
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to update user profile" });
  }
})

//isFollowing 
app.get("/api/users/:userId/isFollowing/:targetUserId", authenticateUser , async(req, res) => {
  try{
    const { userId, targetUserId } = req.params;
    const isFollowing = await db.followUser.findFirst({
      where: { userIdFollows: userId, userIdFollowedBy: targetUserId }
    });
    res.json({ data: isFollowing, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "FAILED to get isFollowing" });
  }
})

// followUser
app.post("/api/users/:userId/follow/:targetUserId", authenticateUser , async(req, res) => {
  const { userId, targetUserId } = req.params;
  
  try{
    const follow = await db.followUser.upsert({
      where: { userIdFollows_userIdFollowedBy: {
        userIdFollows: userId, userIdFollowedBy: targetUserId 
      }},
      update: { isActive: true },
      create: { userIdFollows: userId, userIdFollowedBy: targetUserId, isActive: true }
    });

    await db.user.update({
      where: { userId: userId },
      data: { following_counter: { increment: 1 } }
    });

    await db.user.update({
      where: { userId: targetUserId },
      data: { followers_counter: { increment: 1 } }
    });

    res.json({ data: follow, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "FAILED to follow user" });
  }
})

// unfollowUser
app.delete("/api/users/:userId/unfollow/:targetUserId", authenticateUser , async(req, res) => {
  const { userId, targetUserId } = req.params;
  try{
    const follow = await db.followUser.update({
      where: { 
        userIdFollows_userIdFollowedBy: {
          userIdFollows: userId, userIdFollowedBy: targetUserId 
        }
      }, 
      data: { isActive: false } 
    });

    await db.user.update({
      where: { userId: userId },
      data: { following_counter: { decrement: 1 } }
    });

    await db.user.update({
      where: { userId: targetUserId },
      data: { followers_counter: { decrement: 1 } }
    });

    res.json({ data: follow, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "FAILED to unfollow user" });
  }
})

// getFollowers
app.get("/api/users/:userId/followers", authenticateUser , async(req, res) => {
  const { userId } = req.params;

  try{
    const response = await db.followUser.findMany({
      where: { userIdFollowedBy: userId, isActive: true },
      include: {
        userFollows: {
          select: { username: true, profileImage: true }
        }
      }
    });

    const followers = await Promise.all(response.map(async (follower) => {
      const user = await db.followUser.findFirst({
        where: { userIdFollows: userId , userIdFollowedBy: follower.userIdFollows, isActive: true }
      });

      return {
        followerId: follower.userIdFollows,
        followerName: follower.userFollows.username,
        followerProfileImage: follower.userFollows.profileImage,  
        followed: user ? true : false};
    }));
    
    res.json({ data: followers, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "FAILED to get followers" });
  }
})

// getFollowed
app.get("/api/users/:userId/followed", authenticateUser , async(req, res) => {
  const { userId } = req.params;

  try{
    const response = await db.followUser.findMany({
      where: { userIdFollows: userId, isActive: true },
      include: {
        userFollowedBy: {
          select: { username: true, profileImage: true }
        }
      }
    });
    
    const followed = response.map((follow) => {
      const response = {
        followedId: follow.userIdFollowedBy, 
        followedName: follow.userFollowedBy.username, 
        followedProfileImage: follow.userFollowedBy.profileImage, 
        followed: true
      }
      console.log(response);
      return response;
    });

    res.json({ data: followed, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "FAILED to get following" });
  }
})

// likeEvent - Toggle like status
app.post("/api/events/:eventId/like", async (req, res) => {
  const { eventId } = req.params;
  const { userId } = req.body;

  console.log(userId, eventId);

  try {
    const existingInteraction = await db.socialInteraction.findUnique({
      where: {
        userId_eventId: {
          userId: userId,
          eventId: eventId
        }
      }
    });

    const interaction = await db.socialInteraction.upsert({
      where: {
        userId_eventId: {
          userId: userId,
          eventId: eventId
        }
      },
      update: {
        isActive: existingInteraction ? !existingInteraction.isActive : true
      },
      create: {
        userId: userId,
        eventId: eventId,
        isActive: true
      }
    });

    await db.event.update({
      where: { eventId: eventId },
      data: { 
        likesCounter: {
          [interaction.isActive ? 'increment' : 'decrement']: 1
        }
      }
    });

    res.json({ 
      data: interaction,
      success: true 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to toggle like status" });
  }
});

// getProfileEvents 
app.get("/api/users/:userId/events", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params; 

    const events = await db.event.findMany({
      where: {
        userId: userId
      }
    })

    res.json({
      data: events, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user events" });
  }
})

app.post("/api/notifications", authenticateUser, async(req, res) => {
  try{  
    const { 
      fromUserId, 
      toUserId, 
      type, 
      message, 
      eventImage
     } = req.body; 
    const notification = await db.notification.create({
      data: {
        fromUserId: fromUserId, 
        toUserId: toUserId, 
        type: type, 
        message: message, 
        eventImage: eventImage? eventImage : undefined
      }
    })

    console.log("notification created ", notification)
    res.json({
      data: notification, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to create notification" });
  }
})

// getNotifications
app.get("/api/users/:userId/notifications", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params;  

    const notifications = await db.notification.findMany({
      where: {
        toUserId: userId
      },
    })

    const notificationsWithUser = await Promise.all(notifications.map(async (notification) => {
      const userData = await db.user.findFirst({
        where: { userId: notification.fromUserId },
        select: { username: true, profileImage: true }
      });
    
      return {
        notification: notification,
        userData: userData
      };
    }));
    

    res.json({
      data: notificationsWithUser, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user notifications" });
  }
})

// getUserFollowers
app.get("/api/users/:userId/followers", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params; 
    const followers = await db.followUser.findMany({
      where: {
        userIdFollowedBy: userId
      }
    }); 

    const followersIds = followers.map((follow) => follow.userIdFollows); 
    
    try{

      const followersProfile = await Promise.all(
        followersIds.map(async (followerId) => {
          const user = await db.user.findFirst({
            where: {
              userId: followerId,
            },
          });
          return user;
        })
      );

      res.json({
        data: followersProfile, 
        success: true
      })
      
    }catch(error){
      console.error(error); 
      res.status(500).json({ error: "FAILED to get users profile" });
    }
    
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user followers" });
  }
})

// getUserFollowing
app.get("/api/users/:userId/following", authenticateUser , async(req, res) => {
  try{
    const { userId } = req.params; 
    const following = await db.followUser.findMany({
      where: {
        userIdFollows: userId
      }
    }); 

    const followingIds = following.map((follow) => follow.userIdFollowedBy); 

    try{

      const followingsProfile = await Promise.all(
        followingIds.map(async (followigId) => {
          const user = await db.user.findFirst({
            where: {
              userId: followigId,
            },
          });
          return user;
        })
      );

      res.json({
        data: followingsProfile, 
        success: true
      })
      
    }catch(error){
      console.error(error); 
      res.status(500).json({ error: "FAILED to get users profile" });
    }
    
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user followers" });
  }
})

// signUp
app.post("/api/signup", async (req, res) => {
  const validationResult = signUpSchema.safeParse(req.body);

  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.error.errors,
    });
  }

  const { userId, username, fullName, email, birthDate } = req.body;

  try {
    const newUser = await db.user.create({
      data: {
        userId,
        username,
        fullName,
        email,
        birthDate: new Date(birthDate),
      },
    });

    res.json({ data: newUser, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to sign up" });
  }
});

// getCategories
app.get("/api/categories", authenticateUser, async (req, res) => {
  try {
    const categories = await db.category.findMany();
    res.json({ data: categories, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get categories" });
  }
});

// getHomeEvents
app.get("/api/home/:userId/events", authenticateUser , async (req, res) => {
  const { userId } = req.params; 

  try {
    const following = await db.followUser.findMany({
      where: { userIdFollows: userId, isActive: true },
      select: { userIdFollowedBy: true },
    });

    console.log("following", following)

    const followingIds = following.map(f => f.userIdFollowedBy);

    let events;

    if (followingIds.length > 0) {
      try {
        events = await db.event.findMany({
          where: { userId: { in: followingIds } },
          orderBy: { createdAt: "desc" }, 
          include:{
             user: {
              select:{
                username: true, 
                profileImage: true,
                userId: true
              }
             }, 
             location:{
              select: {
                latitude: true, 
                longitude: true, 
                locationId: true
              }
             }
          }
        });
      } catch (error) {
        console.error("Error fetching events from followed users:", error);
        return res.status(500).json({ error: "Failed to fetch events" });
      }
    } else {
      try {
        const likedCategories = await db.user.findUnique({
          where: { userId },
          select: { likedCategories: { select: { categoryId: true } } },
        });

        const categoryIds = likedCategories.likedCategories.map(c => c.categoryId);
        
        events = await db.event.findMany({
          where: { categoryId: { in: categoryIds } },
          orderBy: { createdAt: "desc" },
          include:{
            user: {
             select:{
               username: true, 
               profileImage: true,
               userId: true
             }
            }
         }
        });
      } catch (error) {
        console.error("Error fetching events from liked categories:", error);
        return res.status(500).json({ error: "Failed to fetch events" });
      }
    }

    res.json({ data: events, success: true });
  } catch (error) {
    console.error("Error fetching following users:", error);
    res.status(500).json({ error: "Failed to get home events" });
  }
});

// commentEvent
app.post("/api/events/:eventId/comment", authenticateUser , async (req, res) => {
  const validationResult = commentEventSchema.safeParse(req.body);
  
  if (!validationResult.success) {
    return res.status(400).json({
      success: false,
      errors: validationResult.error.errors,
    });
  }

  const { eventId } = req.params;
  const { text, userId } = req.body;

  try {
    const comment = await db.comment.create({
      data: { userId, eventId: eventId, text },
      include: {
        user:{
          select: {
            username: true, 
            profileImage: true
          }
        }
      }
    });

    res.json({ data: comment, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to comment on event" });
  }
});




// getCommentsByPostId
app.get("/api/events/:eventId/comments", authenticateUser , async (req, res) => {
  const { eventId } = req.params;

  try {
    const comments = await db.comment.findMany({
      where: { eventId: eventId },
      include: {
        user: {
          select: {
            username: true, 
            profileImage: true
          }
        }
      }
    });

    console.log(comments)
    res.json({ data: comments, success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to get comments" });
  }
});

// searchEvents
app.post("/api/search/events", authenticateUser , async (req, res) => {
  try{
    const { search } = req.body;
    const validationResult = searchEventSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }
    const events = await db.event.findMany({
      where: { title: { contains: search } },
      include: {
        user: {
          select: {
            username: true, 
            profileImage: true,
            userId: true
          }
        },
        location: {
          select: {
            latitude: true, 
            longitude: true, 
            locationId: true
          }
        }
      }
    });
    res.json({ data: events, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Failed to search events" });
  }
});

// searchUsers
app.post("/api/search/users", authenticateUser, async (req, res) => {
  try{
    const { search } = req.body;
    
    const validationResult = searchUserSchema.safeParse(req.body);
    

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        errors: validationResult.error.errors,
      });
    }

    const users = await db.user.findMany({
      where: { username: { contains: search } },
      select: {
        username: true, 
        profileImage: true,
        userId: true
      }
    });
    res.json({ data: users, success: true });
  }catch(error){
    console.error(error);
    res.status(500).json({ error: "Failed to search users" });
  }
});

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});