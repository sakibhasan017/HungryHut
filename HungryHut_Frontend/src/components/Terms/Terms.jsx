import React from 'react';
import './Terms.css';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Terms & Conditions</h1>
      <p>Last updated: June 2025</p>

      <section>
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using HungryHut’s services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our platform.
        </p>
      </section>

      <section>
        <h2>2. Services Offered</h2>
        <p>
          HungryHut provides an online food ordering and delivery platform. We do not prepare or deliver food ourselves; all meals are prepared by partner restaurants.
        </p>
      </section>

      <section>
        <h2>3. User Accounts</h2>
        <p>
          Users must register and maintain accurate account information. You are responsible for safeguarding your login credentials and any activity under your account.
        </p>
      </section>

      <section>
        <h2>4. Payments</h2>
        <p>
          All prices are listed in BDT. Payment is processed securely through third-party payment gateways. We are not liable for any transaction failures caused by them.
        </p>
      </section>

      <section>
        <h2>5. Refunds & Cancellations</h2>
        <p>
          Orders cannot be canceled once confirmed. Refunds are issued only under exceptional circumstances, such as restaurant cancellation or payment failure.
        </p>
      </section>

      <section>
        <h2>6. Prohibited Activities</h2>
        <p>
          Users may not misuse our platform for unlawful purposes, send spam, or attempt to disrupt system operations through hacking or automated scripts.
        </p>
      </section>

      <section>
        <h2>7. Intellectual Property</h2>
        <p>
          All content, logos, and branding on HungryHut are the intellectual property of HungryHut or its licensors and may not be used without permission.
        </p>
      </section>

      <section>
        <h2>8. Changes to Terms</h2>
        <p>
          HungryHut reserves the right to update these Terms at any time. We encourage users to review this page periodically for any changes.
        </p>
      </section>

      <section>
        <h2>9. Contact Us</h2>
        <p>
          For questions regarding these Terms & Conditions, contact us at <a href="mailto:support@hungryhut.com">support@hungryhut.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Terms;
