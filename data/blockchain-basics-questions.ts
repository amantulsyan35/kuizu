export const blockchainBasics = [
  {
    id: 1,
    question:
      'Blockchain has many components. Which of these is not a component of a blockchain ?',
    options: [
      'Messages, in the form of transactions, representing state transitions',
      ' A state machine that processes transactions according to the consensus rules',
      'A third-part which verifies all the transactions ',
      ' A chain of cryptographically secured blocks that acts as a journal of all the verified and accepted state transitions',
    ],
    answer: 'A third-part which verifies all the transactions',
  },
  {
    id: 2,
    question:
      'To prevent bad actors from validating bad transactions or double spends, blockchains are secured by a consensus mechanism. Which of the following is a consensus mechanism ?',
    options: [
      'Proof of Computer',
      'Proof of Work',
      'Proof of Funds',
      'Proof of Country',
    ],
    answer: 'Proof of Work',
  },
  {
    id: 3,
    question:
      'The innovation with a blockchain is that it guarantees the fidelity and security of a record of data and generates trust without the need for a trusted third party.',
    options: ['True', 'False'],
    answer: 'True',
  },
  {
    id: 4,
    question: 'Which of the following is not a blockchain ?',
    options: ['Bitcoin', 'Visa', 'Ethereum', 'Cardano'],
    answer: 'Visa',
  },
  {
    id: 5,
    question: 'Each block of a Blockchain consists of which of the following ?',
    options: [
      'A hash pointer to the previous block',
      'Timestamp',
      'List of Transactions',
      'All of the above',
    ],
    answer: 'All of the above',
  },
  {
    id: 6,
    question:
      'Hash identifying each block in the Blockchain is generated using which of the following cryptographic algorithm? ',
    options: ['SHA128', 'SHA256'],
    answer: 'SHA256',
  },
  {
    id: 7,
    question: 'What is the purpose of a nonce?',
    options: [
      'Follow Nouns',
      'A hash function',
      'Prevents double spending',
      'Sends info to the the blockchain network',
    ],
    answer: 'Prevents double spending',
  },
  {
    id: 8,
    question: 'What characteristic makes blockchain tamper-proof?',
    options: ['VPN', 'Immutability', 'Cryptocurrency', 'Servers'],
    answer: 'Immutability',
  },
  {
    id: 9,
    question: 'What is the term for when a blockchain splits? ',
    options: ['A fork', 'A merger', 'A sidechain'],
    answer: 'A fork',
  },
  {
    id: 10,
    question:
      'What incentivizes the miners to give correct validation of transactions?',
    options: ['A nonce', 'A block reward', 'Upvote', 'More memory'],
    answer: 'A block reward',
  },
];
