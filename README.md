
create stack: sh scripts/create.sh jenkins-stack infrastructure/jenkins-server.yml infrastructure/jenkins-server-parameters.json


check jenkins
https://www.jenkins.io/doc/tutorials/tutorial-for-installing-jenkins-on-AWS/

get admin password of jenkins:
sudo cat /var/lib/jenkins/secrets/initialAdminPassword