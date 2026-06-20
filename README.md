# Multi-Tier Node.js & PostgreSQL Application on Kubernetes

This project demonstrates the deployment of a Node.js application with a PostgreSQL database on Kubernetes. The objective is to containerize the application, deploy it on a Kubernetes cluster, and ensure high availability, data persistence, and automatic recovery in case of failures.

---

## Project Links

| Resource              | Link                                                                                                   |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| GitHub Repository     | https://github.com/iamtheashish480/Ashish_3162696_Kubernetes_and_DevOps_Advance                        |
| Docker Hub Repository | https://hub.docker.com/repository/docker/iamashish480/ashish-3162696-kubernetes-devops-advance/general |
| Application URL       | http://34.107.216.19/data    http://34.107.216.19.nip.io/data/2                                                            |
| Demo Video            | https://drive.google.com/file/d/1e9emZTxQbGcUXT4XXif8yAm5NSOy86qe/view?usp=sharing                                                                              |

---

## Application Architecture

The application consists of two main components:

### 1. Node.js Application

* Developed using Node.js and Express.
* Allows to view data and specific record, add update like operations
* Provides REST APIs to interact with the database.
* Runs inside a Kubernetes Deployment with multiple replicas.
* Exposed through a Kubernetes Service.

### 2. PostgreSQL Database

* Runs as a separate pod inside the cluster.
* Uses a Persistent Volume Claim (PVC) to store data.
* Data remains available even if the database pod is restarted.

### 3. Configuration Management

* Application configuration is managed using ConfigMaps.
* Database credentials are stored using Kubernetes Secrets.
* Ingress is used to expose the application externally.

---

## Deployment Process

1. Build the Docker image for the Node.js application.
2. Push the image to Docker Hub.
3. Apply Kubernetes manifests using `kubectl apply -f`.
4. Verify that all pods, services, PVCs, and ingress resources are running correctly.
5. Access the application through the Ingress URL.

---

## Self-Healing Demonstration

Kubernetes automatically recovers failed containers and pods.

### Node.js Application Recovery

* Delete a running application pod.
* Kubernetes creates a new pod automatically.
* Application remains available without manual intervention.

### PostgreSQL Recovery

* Delete the PostgreSQL pod.
* Kubernetes recreates the pod.
* Data remains intact because it is stored in the Persistent Volume.

---

## Rolling Updates

The Node.js deployment uses a rolling update strategy:

```yaml
strategy:
  type: RollingUpdate
  rollingUpdate:
    maxSurge: 1
    maxUnavailable: 0
```

This ensures that application updates can be deployed without downtime.

## Security Considerations

For this assignment, database credentials are stored using Kubernetes Secrets.

It is important to note that Kubernetes Secrets are Base64 encoded and not encrypted by default. In a production environment, tools such as HashiCorp Vault, Bitnami Sealed Secrets, or a cloud-native secret management service would be recommended for enhanced security.

## Conclusion

This project demonstrates the deployment of a containerized Node.js and PostgreSQL application on Kubernetes with:

* Containerized application deployment
* Persistent database storage
* Kubernetes self-healing capabilities
* Rolling updates
* Configuration and secret management
* Scalable architecture
