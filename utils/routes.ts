// Authentication
export enum AuthRoutes {
    Auth = "Auth",
    Onboarding = "Onboarding",
    ChooseCategories = "ChooseCategories",
    ForgotPassword = "ForgotPassword",
    ForgotPasswordLogin = "ForgotPasswordLogin",
    Success = "Success"
}

// Home
export enum HomeRoutes {
    Home = "Home",
    EventDetails = "EventDetails",
    ProfileDetails = "ProfileDetails"
}

// Search
export enum SearchRoutes {
    Search = "Search",
    EventDetails = "EventDetails",
    ProfileDetails = "ProfileDetails"
}

// Add
export enum AddRoutes {
    Add = "Add", 
    AddDate = "AddDate"
}

// Notifications
export enum NotificationsRoutes {
    Notifications = "Notifications"
}

// Profile
export enum ProfileRoutes {
    Profile = "Profile",
    EditProfile = "EditProfile",
    EditEvent = "EditEvent",
    Configuration = "Configuration",
    ChangePassword = "ChangePassword",
    ChangeLanguage = "ChangeLanguage",
    Followers = "Followers",
    Followed = "Followed"
}

// Notifications
export type NotificationsStackParamList = {
    [NotificationsRoutes.Notifications]: undefined;
};
