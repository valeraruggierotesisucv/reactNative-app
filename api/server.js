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

app.use((req, res, next) => {
  console.log(req.originalUrl); 
  next(); 
});

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
app.put("/api/events/:eventId", authenticateUser , async(req, res) => {
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
app.get("/api/events/:eventId/:userId", authenticateUser, async(req, res) => { 
    try{
      const { eventId, userId } = req.params;
  
      const eventDetails = await db.event.findFirst({
        where: {
          eventId: eventId
        }, 
        include: {
          socialInteractions: {
            where: { userId: userId, isActive: true },
            select: { isActive: true }
          },
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

// likeEvent
app.post("/api/events/:eventId/like", async (req, res) => {  
    try {
      const { eventId } = req.params;
      const { userId } = req.body;
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

// getProfile
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

// updateProfile
app.put("/api/users/:userId", authenticateUser , async(req, res) => {
    try{
      const { userId } = req.params;
      const { fullName, biography, profileImage } = req.body;
      const validationResult = editProfileSchema.safeParse(req.body);
  
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

// getUserNotifications
app.get("/api/users/:userId/notifications", authenticateUser , async(req, res) => {
    try{
      const { userId } = req.params;  
  
      const notifications = await db.notification.findMany({
        where: {
          toUserId: userId
        },
        orderBy: {
          createdAt: "desc"
        }
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

// getUserNotificationToken
app.get("/api/users/:userId/push-notification", async(req, res) => {
    try{
      const { userId } = req.params; 
      const user = await db.user.findFirst({
        where: {
          userId: userId
        }
      })
      res.json({
        data: user.notificationToken, 
        success: true
      })
    }catch(error){
      console.error(error); 
      res.status(500).json({ error: "FAILED to get user notifications" });
    }
})

// updateUserNotificationToken
app.put("/api/users/:userId/notifications/:notificationToken", async(req, res) => {
    try{
      const { userId, notificationToken } = req.params; 
  
      const user = await db.user.findFirst({
        where: {
          userId: userId
        }
      })
  
      if(user.notificationToken === notificationToken){
        console.log("No need to update ", notificationToken)
        res.status(200).json({ message: `No need to update ---> ${notificationToken}`})
      }else{
        console.log("Token must be updated ", notificationToken); 
        const userUpdated = await db.user.update({
          where: {
            userId: userId, 
          }, 
          data: {
            notificationToken: notificationToken
          }
        })
        res.status(200).json({ 
          message: `Token updated updated ---> ${notificationToken}`, 
          data: userUpdated, 
          success: true
        })
      }
    
    }catch(error){
      console.error(error);
      res.status(500).json({ error: "Failed to send notification" });
    }
})

// isFollowing 
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
        return response;
      });
  
      res.json({ data: followed, success: true });
    }catch(error){
      console.error(error);
      res.status(500).json({ error: "FAILED to get following" });
    }
})

// sendPushNotification
app.post("/api/push-notifications/:notificationToken", async (req, res) => {
    try{
      const { notificationToken } = req.params; 
      const { title, body} = req.body; 
      const message = {
        to: notificationToken,
        sound: "default",
        title: title,
        body: body,
      };
  
      await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "host": "exp.host", 
          "accept": "application/json",
          "accept-encoding": "gzip, deflate",
          "content-type": "application/json",
        },
        body: JSON.stringify(message),
      });
      
      res.status(200).json({ message: "Notificacion enviada"})
    }catch(error){
      console.error(error);
      res.status(500).json({ error: "Failed to send notification" });
    }
})

// createNotification
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
          eventImage: eventImage? eventImage : undefined, 
        }
      })
  
      res.json({
        data: notification, 
        success: true
      })
  
    }catch(error){
      console.error(error); 
      res.status(500).json({ error: "FAILED to create notification" });
    }
})

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

// searchEvents
app.post("/api/search/events", authenticateUser , async (req, res) => {
    try{
      const { search, userId } = req.body;
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
          socialInteractions: {
            where: { userId: userId, isActive: true },
            select: { isActive: true }
          },
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

// getCommentsByPostId
app.get("/api/comments/events/:eventId", authenticateUser , async (req, res) => {
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
  
      res.json({ data: comments, success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to get comments" });
    }
});

// getUserByEventId
app.get("/api/user-event/:eventId", async(req, res) => {
    try{
      const { eventId } = req.params; 
      const event = await db.event.findFirst({
        where: {
          eventId: eventId
        }, 
      })
      res.status(200).json({ 
        data: event.userId, 
        success: true
      })
    }catch(error){
      console.error(error);
      res.status(500).json({ error: "Failed to get UserId" });
    }
})

// getHomeEvents
app.get("/api/home/:userId/events", authenticateUser , async (req, res) => {
    const { userId } = req.params; 
  
    try {
      const following = await db.followUser.findMany({
        where: { userIdFollows: userId, isActive: true },
        select: { userIdFollowedBy: true },
      });
  
      const followingIds = following.map(f => f.userIdFollowedBy);
  
      let events;
  
      if (followingIds.length > 0) {
        try {
          events = await db.event.findMany({
            where: { userId: { in: followingIds } },
            orderBy: { createdAt: "desc" }, 
            include:{
              socialInteractions: {
                where: { userId: userId, isActive: true },
                select: { isActive: true }
              },
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
          events = await db.event.findMany({
            take: 10
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

// Iniciar el servidor
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});