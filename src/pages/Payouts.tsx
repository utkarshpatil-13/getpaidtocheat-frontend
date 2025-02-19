import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/hooks';
import { loadUserPayouts } from '../redux/store/slices/payout.slice';
import { useParams } from 'react-router-dom';
import PayoutsNav from '../components/content/PayoutsNav';

const Payouts = () => {
  const { payouts, loading, error } = useAppSelector((state) => state.payout);
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [disburseAmount, setDisburseAmount] = useState(0); // Input state for amount


  const { subpage } = useParams();

  useEffect(() => {
    dispatch(loadUserPayouts());
  }, [dispatch]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setDisburseAmount(0); // Clear input
  };

  const handleProcessPayout = (amount: number) => {
    // dispatch(processPayout(amount))
    //     .unwrap()
    //     .then(() => {
    //         alert("Payout processed successfully!");
    //     })
    //     .catch((error : any) => {
    //         console.error("Error:", error);
    //         alert(error);
    //     });
    console.log(amount);
    alert('payment module under construction');
  };

  // Calculate the total approved amount
  const totalApprovedAmount = payouts
    ?.filter((payout) => payout.status === 'approved')
    .reduce((sum, payout) => sum + payout.amountEarned + payout.amountDisbursed, 0) || 0;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Payouts</h2>
      <PayoutsNav subpage={subpage} />

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {
        subpage === 'transactions' && (
          <div>
            Transactions
          </div>
        )
      }

      {subpage === undefined && !loading && !error && (
        <div>
          {/* Table to display payouts */}
          <table className="table-auto w-full border border-gray-300 mb-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Content ID</th>
                <th className="p-2 border">Status</th>
                <th className="p-2 border">Total Views</th>
                <th className="p-2 border">Incremental Views</th>
                <th className="p-2 border">Amount Earned</th>
                <th className="p-2 border">Amount Disbursed</th>
                <th className="p-2 border">Balance Due</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {payouts?.map((payout) => (
                <tr key={payout.id}>
                  <td className="p-2 border">{payout.id}</td>
                  <td className="p-2 border">{payout.contentId}</td>
                  <td className="p-2 border">{payout.status}</td>
                  <td className="p-2 border">{payout.totalViews}</td>
                  <td className="p-2 border">{payout.incrementalViews}</td>
                  <td className="p-2 border">${payout.amountEarned.toFixed(2)}</td>
                  <td className="p-2 border">${payout.amountDisbursed.toFixed(2)}</td>
                  <td className="p-2 border">${payout.balanceDue.toFixed(2)}</td>
                  <td className="p-2 border">{new Date(payout.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Approved Amount */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">
              Total Approved Amount to be Disbursed: ${totalApprovedAmount.toFixed(2)}
            </h3>
          </div>

          {/* Disburse Button */}
          <button
            onClick={handleOpenModal}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Disburse Amount
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-bold mb-4">Disburse Amount</h3>

            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Enter Amount to Disburse:
              </label>
              <input
                type="number"
                id="amount"
                value={disburseAmount}
                onChange={(e) => setDisburseAmount(parseInt(e.target.value))}
                className="mt-1 p-2 w-full border rounded"
                placeholder="Enter amount"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleProcessPayout(disburseAmount)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
              >
                Process Payout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payouts;
