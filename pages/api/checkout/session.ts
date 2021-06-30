import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe('sk_test_51J6jlRDf7AV3vT7nwSHT9SsiUtbmKrExjEjuBaOcnrqC9RJWEPwOZLmutsFlgHBQOgJIRQP8lg9SM35c766MQDMi00iFVe4Kkp', {
	apiVersion: '2020-08-27'
})


export default async (req: NextApiRequest, res: NextApiResponse) => {
	const {quantity} = req.body
	const session = await stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: [{
				price: "price_1J6jnhDf7AV3vT7nS2LGVEqQ",
				quantity,
			}],
			mode: 'payment',
			success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${req.headers.origin}/checkout`,
		})
	res.status(200).json({sessionId: session.id})
}
