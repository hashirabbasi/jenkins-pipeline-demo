pipeline {
    agent any

    environment {
        COVERAGE_THRESHOLD = '80'
        SLACK_CHANNEL = '#DevOpsProject'
    }

    tools {
        nodejs 'NodeJS 18' // Make sure this is configured in Jenkins → Global Tool Configuration
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/hashirabbasi/jenkins-pipeline-demo.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Lint Code') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Run Tests with Coverage') {
            steps {
                sh 'npm test -- --coverage'
            }
        }
        
        stage('Check Coverage Threshold') {
            steps {
                script {
                    def coverage = sh(
                        script: "node -p \"require('./coverage/coverage-summary.json').total.statements.pct\"",
                        returnStdout: true
                    ).trim()
                    echo " Code Coverage: ${coverage}%"
                    if (coverage.toFloat() < COVERAGE_THRESHOLD.toFloat()) {
                        error " Coverage ${coverage}% is below threshold of ${COVERAGE_THRESHOLD}%"
                    }
                }
            }
        }

        stage('Archive Artifacts if Release') {
            when {
                expression { return env.BRANCH_NAME ==~ /.*release.*/ }
            }
            steps {
                archiveArtifacts artifacts: '**/coverage/**', fingerprint: true
            }
        }
    }

    post {
        success {
            slackSend channel: "${SLACK_CHANNEL}", message: " Build SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
        }
        failure {
            slackSend channel: "${SLACK_CHANNEL}", message: " Build FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}\n${env.BUILD_URL}"
        }
    }
}
