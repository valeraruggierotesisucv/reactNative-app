export function formatDate(date: Date): string {
    const now = new Date();
    const diffInMilliseconds = now.getTime() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return 'just now';
    }

    if (diffInMinutes < 60) {
        return `${diffInMinutes}m ago`;
    }

    if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }

    if (diffInDays < 30) {
        return `${diffInDays}d ago`;
    }

    if (diffInMonths < 12) {
        return `${diffInMonths}mo ago`;
    }

    return `${diffInYears}y ago`;
}