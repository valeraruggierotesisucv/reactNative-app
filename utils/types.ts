import { AddRoutes, AuthRoutes, HomeRoutes, ProfileRoutes, SearchRoutes } from "./routes";

// Authentication
export type AuthStackParamList = {
    [AuthRoutes.Auth]: undefined;
    [AuthRoutes.Onboarding]: undefined;
    [AuthRoutes.ChooseCategories]: {
        username: string;
        fullname: string;
        email: string;
        birthdate: string;
        password: string;
        confirmPassword: string;
    };
    [AuthRoutes.ForgotPassword]: undefined;
    [AuthRoutes.ForgotPasswordLogin]: undefined;
    [AuthRoutes.Success]: undefined;
};

// Home 
export type HomeStackParamList = {
    [HomeRoutes.Home]: undefined;
    [HomeRoutes.EventDetails]: {
        eventId: string
        canEdit: boolean
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
        canEdit: boolean
    };
    [SearchRoutes.ProfileDetails]: {
        userId: string
    };
};

// Add
export type AddStackParamList = {
    [AddRoutes.Add]: {
        date: Date
    };
    [AddRoutes.AddDate]: {
        setDate: (date: Date | null) => void
    }
};

// Profile
export type ProfileStackParamList = {
    [ProfileRoutes.Profile]: undefined;
    [ProfileRoutes.EditProfile]: undefined;
    [ProfileRoutes.EditEvent]: {
        eventId: string
    };
    [ProfileRoutes.Configuration]: undefined;
    [ProfileRoutes.ChangePassword]: undefined;
    [ProfileRoutes.ChangeLanguage]: undefined;
    [ProfileRoutes.Followers]: undefined;
    [ProfileRoutes.Followed]: undefined;
    [ProfileRoutes.EventDetails]: {
        eventId: string
        canEdit: boolean
    };
};

