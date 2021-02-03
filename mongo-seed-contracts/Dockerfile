FROM mongo
COPY contracts.json /contracts.json
CMD mongoimport --host mongodb --db zabawt --collection 'Contracts' --drop --mode upsert --type json --file /contracts.json --jsonArray 