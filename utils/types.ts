import { AddRoutes, AuthRoutes, HomeRoutes, ProfileRoutes, SearchRoutes } from "./routes";

// Authentication
export type AuthStackParamList = {
    [AuthRoutes.Auth]: undefined;
    [AuthRoutes.Onboarding]: undefined;
    [AuthRoutes.ChooseCategories]: undefined;
    [AuthRoutes.ForgotPassword]: undefined;
    [AuthRoutes.ForgotPasswordLogin]: undefined;
    [AuthRoutes.Success]: undefined;
};

// Home 
export type HomeStackParamList = {
    [HomeRoutes.Home]: undefined;
    [HomeRoutes.EventDetails]: {
        eventId: string
    };
    [HomeRoutes.ProfileDetails]: {
        userId: string
    };
};

// Search
export type SearchStackParamList = {
    [SearchRoutes.Search]: undefined;
    [SearchRoutes.EventDetails]: {
        eventId: string
    };
    [SearchRoutes.ProfileDetails]: {
        userId: string
    };
};

// Add
export type AddStackParamList = {
    [AddRoutes.Add]: undefined;
};

// Profile
export type ProfileStackParamList = {
    [ProfileRoutes.Profile]: undefined;
    [ProfileRoutes.EditProfile]: undefined;
    [ProfileRoutes.Configuration]: undefined;
    [ProfileRoutes.ChangePassword]: undefined;
    [ProfileRoutes.ChangeLanguage]: undefined;
    [ProfileRoutes.Followers]: undefined;
    [ProfileRoutes.Followed]: undefined;
};

