pipeline {
    agent any
    
    tools {nodejs "node"}

    environment {
        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "nexus:8081"
        NEXUS_REPOSITORY = "npm-private"
        NEXUS_CREDENTIAL = "nexus-user-credentials"
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
                sh 'echo registry=${env.NEXUS_PROTOCOL}://${env.NEXUS_URL}/repository/${env.NEXUS_REPOSITORY}/ > .npmrc'
                sh 'echo -n _auth= >> .npmrc'
                sh 'echo '${env.NEXUS_CREDENTIAL_USR}:${env.NEXUS_CREDENTIAL_PSW}' | openssl base64 >> .npmrc'
                sh 'echo email = blackbirdcu@gmail.com >> .npmrc'
                sh 'echo always-auth = true >> .npmrc'
                sh 'npm publish --registry=${env.NEXUS_PROTOCOL}://${env.NEXUS_URL}/repository/${env.NEXUS_REPOSITORY}/'
                sh 'rm .npmrc'
            }
        }
    }
}