const PaymentModel = ({ isOpen, onClose, onSubmit }) => {
    const [customerDetails, setCustomerDetails] = useState({
      name: '',
      email: '',
      contact: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setCustomerDetails((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit(customerDetails);
      onClose();
    };
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Contact:</label>
              <input
                type="text"
                name="contact"
                value={customerDetails.contact}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Enter your contact number"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Amount:</label>
              <input
                type="text"
                value={totalFees} // Assuming totalFees is passed as a prop
                className="w-full px-3 py-2 border rounded-lg"
                readOnly
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg"
            >
              Pay Now
            </button>
          </form>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    );
  };

  export default PaymentModel;
  