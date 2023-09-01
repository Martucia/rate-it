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