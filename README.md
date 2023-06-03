“Randomized Wikipedia” is a simple web page that provides users with a summary of a random article from Wikipedia. This page is designed to help users discover new articles on Wikipedia by providing them with a random article each time they hit the button. Simple and easy to use, and it’s perfect for anyone who wants to learn something new or explore the vast collection of articles on Wikipedia!

create stack: sh scripts/create.sh jenkins-stack infrastructure/jenkins-server.yml infrastructure/jenkins-server-parameters.json


check jenkins
https://www.jenkins.io/doc/tutorials/tutorial-for-installing-jenkins-on-AWS/

get admin password of jenkins:
sudo cat /var/lib/jenkins/secrets/initialAdminPassword