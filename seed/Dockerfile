FROM mongo
COPY data.json /data.json
CMD mongoimport --host mongodb --db zabawt --collection contracts --type json --file /data.json --jsonArray 
#--authenticationDatabase admin --username admin --password password