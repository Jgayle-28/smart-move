import React from 'react'
import { Container, Typography, Box, Paper, Divider, Link } from '@mui/material'
import { usePageView } from 'src/hooks/use-page-view'
import { Seo } from 'src/components/seo'

const TermsOfServicePage = () => {
  usePageView()
  return (
    <>
      <Seo title='Deliverly: Terms Of Service' />
      <Container maxWidth='md' sx={{ py: 8 }}>
        <Box sx={{ padding: 3 }}>
          <Paper elevation={3} sx={{ padding: 4 }}>
            <Typography variant='h3' gutterBottom>
              Terms of Service
            </Typography>
            <Typography variant='body1' paragraph>
              <strong>Effective Date: 01/01/2023</strong>
            </Typography>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant='h5' gutterBottom>
              1. Introduction
            </Typography>
            <Typography variant='body1' paragraph>
              Welcome to Deliverly! These Terms of Service (“Terms”) govern your
              access to and use of the Deliverly platform and services provided
              by [Your Company Name] (“Deliverly,” “we,” “us,” or “our”). By
              using our services, you agree to comply with and be bound by these
              Terms. If you do not agree with any part of these Terms, you may
              not use our services.
            </Typography>

            <Typography variant='h5' gutterBottom>
              2. Account Registration and Responsibilities
            </Typography>
            <Typography variant='body1' paragraph>
              To access Deliverly’s services, you may be required to create an
              account. You are responsible for maintaining the confidentiality
              of your account credentials and for all activities that occur
              under your account. You agree to provide accurate, current, and
              complete information during the registration process and keep your
              account information updated.
            </Typography>

            <Typography variant='h5' gutterBottom>
              3. Use of Services
            </Typography>
            <Typography variant='body1' paragraph>
              Deliverly provides tools and resources for managing moving and
              delivery operations. You agree to use our services solely for
              lawful purposes, in accordance with these Terms, and in compliance
              with all applicable laws and regulations.
            </Typography>

            <Typography variant='h5' gutterBottom>
              4. Data Privacy and Security
            </Typography>
            <Typography variant='body1' paragraph>
              Your data is a top priority. All information is encrypted and
              securely stored. We use industry-standard security practices to
              ensure the protection of your business and customer information.
              However, we cannot guarantee absolute security against all risks.
              You are responsible for maintaining the confidentiality of your
              data and ensuring it is accurate.
            </Typography>

            <Typography variant='h5' gutterBottom>
              5. Intellectual Property
            </Typography>
            <Typography variant='body1' paragraph>
              All content, features, and functionality of the Deliverly
              platform, including text, graphics, logos, and software, are owned
              by [Your Company Name] or its licensors and are protected by
              copyright, trademark, and other intellectual property laws. You
              are granted a limited, non-transferable, non-exclusive license to
              access and use Deliverly’s services for your business needs.
            </Typography>

            <Typography variant='h5' gutterBottom>
              6. Payment Terms
            </Typography>
            <Typography variant='body1' paragraph>
              Certain features of Deliverly may require payment. You agree to
              pay all fees associated with your use of the platform as specified
              in your subscription plan or other agreements. Payments are due
              based on the billing cycle you select, and late payments may
              result in service interruptions or account termination.
            </Typography>

            <Typography variant='h5' gutterBottom>
              7. Limitations of Liability
            </Typography>
            <Typography variant='body1' paragraph>
              Deliverly shall not be held liable for any direct, indirect,
              incidental, special, or consequential damages arising out of or
              related to your use of the platform or inability to access the
              services. Our liability is limited to the maximum extent permitted
              by law.
            </Typography>

            <Typography variant='h5' gutterBottom>
              8. Termination
            </Typography>
            <Typography variant='body1' paragraph>
              We reserve the right to suspend or terminate your account at any
              time for any reason, including violation of these Terms or illegal
              activities. You may also terminate your account at any time by
              notifying us and discontinuing use of the platform.
            </Typography>

            <Typography variant='h5' gutterBottom>
              9. Modifications to Terms
            </Typography>
            <Typography variant='body1' paragraph>
              We reserve the right to modify these Terms at any time. Any
              changes will be posted on this page with an updated effective
              date. Continued use of the services after changes have been made
              constitutes your acceptance of the new Terms.
            </Typography>

            <Typography variant='h5' gutterBottom>
              10. Governing Law and Dispute Resolution
            </Typography>
            <Typography variant='body1' paragraph>
              These Terms are governed by the laws of [Your Country or State].
              Any disputes arising from or related to these Terms will be
              resolved through binding arbitration in accordance with the rules
              of [Arbitration Organization], with the venue located in [Your
              Location].
            </Typography>

            <Typography variant='h5' gutterBottom>
              11. Miscellaneous
            </Typography>
            <Typography variant='body1' paragraph>
              If any provision of these Terms is found to be unenforceable, the
              remaining provisions will remain in full effect. These Terms
              constitute the entire agreement between you and Deliverly
              regarding the use of our services.
            </Typography>

            <Typography variant='h5' gutterBottom>
              12. Contact Us
            </Typography>
            <Typography variant='body1' paragraph>
              If you have any questions about these Terms or our services,
              please contact us at:
            </Typography>
            <Typography variant='body1' paragraph>
              Email: support@deliverly.com
            </Typography>
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default TermsOfServicePage
