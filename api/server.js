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

// Ejemplo: Endpoint de test para obtener usuarios
app.get("/api/users", async(req, res) => {
  const users = await db.user.findMany(); 
  res.json(users);
});

// Ejemplo ruta protegida
app.get('/api/protected', authenticateUser, (req, res) => {
  res.json({ 
      message: `Hola,  ${req.user.email} Accediste a una ruta protegida.` 
  });
});

// addEvent 
app.post("/api/events", async(req, res) => {
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
    endsAt    
  } = req.body; 

  // Validations 
    // fecha endsAt > startsAt 

  // Create location
  try{
    const location = await db.location.create({
      data: {
        latitude:  parseFloat(latitude), 
        longitude: parseFloat(longitude), 

      }
    }); 

    try{
      const event = await db.event.create({
        data:{
          userId: userId, 
          eventImage: eventImage, 
          categoryId: categoryId, 
          locationId: location.locationId, 
          title: title, 
          description: description, 
          date: date, 
          startsAt: startsAt, 
          endsAt: endsAt, 
          time: "QUITAR"
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
  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to create location" });
  }
})

// getEventDetails
app.get("/api/events/:eventId", async(req, res) => { 
  try{
    const { eventId } = req.params;

    const eventDetails = await db.event.findFirst({
      where: {
        eventId: eventId
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

// getProfileEvents 
app.get("/api/users/:userId/events", async(req, res) => {
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


// getNotifications
app.get("/api/users/:userId/notifications", async(req, res) => {
  try{
    const { userId } = req.params;  

    const notifications = await db.notification.findMany({
      where: {
        toUserId: userId
      }
    })

    res.json({
      data: notifications, 
      success: true
    })

  }catch(error){
    console.error(error); 
    res.status(500).json({ error: "FAILED to get user notifications" });
  }
})

// getUserFollowers
app.get("/api/users/:userId/followers", async(req, res) => {
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
app.get("/api/users/:userId/following", async(req, res) => {

})


// Iniciar el servidor
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});