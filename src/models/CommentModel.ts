import { apiRequest } from "../../utils/apiRequest";

export class CommentModel{
    username: string;
    comment: string;
    profileImage: string;
    timestamp: Date; 

    constructor(username: string, comment: string, profileImage: string, timestamp: Date){
        this.username = username, 
        this.comment = comment, 
        this.profileImage = profileImage, 
        this.timestamp = timestamp
    }
    
    // POST api/events/:eventId/comment
    static async createComment(token: string, eventId: string, data: {
        userId: string, 
        text: string 
        }){
            try{
                const { data: createdComment} = await apiRequest(
                    `events/${eventId}/comment`, 
                    "POST", 
                    data, 
                    token
                )
                return new CommentModel(
                    createdComment.user.username, 
                    createdComment.text,
                    createdComment.user.profileImage,
                    new Date(createdComment.createdAt)
                )
            }catch(error){
                console.error("Error creating comment: ", error);
                throw new Error("Failed to create comment.");
            }
            
        }
    
    // GET /api/comments/events/:eventId/
    static async getEventComments(token: string, eventId: string) {
        try {
            const { data } = await apiRequest(
                `comments/events/${eventId}`,
                "GET",
                undefined,
                token
            );
    
            const comments = data.map((comment: any) => {
                return new CommentModel(
                    comment.user.username,
                    comment.text,
                    comment.user.profileImage,
                    new Date(comment.createdAt)
                );
            });
    
            return comments; 
        } catch (error) {
            console.error("Error fetching comments:", error);
            throw new Error("Failed to fetch comments.");
        }
    }
    
    
}