gitpipeline {
    agent any
    
    tools {nodejs "node"}

    environment {
        NEXUS_VERSION = "nexus3"
        NEXUS_PROTOCOL = "http"
        NEXUS_URL = "nexus:8081"
        NEXUS_REPOSITORY = "npm-group"
        NEXUS_CREDENTIAL_ID = credentials('nexus_token')
    }
    
    stages {
        stage('Install') { 
            steps {
                sh "rm -f .npmrc"
                sh "npm config set email blackbirdcu@gmail.com"
                sh "npm config set _auth ${NEXUS_CREDENTIAL_ID}"
                sh "npm config set registry ${env.NEXUS_PROTOCOL}://${env.NEXUS_URL}/repository/${env.NEXUS_REPOSITORY}/"
                sh "npm config set always-auth true"
                sh "npm config set strict-ssl true"
                sh "npm config ls"
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
                sh 'npm test -- --coverage --watchAll=false'
            }
        }
        stage('Publish to Nexus Repository Manager')
        {
            steps {
                sh "npm publish --registry=${env.NEXUS_PROTOCOL}://${env.NEXUS_URL}/repository/${env.NEXUS_REPOSITORY}/"
            }
        }
    }
}
