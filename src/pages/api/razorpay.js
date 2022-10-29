
const Razorpay = require("razorpay");

export default async function handler(req, res) {

  if (req.method ===  "POST") {
    // Initialize razorpay object
    const razorpay = new Razorpay({
      key_id: process.env.Razorpay_PUBLIC_KEY,
      key_secret: process.env.Razorpay_SECRET_KEY,
    });

    // Create an order -> generate the OrderID -> Send it to the Front-end
    // Also, check the amount and currency on the backend (Security measure)
    const payment_capture = 1;
    const amount = Math.ceil(req.body?.total);
    const currency = "INR";
    const options = {
      amount:(amount * 100).toString(),
      currency,
      payment_capture,
    };

    // try {
      const response = await razorpay.orders.create(options);
      res.status(200).json({
        id: response.id,
        currency: response.currency,
        amount: response.amount,
      });

    // } catch (err) {
    //   console.log(err);
    //   res.status(400).json(err);
    // }
  } else {
    // Handle any other HTTP method
  }
}
