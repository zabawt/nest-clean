FROM mongo
COPY users.json /users.json
COPY contracts.json /contracts.json
CMD mongoimport --host mongodb --db zabawt --collection Contracts --type json --file /contracts.json --jsonArray 
CMD mongoimport --host mongodb --db zabawt --collection Users --type json --file /users.json --jsonArray 
#--authenticationDatabase admin --username admin --password password