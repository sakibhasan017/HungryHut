import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-container">
      <h1>Privacy Policy</h1>
      <p className="last-updated">Last updated: June 16, 2025</p>

      <section>
        <h2>1. Introduction</h2>
        <p>
          At HungryHut, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
        </p>
      </section>

      <section>
        <h2>2. Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul>
          <li>Personal Data (e.g., name, email, address, phone)</li>
          <li>Order history and preferences</li>
          <li>Device and browser information</li>
          <li>Location data (with your permission)</li>
        </ul>
      </section>

      <section>
        <h2>3. How We Use Your Information</h2>
        <p>We use your data to:</p>
        <ul>
          <li>Provide and manage your orders</li>
          <li>Improve our platform and services</li>
          <li>Send promotional content (you can opt out)</li>
          <li>Ensure platform security and prevent fraud</li>
        </ul>
      </section>

      <section>
        <h2>4. Sharing Your Data</h2>
        <p>We do not sell your data. We may share your data with:</p>
        <ul>
          <li>Payment providers (e.g., Stripe)</li>
          <li>Service providers assisting in delivery</li>
          <li>Law enforcement, when legally required</li>
        </ul>
      </section>

      <section>
        <h2>5. Data Security</h2>
        <p>
          We implement modern security measures to protect your information, including encryption, secure servers, and limited access to your data.
        </p>
      </section>

      <section>
        <h2>6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access, update, or delete your data</li>
          <li>Withdraw consent for data usage</li>
          <li>Contact us with privacy concerns</li>
        </ul>
      </section>

      <section>
        <h2>7. Changes to This Policy</h2>
        <p>
          We may update this policy occasionally. Any changes will be posted here and, if significant, notified to you via email or platform message.
        </p>
      </section>

      <section>
        <h2>8. Contact Us</h2>
        <p>If you have any questions about our privacy practices, please contact us at: <strong>support@hungryhut.com</strong></p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
