FROM mongo
COPY users.json /users.json
CMD mongoimport --host mongousers \
--db users \
--collection 'Users' \
--mode upsert \
--upsertFields id \
--type json \
--file /users.json \
--jsonArray 