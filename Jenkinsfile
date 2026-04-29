// pipeline {
//   agent any

//   environment {
//     VERCEL_TOKEN = credentials('VERCEL_TOKEN')
//   }

//   stages {
//     stage('Build and Deploy Frontend Service') {
//       steps {
//           bat 'npm install'
//           bat 'npm run build'
//           bat 'npx vercel --prod --token %VERCEL_TOKEN% --yes'
//       }
//     }
//   }

//   post {
//     success {
//       echo 'Frontend deployed successfully to Vercel.'
//     }
//     failure {
//       echo 'Frontend deployment failed.'
//     }
//   }
// }

pipeline {
    agent any

    environment {
        // Map Jenkins credentials to usable environment variables
        VERCEL_TOKEN = credentials('VERCEL_TOKEN')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install project dependencies and the Vercel CLI globally
                bat 'npm install'
                bat 'npm install --global vercel'
            }
        }

        stage('Vercel Pull') {
            steps {
                // Pull environment variables from Vercel securely
                bat 'npx vercel pull --yes --environment=production --token=%VERCEL_TOKEN%'
            }
        }

        stage('Vercel Build') {
            steps {
                // Build the project using Vercel's build pipeline
                bat 'npx vercel build --prod --token=%VERCEL_TOKEN%'
            }
        }

        stage('Vercel Deploy') {
            steps {
                // Deploy the pre-built project to Vercel
                bat 'npx vercel deploy --prebuilt --prod --token=%VERCEL_TOKEN%'
            }
        }
    }
}