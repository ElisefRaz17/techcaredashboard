pipeline {
  agent any

  environment {
    VERCEL_TOKEN = credentials('VERCEL_TOKEN')
  }

  stages {
    stage('Build and Deploy Frontend Service') {
      steps {
        dir('healthcare') {
          sh 'npm install'
          sh 'npm run build'
          sh 'npx vercel --prod --token $VERCEL_TOKEN --yes'
        }
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