# TravelOK

## Blockchain-Based Booking & Hospitality Review Platform

### Getting Started
This project consists of multiple microservices and a frontend application organized as separate repositories and folders.
- Backend microservices are located inside the Backend-Microservices/ folder.

- Frontend application is inside the Frontend/travelok-client-app/ folder.

- Each microservice and the frontend has its own README file with detailed instructions on setup, running, and configuration. 

Important-  Some microservices require API keys and other sensitive credentials. For security reasons, .env files are not included in this repository. Instead, you will find .env.example files in each microservice folder. Please refer them.

### Setup Instructions

#### 1. Clone the main TravelOK repository
```bash
# Clone the main TravelOK repository
git clone https://github.com/CoinCeylon/Travelok.git
cd Travelok
```
#### 2. Review each microservice README
- Each microservice folder contains a README with detailed setup instructions, environment variables, and commands to run the service. Please follow those instructions carefully.

#### 3. Install dependencies
- Navigate to each microservice and the frontend folder and run:

```bash
npm install
```
or the relevant command specified in each README.

#### 4. Set up environment variables
Each microservice requires environment variables (see .env.example or documentation in each microservice README). Please create your own .env files accordingly.

#### 5. Start the microservices
Start each microservice individually as per their README instructions.

#### 6.Run the frontend
Follow instructions in the frontend README to start the React application.
