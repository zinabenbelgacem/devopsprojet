pipeline {
    agent any

    environment {
        REGISTRY = "zinabenbelgacem"
        DOCKER_CREDENTIALS_ID = "2a030e24-e16b-4dce-8e76-bd90d3da431c"
    }

    stages {
        stage('Checkout') {
            steps {
git branch: 'main', url: 'https://github.com/zinabenbelgacem/devopsprojet'
            }
        }

        stage('Build Discovery Service') {
            steps {
                dir('discovery-service') {
bat 'mvnw.cmd clean package -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-discovery-service", '.')
                    }
                }
            }
        }

        stage('Build Config Service') {
            steps {
                dir('config-service') {
                    sh './mvnw clean package -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-config-service", '.')
                    }
                }
            }
        }

        stage('Build Customer Service') {
            steps {
                dir('customer-service') {
                    sh './mvnw clean package -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-customer-service", '.')
                    }
                }
            }
        }

        stage('Build Account Service') {
            steps {
                dir('account-service') {
                    sh './mvnw clean package -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-account-service", '.')
                    }
                }
            }
        }

        stage('Build Gateway Service') {
            steps {
                dir('gateway-service') {
                    sh './mvnw clean package -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-gateway-service", '.')
                    }
                }
            }
        }

        stage('Build Angular Front') {
            steps {
                dir('Angular_Front') {
                    sh 'npm install'
                    sh 'npm run build --configuration=production'
                    script {
                        docker.build("${REGISTRY}/front-end-angular", '.')
                    }
                }
            }
        }

        stage('Push All Images') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKER_CREDENTIALS_ID) {
                        docker.image("${REGISTRY}/bank-discovery-service").push()
                        docker.image("${REGISTRY}/bank-config-service").push()
                        docker.image("${REGISTRY}/bank-customer-service").push()
                        docker.image("${REGISTRY}/bank-account-service").push()
                        docker.image("${REGISTRY}/bank-gateway-service").push()
                        docker.image("${REGISTRY}/front-end-angular").push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                sshagent(['ssh-server']) {
                    sh '''
                    ssh ubuntu@102.169.205.122
 "
                        cd ~/deploy &&
                        git pull &&
                        docker-compose pull &&
                        docker-compose up -d
                    "
                    '''
                }
            }
        }
    }
}
