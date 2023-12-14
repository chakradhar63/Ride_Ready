pipeline{
    agent any
    environment{
        MONGO="mongodb+srv://chakrivanarasi:123@cluster0.vbhdsq1.mongodb.net/"
        JWT="eef5f9245c142460c20d70063583558d30f02e88455ee91a9e9d19bd49fb9baf49787e5bd2502529fcdb0d1fe8d287e4cc56ff53bf2bde139237656368224d83"
    }
    stages{
        stage('Clone Git'){
            steps{
                git 'https://github.com/chakradhar63/Ride_Ready'
            }
        }
        stage('Testing'){
            steps{
                dir('frontend'){
                    sh "npm install"
                }
                dir('backend'){
                    sh "npm install"
                }
            }
        }
        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t frontend-image ./frontend'
            }
        }
         stage('Build Backend Image') {
            steps {
                sh 'docker build -t backend-image ./backend'
            }
        }
        stage('Push Images to DockerHub') {
            steps {

                withCredentials([usernamePassword(credentialsId: 'DockerHubCred', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                    sh 'docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD'
                    sh 'docker tag frontend-image chakradhar63/frontend-image:latest'
                    sh 'docker push chakradhar63/frontend-image:latest'
                    sh 'docker tag backend-image chakradhar63/backend-image:latest'
                    sh 'docker push chakradhar63/backend-image:latest'
                }          
            }
        }
        stage('Clean docker images'){
            steps{
                script{
                    sh 'docker container prune -f'
                    sh 'docker image prune -f'
                }
            }
        }
        stage('Ansible Deployment') {
            steps {
                script {
                    sh 'ansible-playbook -i inventory playbook.yml'
                }
            }
        }
    }
}
