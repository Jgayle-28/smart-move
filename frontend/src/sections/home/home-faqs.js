import { useState } from 'react'

import {
  Box,
  Collapse,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material'
import { motion } from 'framer-motion'

// Animation variants
const textVariant = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
}
const textVariant2 = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.3 } },
}

const faqs = [
  {
    question: 'Do you have a free trial to try Deliverly before purchasing?',
    answer:
      'Yes, we have a 7-day free trial. You can try all the features of Deliverly before purchasing for all new customers.',
  },
  {
    question: 'Is my data safe on Deliverly?',
    answer:
      " Absolutely! Your data is our top priority. All information is encrypted and securely stored, following industry-standard security practices. We're committed to keeping your data safe, so you can trust Deliverly to protect your business and customer information at all times.",
  },
  {
    question:
      'Is there limits to the number of customers, jobs or estimates I can create?',
    answer:
      ' Not at all! With Deliverly, you can create and manage as many customers, jobs, and estimates as you need—without any restrictions. Scale your business seamlessly, and input all the data required to keep your operations running smoothly.',
  },
  {
    question: 'Is Deliverly mobile friendly?',
    answer:
      "Yes, Deliverly is fully responsive and works on all devices. You can use it on your desktop, tablet, or mobile phone. It's designed to work on all devices. How ever, we recommend using a desktop or tablet for the best experience.",
  },
  {
    question: 'I do basic moves & deliveries, is Deliverly right for me?',
    answer:
      "Absolutely! Deliverly is the perfect solution for small to medium-sized moving and delivery companies, including those that handle basic moves. Our platform streamlines your operations, providing the tools you need to manage quotes, estimate costs, and deliver a professional service to your customers with ease. Whether you're managing local moves or routine deliveries, Deliverly helps you work smarter, not harder.",
  },
]

const Faq = (props) => {
  const { answer, question } = props
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Stack
      onClick={() => setIsExpanded((prevState) => !prevState)}
      spacing={2}
      sx={{ cursor: 'pointer' }}
    >
      <Stack
        alignItems='center'
        direction='row'
        justifyContent='space-between'
        spacing={2}
      >
        <Typography variant='subtitle1'>{question}</Typography>
        <SvgIcon>
          {/* {isExpanded ? <ChevronDownIcon /> : <ChevronRightIcon />} */}
        </SvgIcon>
      </Stack>
      <Collapse in={isExpanded}>
        <Typography color='text.secondary' variant='body2'>
          {answer}
        </Typography>
      </Collapse>
    </Stack>
  )
}

export const HomeFaqs = () => {
  return (
    <Box sx={{ py: '120px' }}>
      <Container maxWidth='lg'>
        <Grid container spacing={4}>
          <Grid xs={12} md={6}>
            <Stack spacing={2}>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariant}
              >
                <Typography variant='h3'>
                  Everything you need to know
                </Typography>
              </motion.div>
              <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true, amount: 0.2 }}
                variants={textVariant2}
              >
                <Typography color='text.secondary' variant='subtitle2'>
                  Frequently asked questions
                </Typography>
              </motion.div>
            </Stack>
          </Grid>
          <Grid xs={12} md={6}>
            <Stack spacing={4}>
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial='hidden'
                  whileInView='visible'
                  viewport={{ once: true, amount: 0.2 }} // Trigger when the feature comes into view
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.1,
                        delay: index * 0.1, // Delay each item based on its index
                        ease: 'easeIn',
                      },
                    },
                  }}
                >
                  <Faq {...faq} />
                </motion.div>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
