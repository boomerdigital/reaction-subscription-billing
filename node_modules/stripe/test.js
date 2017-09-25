var stripe = require("./lib/stripe")(
  "sk_test_BQokikJOvBiI2HlWgH4olfQ2"
);

stripe.invoices.retrieve(
  undefined,
  function(err, invoice) {
    if (err != null) {
      console.log(err);
    } else {
      console.log(invoice);
    }
  }
);
