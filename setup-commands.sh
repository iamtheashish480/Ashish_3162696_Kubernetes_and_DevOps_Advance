#!/bin/bash

# Go to project directory

# Git

# --------------------

git init
git add .
git commit -m "Initial project setup"

git remote add origin https://github.com/your-username/your-repo.git
git branch -M main
git push -u origin main

# --------------------

# Docker

# --------------------

docker build -t iamashish480/nodejs-app:v1 .

docker login
docker push iamashish480/nodejs-app:v1

# --------------------

# Minikube

# --------------------

minikube start --driver=docker
minikube addons enable ingress

kubectl get nodes

# --------------------

# Kubernetes Resources

# --------------------

kubectl apply -f k8s/app.config.yaml
kubectl apply -f k8s/app-secret.yaml

kubectl apply -f k8s/postgres-init-config.yaml
kubectl apply -f k8s/postgres-pvc.yaml
kubectl apply -f k8s/postgres-deployment.yaml
kubectl apply -f k8s/postgres-service.yaml

kubectl apply -f k8s/nodejs-deployment.yaml
kubectl apply -f k8s/nodejs-service.yaml
kubectl apply -f k8s/nodejs-hpa.yaml

kubectl apply -f k8s/ingress.yaml

# Verify deployment

kubectl get all,pvc,ingress,hpa

# Access service

minikube service nodejs-service --url

# Self-healing test

kubectl get pods
kubectl delete pod <nodejs-pod-name>
kubectl get pods -w

# Persistence test

kubectl delete pod -l app=postgres
kubectl get pods,pvc -w

# HPA status

kubectl get hpa
