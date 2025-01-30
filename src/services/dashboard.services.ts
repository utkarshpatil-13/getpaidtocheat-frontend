import axios from "axios";

const token = localStorage.getItem('accessToken');

export const fetchYoutubeContents = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/youtube', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        if(response.data.success == false){
            throw {
                message: response.data?.message || 'Failed to fetch YouTube contents',
                status: response.status,
            };
        }
        console.log(response.data.message);

        return response.data.data;
    } catch (error : any) {
        alert(error.response.data?.message);
        console.error('Error fetching YouTube contents:', error.response.data);

        // Check if error response exists
        if (error.response) {
            // Throw an error object with a clear message and status code
            throw {
                message: error.response.data?.message || 'Failed to fetch YouTube contents',
                status: error.response.status,
            };
        }

        // Throw generic error for unexpected issues
        throw { message: 'Something went wrong while fetching YouTube contents', status: 500 };
    }
};

export const fetchPayoutHistory = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/transactions', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        console.log(response.data);

        return response.data.data || [];
    } catch (error) {
        console.error('Error fetching payouts history:', error);
        return [];
    }
};


export const fetchSocialMediaAccount = async () => {
    try {
        const response = await axios.get(`http://localhost:3000/api/social-media/account?platform=YouTube`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    catch (error) {
        console.log("Error fetching the social media accounts", error);
        return [];
    }
};

export const authorizeYoutube = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/youtube/auth', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        // Redirect the browser to the YouTube OAuth URL
        const authUrl = response.data.authUrl;
        if (authUrl) {
            window.location.href = authUrl; // Navigate directly to the OAuth URL
        } else {
            throw new Error('Authorization URL not provided.');
        }

    }
    catch (error) {
        console.log("Error in authorizing youtube in dashboard.services", error);
    }
}

export const youtubeCallback = async (code: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/youtube/callback?code=${code}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        console.log(response.data);
    }
    catch (error) {
        console.log('Error generating tokens in youtube callback');
    }
}
