pipeline {
  agent any

  environment {
    VERCEL_TOKEN = credentials('VERCEL_TOKEN')
  }

  stages {
    stage('Build and Deploy Frontend Service') {
      steps {
          bat 'npm install'
          bat 'npm run build'
          bat 'npx vercel --prod --token %VERCEL_TOKEN% --yes'
      }
    }
  }

  post {
    success {
      echo 'Frontend deployed successfully to Vercel.'
    }
    failure {
      echo 'Frontend deployment failed.'
    }
  }
}