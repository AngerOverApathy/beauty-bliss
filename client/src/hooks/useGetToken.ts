import { useCookies } from 'react-cookie'

export const useGetToken = () => {
    const [cookies] = useCookies(['access_token']);
    console.log("Token from cookies:", cookies.access_token);

    if (!cookies.access_token) {
        console.error("No access token found in cookies");
        return null;
    }

    return {
        headers: {
            Authorization: `Bearer ${cookies.access_token}`
        }
    };
};
