# bradvisor-api
API de integração da MercadoBot com a BRAdvisor. Essa API permite que clientes sejam validados para garantir as vantagens da parceria entre as empresas.


## Roteiro para instalaçãoo e configuraçãoo da API de validação de clientes BRAdvisor

A API vai ser executada em um container localizado em um Registry da AWS. Siga os passos abaixo para realizar a configuração da aplicação:

## 1 - Instalação da versão mais atualizada do Docker:

### Salve o conteúdo o playbook ansible abaixo em um arquivo chamado "docker-install.yml":

```
---
- name: Configure Docker service and Deploy BRAdvisor API
  gather_facts: false
  hosts: localhost
  become: yes
  tasks:

    - name: Make sure old versions are not installed
      package:
        name: 
            - docker
            - docker-client
            - docker-client-latest
            - docker-common
            - docker-latest
            - docker-latest-logrotate
            - docker-logrotate
            - docker-engine
        state: absent    

    - name: Install yum-utils
      package:
        name: yum-utils
        state: present    

    - name: Add docker repository
      shell: yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo     


    - name: Install Docker
      package:
        name: 
            - docker-ce
            - docker-ce-cli
            - containerd.io
        state: present    

    - name: Start Docker Service
      systemd:
        name: docker            
        enabled: yes
        state: started
```

### Execute como root (ou usuário com os privilégios necessários) o plyabook criado:

```bash
 ansible-playbook docker-install.yml
```

## 2 - Deploy da API BRAdvisor

### Faça o login na AWS e em seguinda o pull da imagem da API BRAdvisor:

```bash
aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 725001037667.dkr.ecr.us-west-2.amazonaws.com

docker pull 725001037667.dkr.ecr.us-west-2.amazonaws.com/bradvisor-api:latest

docker run -it -e "PORT=${IP_PORT}" -e "DB_HOST=${DB_HOST}" -e "DB_USER=${DB_USER}" -e "DB_PASS=${DB_PASS}" -e "DB_SCHEMA=${DB_SCHEMA}" \
-e "CHAVE_JWT=${JWT_KEY}" -e 'USUARIO_API={"id": "${UUID}", "senha": "${PASSWORD}", "email": "${USER_EMAIL}"}' \
-p 80:6000 bradvisor-api:latest
```
