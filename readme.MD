Documentation Technique pour le Démarrage du Site Web 


Introduction

Avant de commencer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

    Docker
    Docker Compose
    Minikube



Configuration Docker Compose

Le fichier docker-compose.yml définit les services suivants :

    db : Service de base de données PostgreSQL
    backend : Service backend Node.js
    frontend : Service frontend React

Les services sont configurés avec leurs dépendances, environnements, volumes et réseaux nécessaires.
Configuration Kubernetes

Les configurations Kubernetes sont divisées en plusieurs fichiers :

    backend-configmap.yaml : ConfigMap pour les variables d'environnement du backend
    back-pod.yaml : Pod pour le service backend
    db-pod.yml : Pod pour le service de base de données
    db-service.yaml : Service pour exposer le pod de la base de données
    frontend-configmap.yaml : ConfigMap pour les variables d'environnement du frontend
    front-pod.yaml : Pod pour le service frontend

Ces fichiers définissent les pods et services nécessaires à l'application.
Commandes de Démarrage
1. Démarrage des Services avec Docker Compose

Assurez-vous d'être dans le répertoire contenant le fichier docker-compose.yml. Exécutez la commande suivante pour démarrer les services :

bash```
docker-compose up -d
```

Cette commande démarre les services db, backend et frontend en arrière-plan.
2. Déploiement des Pods et Services Kubernetes

Appliquez les fichiers de configuration Kubernetes dans votre cluster. Exécutez les commandes suivantes :

bash```

kubectl apply -f backend-configmap.yaml
kubectl apply -f back-pod.yaml
kubectl apply -f db-pod.yml
kubectl apply -f db-service.yaml
kubectl apply -f frontend-configmap.yaml
kubectl apply -f front-pod.yaml
```
Ces commandes créent les pods et services définis dans les fichiers YAML.