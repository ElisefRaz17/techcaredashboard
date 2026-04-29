pipeline {
    agent any

    environment {
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
                bat 'npm install'
                bat 'npm install --global vercel'
            }
        }

        stage('Vercel Pull') {
            steps {
                bat 'npx vercel pull --yes --environment=production --token=%VERCEL_TOKEN%'
            }
        }

        stage('Vercel Build') {
            steps {
                bat "npm run build"
                bat 'npx vercel --prod --token=%VERCEL_TOKEN%'
            }
        }
    }
}