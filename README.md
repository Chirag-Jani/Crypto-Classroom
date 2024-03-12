# QUASAR2.0 PROJECT README

## TOPIC: Smart Education 

- CryptoClassroom (CCR) is a platform where learners and educators can come together to earn rewards by teaching and learning


## Features?

- Bonus ERC20 tokens on signup
- Earn more Tokens on Creating Cources
    - Via cource fees for educators
    - Via completion of the cources for learners
- Proof of learning NFTs creted by educators (designer to be added in future version)
- Video cources (Single video supported as of now, playlist in future versions)


## Implementation roadmap

- Smart contracts
    - Token contract (CCR)
    - Manager Contract 
        - Auth (Signup & Login)
        - Create Course
        - Update Course
        - Enroll in course
        - Withdraw earnings 
            - Can be native as well as CCR tokens

- Frontend
    - Login & Signup page
    - Homepage 
        - Lists all the available courses for enrollment
    - Profile page
        - Available tokens and funds
            - ETH / Matic / BNB
            - CCR / USDT (future)
    - Course Details page
        - Shows Video (thumbnail only)
        - Title
        - Description
        - Price
        - Enroll NOW button
    - Course page after Enrollment
        - Video available to watch directly
            - Keep track of played amount (optional)
        - Mark complete and Earn rewards
