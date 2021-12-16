# API

npm install && npm start

# Database
Azure:\
Create **Azure Database for PostgreSQL server**

Pgadmin4:\
**SSL Mode**: required\
Create role: **viashots** with create database permission\
Restore database based on role viashots

# Deployment
Azure:\
Create app service plan\
Create app service based on previous plan\
Use Github (preferred but with quota) or local git(dependencies trouble) to deploy

# Test
http://127.0.0.1:1337/api/customer/v1/basicinfo/133