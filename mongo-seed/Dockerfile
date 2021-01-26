FROM mongo
COPY data.json /data.json
CMD mongoimport --host mongodb --db zabawt --collection contracts --type json --file /contracts.json --jsonArray 
CMD mongoimport --host mongodb --db zabawt --collection users --type json --file /users.json --jsonArray 
#--authenticationDatabase admin --username admin --password password