const getToken = () => {
    return localStorage.getItem('token');
};

export const getConfig = () => {
    const token = getToken();

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return config;
};

export const formatDate = (dateString: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};

export const formatDateAndTime = (dateString: Date): string => {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now.getTime() - date.getTime()) / 1000; // Різниця в секундах

    if (diff < 5) {
        return 'Now';
    } else if (diff < 60) {
        return `${Math.floor(diff)} seconds ago`;
    } else if (diff < 3600) {
        const minutes = Math.floor(diff / 60);
        return `${minutes} minutes ago`;
    } else if (diff < 86400) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    } else if (diff < 259200) {
        const day = 'Yesterday';
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}, ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    } else if (now.getFullYear() === date.getFullYear()) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${day}.${month}`;
    } else {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${day}.${month}.${year}`;
    }
};

interface ClickOutsideProps {
    element: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>,
    close: React.Dispatch<React.SetStateAction<boolean>> | Function
}

export const ClickOutside = ({ element, close }: ClickOutsideProps) => {
    const handleClickOutside = (event: MouseEvent) => {
        if (element.current && !element.current.contains(event.target as Node)) {
            close(false);
        }
    };

    window.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('mousedown', handleClickOutside);
    };
};