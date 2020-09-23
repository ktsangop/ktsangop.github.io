// Test for apple pay support and create a payment request
var applePaySession;

function onApplePayClicked() {
  if (window.ApplePaySession && ApplePaySession.canMakePayments()) {
    const request = {
      "countryCode": "US",
      "currencyCode": "USD",
      "merchantCapabilities": [
        "supports3DS"
      ],
      "supportedNetworks": [
        "visa",
        "masterCard",
        "amex",
        "discover"
      ],
      "total": {
        "label": "Demo (Card is not charged)",
        "type": "final",
        "amount": "1.99"
      }
    };
  
    applePaySession = new ApplePaySession(3, request);
    applePaySession.begin();
    applePaySession.onvalidatemerchant = event => validateMerchant(event);
    applePaySession.onpaymentmethodselected = event => paymentMethodSelected(event);
    applePaySession.onpaymentauthorized = event => paymentAuthorized(event);
    applePaySession.oncancel = () => onCancelSession();

  } else {
    alert(`ApplePaySession : ${!!window.ApplePaySession}, canMakePayments(): ${!!window.ApplePaySession && ApplePaySession.canMakePayments()}`);
  }

}

function validateMerchant(merchantEvent) {
  const paymentSetupRequest = {
    type: PaymentSetupType.APPLE_PAY,
    applePayValidationUrl: merchantEvent.validationURL
  };

  applePaySession.completeMerchantValidation(paymentSetupRequest)
}

function onCancelSession() {
  console.log('cancelled');
}