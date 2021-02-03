FROM mongo
COPY users.json /users.json
CMD mongoimport --host mongodb --db zabawt --collection 'Users' --mode upsert --type json --file /users.json --jsonArray 
