import axios from "axios";

const token = localStorage.getItem('accessToken');

export const fetchSubscription = async () => {
    try {
        const response = await axios.get('https://getpaidtocheat-backend.onrender.com/api/subscription', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        return response.data.data;
    } catch (error) {
        console.error('Error fetching subscription data:', error);
        return null;
    }
};

export const createSubscription = async () => {
    try{
        const response = await axios.get('https://getpaidtocheat-backend.onrender.com/api/subscription/create', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });

        const checkoutUrl = response.data.checkoutUrl;
        if (checkoutUrl) {
            window.location.href = checkoutUrl;
        } else {
            throw new Error('Checkout URL not provided.');
        }
    }
    catch(error : any){
        console.error('Error fetching subscription contents:', error.response.data);
    }
}

export const cancelSubscription = async (stripeSubscriptionId: string) => {
    try {
        const response = await axios.delete('https://getpaidtocheat-backend.onrender.com/api/subscription/cancel', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params: {
                stripeSubscriptionId, // Pass the subscription ID as a query parameter
            },
        });

        // Handle success response
        if (response.status === 200) {
            alert('Subscription canceled successfully.');
            // Optionally reload the page or update the UI
            window.location.reload();
        } else {
            throw new Error('Failed to cancel subscription.');
        }
    } catch (error: any) {
        console.error('Error canceling subscription:', error.response?.data || error.message);
        alert('An error occurred while canceling the subscription. Please try again.');
    }
};


export const handleSubscriptionCallback = async (session_id: string) => {
    try {
        const response = await axios.get(`https://getpaidtocheat-backend.onrender.com/api/subscription/success?session_id=${session_id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        // Handle success response
        if (response.status === 200) {
            alert('Subscription created successfully.');
            // Optionally reload the page or update the UI
            window.location.reload();
        } else {
            throw new Error('Failed to create subscription.');
        }
    }
    catch (error) {
        console.log('Error generating tokens in youtube callback');
    }
}


export const updateBillingPortal = async () => {
    try {
        const response = await axios.get('https://getpaidtocheat-backend.onrender.com/api/subscription/billing-portal', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        // Handle success response
        const portalUrl = response.data.data.portalUrl;
        if (portalUrl) {
            window.location.href = portalUrl; // Redirect the user to the Stripe Billing Portal
        } else {
            throw new Error('Billing portal URL not provided.');
        }
    } catch (error: any) {
        console.error('Error updating billing portal:', error.response?.data || error.message);
        alert('An error occurred while accessing the billing portal. Please try again.');
    }
};


export const renewSubscription = async (stripeSubscriptionId: string) => {
    try {
        const response = await axios.post('https://getpaidtocheat-backend.onrender.com/api/subscription/renew', null, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            params: {
                stripeSubscriptionId, // Pass the subscription ID as a query parameter
            },
        });

        if (response.status === 200) {
            alert('Subscription renewed successfully.');
            window.location.reload();
            return response.data.data;
        } else {
            throw new Error('Failed to renew subscription.');
        }
    } catch (error: any) {
        console.error('Error renewing subscription:', error.response?.data || error.message);
        alert('An error occurred while renewing the subscription. Please try again.');
    }
};
