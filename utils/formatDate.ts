export function formatDate(date: Date, locale: string = "en-US"): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    const translations = {
        "en-US": {
            justNow: 'just now',
            minute: 'm ago',
            hour: 'h ago',
            day: 'd ago',
            month: 'mo ago',
            year: 'y ago',
        },
        "es-ES": {
            justNow: 'ahora mismo',
            minute: 'min atrás',
            hour: 'h atrás',
            day: 'd atrás',
            month: ' mes atrás',
            year: ' año atrás',
        },
    };

    const t = translations[locale as keyof typeof translations];

    if (diffInSeconds < 60) {
        return t.justNow;
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes}${t.minute}`;
    }

    if (diffInHours < 24) {
        return `${diffInHours}${t.hour}`;
    }

    if (diffInDays < 30) {
        return `${diffInDays}${t.day}`;
    }

    if (diffInMonths < 12) {
        return `${diffInMonths}${t.month}`;
    }

    return `${diffInYears}${t.year}`;
}


export function getDate(date: string){
    return new Date(date.split("/").reverse().join("-") + "T16:00:00.000Z");
}
