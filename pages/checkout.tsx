import {loadStripe} from "@stripe/stripe-js";
import { NextPage } from "next";

const stripePromise = loadStripe('pk_test_51J6jlRDf7AV3vT7nwyS3c0mRMpSR885jUAE5bcIgvBKz6pDTU5Uh1DEqTaiCOmmslVn1PHZ4H85BbaqOWOn2fSZo00Voglo48M')
export default function Checkout() {
	const handleClick = async (event) => {
		const {sessionId} = await fetch('/api/checkout/session', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({quantity: 1})
		}).then(res => res.json())
		const stripe = await stripePromise
		const {error} = await stripe.redirectToCheckout({
			sessionId,
		})
	}
	return (
		<div>
			<h1>Test</h1>
			<button role="link" onClick={handleClick}>Pay</button>
		</div>
	)
}
