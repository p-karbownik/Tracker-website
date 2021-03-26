pipeline {
    agent any
    
    tools {nodejs "node"}

    environment {
        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "nexus:8081"
        NEXUS_REPOSITORY = "npm-private"
        NEXUS_CREDENTIAL_ID = "nexus-user-credentials"
    }
    
    stages {
        stage('Install') { 
            steps {
                sh 'npm install' 
            }
        }
        stage('Build')
        {
            steps
            {
                sh 'npm run build'
            }
        }
        stage('Tests')
        {
            steps {
                sh 'npm test -- --watchAll=false'
            }
        }
        stage('Publish to Nexus Repository Manager')
        {
            steps {
                sh 'npm publish'
            }
        }
    }
}