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
                const createdComment = await apiRequest(
                    `events/${eventId}/comment`, 
                    "POST", 
                    data, 
                    token
                )
                return createdComment
            }catch(error){
                console.log(error)
            }
            
        }
    
    // GET /api/events/:eventId/comments
    static async getEventComments(token: string, eventId: string) {
        try {
            const { data } = await apiRequest(
                `events/${eventId}/comments`,
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
            return []; 
        }
    }
    
    
}