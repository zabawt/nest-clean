FROM mongo
COPY contracts.json /contracts.json
CMD mongoimport --host mongocontracts \
--db contracts \
--collection 'Contracts' \
--mode upsert \
--upsertFields id \
--type json \
--file /contracts.json \
--jsonArray 