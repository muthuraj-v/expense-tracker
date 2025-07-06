import React from "react";

type PopUpProps = {
  openPopUp: boolean;
  closePopUp: () => void;
  data: {
    date: string;
    amount: string;
    category: string;
    paymentMethod: string;
    notes: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const PopUp: React.FC<PopUpProps> = ({
  openPopUp,
  closePopUp,
  data,
  handleChange,
  handleSubmit,
}) => {
  const handleClosePopUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "ModelContainer") {
      closePopUp();
    }
  };

  if (!openPopUp) return null;

  return (
    <div
      id="ModelContainer"
      onClick={handleClosePopUp}
      className="fixed inset-0 bg-black flex justify-center items-center bg-opacity-20 backdrop-blur-sm z-10000"
    >
      <div className="p-5 bg-white w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold text-center mb-5">
          Update Expense
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date
            </label>
            <input
              type="date"
              id="date"
              required
              value={data.date}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                min={0}
                required
                value={data.amount}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 text-sm pr-8"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
                ₹
              </span>
            </div>
          </div>

          <div className="mb-3">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              name="category"
              id="category"
              required
              value={data.category}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Salary">Salary</option>
              <option value="Freelance">Freelance</option>
              <option value="Investments">Investments</option>
              <option value="Gift">Gift</option>
              <option value="Interest">Interest</option>
              <option value="Refund">Refund</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="paymentMethod"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Payment Method
            </label>
            <select
              name="paymentMethod"
              id="paymentMethod"
              required
              value={data.paymentMethod}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm"
            >
              <option value="" disabled>
                Select Payment Method
              </option>
              <option value="cash">Cash</option>
              <option value="online">Online</option>
              <option value="netbanking">NetBanking</option>
              <option value="card">Card</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Notes
            </label>
            <input
              type="text"
              id="notes"
              required
              value={data.notes}
              onChange={handleChange}
              placeholder="Add notes about this transaction"
              className="w-full border rounded-md px-3 py-2 text-sm"
            />
          </div>

          <div className="flex justify-end gap-2 mt-5">
            <button
              type="button"
              onClick={closePopUp}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
            >
              Update Expense
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopUp;
