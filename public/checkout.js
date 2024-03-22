// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripe = Stripe("pk_test_51OltjaF3zNKFoJUZRvOXqdV9WSgJmaYCbmmPXSgBRUh0mwHLDAMc6cbI5QhE0hQNloRXtibfr5lELEy6wcewjETm004FSxEXoU");

initialize();

// Create a Checkout Session as soon as the page loads
async function initialize() {
  const response = await fetch("https://grupolimpio-api.onrender.com/create-checkout-session", {
    method: "POST",
  });

  const { clientSecret } = await response.json();

  const checkout = await stripe.initEmbeddedCheckout({
    clientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}