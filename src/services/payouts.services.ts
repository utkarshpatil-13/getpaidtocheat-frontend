import axios from 'axios';

const token = localStorage.getItem('accessToken');

export const approvePayouts = async (userId: string, contentAmounts: Record<string, number>) => {
  try {
    console.log(contentAmounts);
    const response = await axios.post('http://localhost:3000/api/payout/approve',
      {
        userId,
        contentAmounts
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.success === false) {
      throw {
        message: response.data?.message || 'Failed to approve payouts',
        status: response.status,
      };
    }
    console.log('Payouts approved successfully: ', response.data.message);
    alert('Payouts approved successfully: ' + response.data.message);

    return response.data.data; // Return the approved payouts or related data
  } catch (error: any) {
    console.log(error);
    alert(error.response?.data?.message || 'Failed to approve payouts');
    console.error('Error approving payouts:', error.response?.data);

    // Check if error response exists
    if (error.response) {
      // Throw an error object with a clear message and status code
      throw {
        message: error.response.data?.message || 'Failed to approve payouts',
        status: error.response.status,
      };
    }

    // Throw a generic error for unexpected issues
    throw { message: 'Something went wrong while approving payouts', status: 500 };
  }
};


export const fetchPayouts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/api/payout', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });

    if (response.data.success === false) {
      throw {
        message: response.data?.message || 'Failed to fetch payouts',
        status: response.status,
      };
    }

    console.log(response.data);
    return response.data.data;
  }
  catch (error: any) {
    // Check if error response exists
    if (error.response) {
      // Throw an error object with a clear message and status code
      throw {
        message: error.response.data?.message || 'Failed to fetch payouts',
        status: error.response.status,
      };
    }

    // Throw a generic error for unexpected issues
    throw { message: 'Something went wrong while fetching payouts', status: 500 };
  }
}

export const processPayouts = async (amount:number) => {
  try {
    const response = await axios.post('http://localhost:3000/api/payout/process',
      {
        'amount' : amount
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
      }
    );

    if (response.data.success === false) {
      throw {
        message: response.data?.message || 'Failed to process payouts',
        status: response.status,
      };
    }

    console.log(response.data);
    return response.data.data;
  }
  catch(error : any){
    if (error.response) {
      // Throw an error object with a clear message and status code
      throw {
        message: error.response.data?.message || 'Failed to process payouts',
        status: error.response.status,
      };
    }

    // Throw a generic error for unexpected issues
    throw { message: 'Something went wrong while processing payouts', status: 500 };
  }
}