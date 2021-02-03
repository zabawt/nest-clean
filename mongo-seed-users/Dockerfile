FROM mongo
COPY users.json /users.json
COPY contracts.json /contracts.json
#CMD mongoimport --host mongodb --db zabawt --collection 'Contracts' --mode upsert --type json --file /contracts.json --jsonArray 

CMD mongoimport --host mongodb --db zabawt --collection 'Users' --mode upsert --type json --file /users.json --jsonArray 
#--authenticationDatabase admin --username admin --password password