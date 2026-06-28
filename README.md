# API

npm install && npm start

# Database
Azure:\
Create **Azure Database for PostgreSQL server**

Pgadmin4:\
**SSL Mode**: required\
Create role: **viashots** with create database permission\
Restore database based on role viashots

```
"database": {
    "host": "ep-lively-bar-af7fhvo3.c-2.us-west-2.aws.neon.tech",
    "port": 5432,
    "database": "neondb",
    "user": "neondb_owner",
    "password": "npg_h5mdsPuQ8vog",
    "ssl": true
  },
```

```
"database": {
    "host": "localhost",
    "port": 5432,
    "database": "viashots",
    "user": "viashots",
    "password": "viashots",
    "ssl": false
  },
```

# Deployment
Azure:\
Create app service plan\
Create app service based on previous plan\
Use Github (preferred but with quota) or local git(dependencies trouble) to deploy

# Test
http://127.0.0.1:1337/api/customer/v1/basicinfo/133
