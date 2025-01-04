import { NotificationType } from "../src/components/NotificationItem/NotificationItem";
import { CategoriesEnum } from "../src/views/SearchView";

export const events = [
    {
        userId: "1", 
        eventId: "1", 
        profileImage: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        username: "John Doe",
        eventImage: "https://picsum.photos/400/400?random=1",
        title: "Martin Garrix Meet and Greet",
        description: "Martijn Gerard Garritsen, conocido por su nombre artístico Martin Garrix, es un DJ, remezclador y productor discográfico neerlandés; también propietario del sello discográfico STMPD RCRDS",
        isLiked: false,
        date: "24/12/2024",
        location: "Av Universitaria. ",
        startsAt: "8:00 pm",
        endsAt: "10:00 pm",
        category: CategoriesEnum.CLUBS,
    },
    {
        userId: "2", 
        eventId: "2", 
        profileImage: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        username: "Jane Smith",
        eventImage: "https://picsum.photos/400/400?random=2" ,
        title: "Concert de Coldplay",
        description: "Un concierto inolvidable de la famosa banda Coldplay.",
        isLiked: true,
        date: "15/01/2025",
        location: "Av Universitaria. ",
        startsAt: "8:00 pm",
        endsAt: "10:00 pm",
        category: CategoriesEnum.CONCERTS,
    },
    {
        userId: "3", 
        eventId: "3", 
        profileImage: "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        username: "Alice Johnson",
        eventImage: "https://picsum.photos/400/400?random=3",
        title: "Art Exhibition",
        description: "Una exposición de arte contemporáneo en la galería local.",
        isLiked: false,
        date: "10/02/2025",
        location: "Av Universitaria. ",
        startsAt: "8:00 pm",
        endsAt: "10:00 pm",
        category: CategoriesEnum.CONCERTS,
    },
]

export const user = {
    profileImage:
      "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
    username: "John Doe",
    email: "john.doe@example.com",
    biography: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    events: 10,
    followers: 100,
    following: 100,
};

export const notifications = [
    {
        user: "John Doe",
        timestamp: new Date("2024-01-01"),
        userAvatar:
        "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        type: NotificationType.FOLLOW,
    }, 
    {
        user: "Jane Smith",
        timestamp: new Date("2024-01-02"),
        userAvatar:
        "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        type: NotificationType.LIKE_EVENT,
        eventImage: "https://picsum.photos/400/400?random=2",
    }, 
    {
        user: "Alice Johnson",
        timestamp: new Date("2024-01-03"),
        userAvatar:
        "https://variety.com/wp-content/uploads/2021/04/Avatar.jpg?w=800&h=533&crop=1",
        type: NotificationType.COMMENT_EVENT,
        eventImage: "https://picsum.photos/400/400?random=3",
    }
]
