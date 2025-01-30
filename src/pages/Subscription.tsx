// Subscription Page
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store/hooks";
import { 
  loadSubscriptionDetails, 
  cancelUserSubscription, 
  renewUserSubscription 
} from "../redux/store/slices/subscription.slice";
import {
    createSubscription,
    handleSubscriptionCallback,
    updateBillingPortal,
} from "../services/subscription.services";

const SubscriptionPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subscriptionActive, subscriptionData, loading, error } =
    useAppSelector((state) => state.subscription);

  console.log(subscriptionActive);
  console.log(subscriptionData);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const session_id = queryParams.get("session_id");

    if (session_id) {
      handleSubscriptionCallback(session_id);
    }
  }, [location]);

  useEffect(() => {
    // Load subscription details on mount
    dispatch(loadSubscriptionDetails());
  }, [dispatch]);

  const handleSubscribe = async () => {
    await createSubscription();
  };

  const handleCancelSubscription = () => {
    if (subscriptionData?.stripeSubscriptionId) {
      dispatch(cancelUserSubscription(subscriptionData.stripeSubscriptionId));
    }
  };

  const handleRenewSubscription = () => {
    if (subscriptionData?.stripeSubscriptionId) {
      dispatch(renewUserSubscription(subscriptionData.stripeSubscriptionId));
    }
  };

  function formatDate(dateString : string) {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Invalid Date"; 
    }
  
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  }

  if (loading) return <div>Loading subscription details...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="subscription-page bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Subscription Details
      </h1>

      {subscriptionActive && subscriptionData ? (
        <div className="subscription-info bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Active Subscription</h2>
          <p className="text-lg mb-2">
            <strong>Plan:</strong> Starter Plan
          </p>
          <p className="text-lg mb-2">
            <strong>Details:</strong> Monthly $4.99 fee for cheat key access.
          </p>
          <p className="text-lg mb-2">
            <strong>Status:</strong> {subscriptionData.status}
          </p>
          <p className="text-lg mb-2">
            <strong>Payment Status:</strong> {subscriptionData.paymentStatus}
          </p>
          <p className="text-lg mb-2">
            <strong>Start Date: </strong>
            {formatDate(subscriptionData.startDate)}
          </p>
          <p className="text-lg mb-4">
            <strong>End Date: </strong>{" "}
            {formatDate(subscriptionData.endDate)}
          </p>
          <div className="flex gap-4">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-red-600 transition-colors"
              onClick={handleCancelSubscription}
            >
              Cancel Subscription
            </button>
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-gray-800 transition-colors"
              onClick={() => updateBillingPortal()}
            >
              Update Billing Info
            </button>
          </div>
        </div>
      ) : (
        <div className="subscribe-now bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
          <h2 className="text-2xl font-bold mb-4">Starter Plan</h2>
          <p className="text-lg mb-6">
            Monthly $4.99 fee for cheat key access.
          </p>
          {!subscriptionData && 
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-blue-600 transition-colors"
                onClick={handleSubscribe}
            >
                Subscribe
            </button>
          }
          {subscriptionData && subscriptionData.status === 'canceled' && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md w-full font-semibold hover:bg-green-600 transition-colors mt-4"
              onClick={handleRenewSubscription}
            >
              Renew Subscription
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
