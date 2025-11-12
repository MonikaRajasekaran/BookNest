import React from 'react'

function BookingCard() {
  return (
    <>
     <div className="mt-4">
              <p>₹6,016 x 5 nights</p>
              <p>Total: ₹30,080</p>
              <p>Special offer: -₹6,016</p>
              <p>Service fee: ₹3,397</p>
              <p className="font-bold">Total before taxes: ₹27,461</p>
            </div>

            <div className="mt-4 text-gray-500 text-sm">
              Only 14 hours left to book. The host will stop accepting bookings soon.
            </div></>
  )
}

export default BookingCard