pipeline {
    agent any

    environment {
        REGISTRY = "zinabenbelgacem"
        DOCKER_CREDENTIALS_ID = "6f72d25e-c95a-43ea-b5c9-832a81b751e9"
    }

    stages {
        stage('Checkout') {
            steps {
git branch: 'main', url: 'https://github.com/zinabenbelgacem/devopsprojet'
            }
        }
stage('Docker Login') {
    steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_CREDENTIALS_ID}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            bat """
            echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
            """
        }
    }
}




        stage('Build Discovery Service') {
            steps {
                dir('discovery-service') {
                    bat '.\\mvnw.cmd clean package  -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-discovery-service", '.')
                    }
                }
            }
        }

        stage('Build Config Service') {
            steps {
                dir('config-service') {
                    bat '.\\mvnw.cmd clean package  -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-config-service", '.')
                    }
                }
            }
        }

        stage('Build Customer Service') {
            steps {
                dir('customer-service') {
                    bat '.\\mvnw.cmd clean package  -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-customer-service", '.')
                    }
                }
            }
        }

        stage('Build Account Service') {
            steps {
                dir('account-service') {
                    bat '.\\mvnw.cmd clean package  -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-account-service", '.')
                    }
                }
            }
        }

        stage('Build Gateway Service') {
            steps {
                dir('gateway-service') {
                    bat '.\\mvnw.cmd clean package  -DskipTests'
                    script {
                        docker.build("${REGISTRY}/bank-gateway-service", '.')
                    }
                }
            }
        }
stage('Build Angular Front') {
    steps {
        dir('Angular_Front') {
            // Suppression forcée de node_modules (plus silencieux et robuste)
            bat '''
            IF EXIST node_modules (
              rd /s /q node_modules >nul 2>&1 || echo "node_modules deletion failed or no permissions"
            )
            '''

            // Config npm pour éviter erreurs réseau
            bat '''
            npm config set registry https://registry.npmjs.org/
            npm config set fetch-retries 5
            npm config set fetch-retry-mintimeout 20000
            npm config set fetch-retry-maxtimeout 120000
            '''

            // Installation des dépendances avec options pour minimiser audit et fund
            bat 'npm install --no-audit --no-fund --prefer-offline'

            // Compilation Angular en mode production
            bat 'npm run build --configuration=production'

            // Construction de l'image Docker (depuis Angular_Front)
            script {
                docker.build("${REGISTRY}/front-end-angular", '.')
            }
        }
    }
}


        /*stage('Push All Images') {
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
        }*/


stage('Deploy') {
 steps {
 sshagent(['Vagrant_ssh']) {
sh '''
ssh -o StrictHostKeyChecking=no ubuntu@192.168.100.138 "
cd ~/deploy &&
git pull &&
 docker-compose pull &&
 docker-compose up -d
"
'''
}
 }
}

    }}
