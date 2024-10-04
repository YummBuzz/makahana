import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../footer/Footer";

export default function Terms() {
  return (
    <>
      <Navbar pdScroll={0} />
      <div className="about-page-section1 margin-div mt-5">
        <div className="container">
          <div className="row about-page-content">
            <div className="col-12 about-page-head">
              <h2 className="mb-5">
                Terms & <span>Conditions </span>
              </h2>
            </div>
          </div>
          <h3 style={{ fontWeight: "700" }}>Introduction</h3>
          <pre
            className="privacy-text mt-3 mb-4"
            style={{ width: "100%", whiteSpace: "pre-wrap" }}
          >
            Welcome to PECUMER! These Terms and Conditions ("Terms") govern
            your access to and use of our website located at [yourwebsite.com]
            (the "Site"), as well as the purchase of products and services
            offered by us. By accessing or using our Site, you agree to comply
            with and be bound by these T erms. If you do not agree to these T
            erms, you should not use our Site.
            <br />
            <br />
            <h5 style={{ fontWeight: "700" }}>Changes to Terms</h5>
            <br />

            We reserve the right to modify or update these T erms at any time.
            Any changes will be effective immediately upon posting on the Site.
            Your continued use of the Site after any changes signifies your
            acceptance of the revised T erms. We encourage you to review these T
            erms periodically for any updates.
            <br />
            <br />
            <strong>Use of the Site</strong>
            <br />
            <br />
            <strong>Eligibility: </strong>To use the Site, you must be at least
            13 years old and capable of forming legally binding contracts. By
            using the Site, you represent and warrant that you meet these
            eligibility requirements.
            <br />
            <br />
            <strong>Account Creation: </strong>
            T o access certain features of the Site, you may need to create an
            account. You are responsible for maintaining the confidentiality of
            your account information, including your username and password, and
            for all activities that occur under your account. You agree to
            notify us immediately of any unauthorized use of your account or any
            other breach of security. We will not be liable for any loss or
            damage arising from your failure to protect your account
            information.
            <br />
            <br />
            <strong>Prohibited Conduct: </strong> You agree not to:
            <br />
            <br />
            <ul>
              <li>Use the Site for any illegal or unauthorized purpose.</li>
              <li>
                Violate any local, state, national, or international law or
                regulation.
              </li>
              <li>
                Engage in any conduct that restricts or inhibits anyone’s use or
                enjoyment of the Site, or which, as determined by us, may harm
                PECUMER or users of the Site or expose them to liability.
              </li>
              <li>
                Introduce any viruses, trojan horses, worms, logic bombs, or
                other material that is malicious or technologically harmful.
              </li>
              <li>
                Attempt to gain unauthorized access to, interfere with, damage,
                or disrupt any part of the Site, the server on which the Site is
                stored, or any server, computer, or database connected to the
                Site.
              </li>
              <li>
                Use any automated system, including but not limited to, robots,
                spiders, or data mining tools, to access the Site or collect any
                information from the Site.
              </li>
            </ul>
            <br />
            <br />
            <strong>Intellectual Property</strong>
            <br />
            <br />
            <strong> Ownership:</strong> All content on the Site, including but
            not limited to text, graphics, logos, images, and software, is the
            property of PECUMER or its licensors and is protected by
            intellectual property laws. You may not reproduce, distribute,
            modify, or create derivative works from any content on the Site
            without our prior written consent.
            <br />
            <br />
            <strong>Trademarks:</strong> The trademarks, service marks, and
            logos used and displayed on the Site are registered and unregistered
            trademarks of PECUMER and its affiliates. Nothing on the Site
            should be construed as granting, by implication, estoppel, or
            otherwise, any license or right to use any trademark displayed on
            the Site without our prior written consent.
            <br />
            <br />
            <strong>Product Descriptions and Availability</strong> <br />
            <br />
            <strong>Product Descriptions:</strong> We strive to ensure that our
            product descriptions are accurate. However, we do not warrant that
            product descriptions, pricing, or other content on the Site is
            accurate, complete, reliable, current, or error-free. If a product
            offered on the Site is not as described, your sole remedy is to
            return it in unused condition for a refund or exchange.
            <br />
            <br />
            <strong> Availability:</strong> All products are subject to
            availability. We reserve the right to limit the quantity of products
            we supply, and we may discontinue any product at any time without
            prior notice.
            <br />
            <br />
            <strong> Orders and Payments</strong> <br />
            <br />
            <strong>Order Acceptance:</strong>
            All orders are subject to our acceptance. We reserve the right to
            refuse or cancel any order at our sole discretion, including but not
            limited to cases where:
            <ul>
              <li>There is an error in the product description or pricing.</li>
              <li>
                There is a suspicion of fraudulent or unauthorized activity.
              </li>
              <li>We are unable to process your payment.</li>
            </ul>
            <br />
            {/* <br /> */}
            <strong>Pricing and Charges:</strong>
            All prices are listed in Rupees (Rs.) and are subject to change
            without notice. Prices do not include applicable taxes or shipping
            and handling charges. You are responsible for paying all taxes and
            shipping costs.
            <br />
            <br />
            <strong>Payment:</strong> Payment for products must be made using
            the payment methods specified on the Site. By submitting your
            payment information, you authorize us to charge the total amount to
            your chosen payment method. We use third-party payment processors to
            handle payment transactions, and we do not store your payment
            information.
            <br />
            <br />
            <strong>Shipping and Delivery</strong>
            <br />
            <br />
            
            <strong> Shipping:</strong>
            We will arrange for the shipment of products to you based on the
            shipping method you select during checkout. Shipping costs and
            delivery times will be provided at the time of order.
            <br />
            <br />
            <strong> Delivery:</strong>
            Delivery times are estimates and may vary depending on your location
            and other factors. We are not liable for any delays in delivery.
            Risk of loss and title for products pass to you upon delivery.
            <br />
            <br />
            <strong> International Shipping:</strong>
            For international orders, you are responsible for any customs
            duties, taxes, and other charges that may apply.
            <br />
            <br />
            <strong> Return Policy:</strong>
            You may return most new, unopened items within 3 days of delivery
            for a full refund. Returns must be accompanied by a receipt or proof
            of purchase. Items should be returned in their original packaging
            and in a resalable condition.
            <br />
            <br />
            <strong> Refunds:</strong>
            Refunds will be processed within 14 days of our receipt of the
            returned items. Refunds will be credited to your original method of
            payment. We do not refund shipping and handling charges unless the
            return is a result of our error.
            <br />
            <br />
            <strong> Exchanges:</strong>
            We will provide exchanges for items that are defective or damaged
            upon receipt. Please contact our customer service team for
            assistance with exchanges.
            <br />
            <br />
            <strong>Limitation of Liability</strong>
            <br />
            <br />
            To the fullest extent permitted by law, PECUMER and its
            affiliates, officers, directors, employees, and agents shall not be
            liable for any indirect, incidental, special, consequential, or
            punitive damages, including but not limited to loss of profits,
            data, use, goodwill, or other intangible losses, arising from or
            related to your use of the Site or the products purchased through
            the Site.
            <br />
            <br />
            <strong> No Warranty:</strong>
            The Site and all products and services are provided on an "as is"
            and "as available" basis. We make no warranties, express or implied,
            regarding the Site, products, or services, including but not limited
            to implied warranties of merchantability, fitness for a particular
            purpose, or non-infringement. <br />
            <br /> <strong>Indemnification</strong> <br />
            <br /> You agree to indemnify, defend, and hold harmless PECUMER
            and its affiliates, officers, directors, employees, agents, and
            partners from and against any claims, liabilities, damages, losses,
            costs, or expenses, including reasonable attorneys' fees, arising
            out of or related to your use of the Site, violation of these T
            erms, or any infringement of any intellectual property or other
            right of any person or entity. <br />
            <br />
            <strong>Governing Law and Dispute Resolution</strong> <br />
            <br />
            <strong>Governing Law:</strong> These T erms and any disputes
            arising out of or related to these T erms or the Site shall be
            governed by and construed in accordance with the laws of New Delhi,
            India, without regard to its conflict of law principles. <br />
            <br />
            <strong>Dispute Resolution:</strong>  Any disputes or claims arising out of or related to these T erms or the Site
shall be resolved through binding arbitration in New Delhi, India in accordance with the rules of
Arbitration Organization. You agree to waive any right to a jury trial or to participate in a class
action. <br />
            <br />
            <strong>Severability</strong>
            <br />
            <br />
            If any provision of these T erms is found to be invalid, illegal, or unenforceable, the remaining
provisions will continue in full force and effect. The invalid or unenforceable provision will be
deemed modified to the extent necessary to make it enforceable.
<br />
<br />
            <strong> Termination</strong>
            <br />
            <br />
            We reserve the right to terminate or suspend your access to the Site, without prior notice, for
any reason, including if you breach these T erms. Upon termination, your right to use the Site will
immediately cease, and we may, at our discretion, delete your account and any information
associated with it.
            <br />
            <br />
            <strong> Contact Us</strong> <br />
            <br /> If you have any questions or concerns about these T erms, please contact us at:
            <br />
            <br />
            PECUMER <br /> 1202, Vijaya building, Connaught place <br /> New
            Delhi, 110001 <br />
            indiafarmspolicy@gmail.com <br /> 8986927873
          </pre>
        </div>
      </div>
      <Footer />
    </>
  );
}
