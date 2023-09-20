import { useEffect } from "react";

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

export const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-US', options);

    return formattedDate;
};

interface ClickOutsideProps {
    element: React.MutableRefObject<HTMLDivElement | HTMLButtonElement | null>,
    close: React.Dispatch<React.SetStateAction<boolean>>
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