FROM mongo:4.1.1

COPY listing-details.csv /data/listing-details.csv
# RUN mongoimport --host mongodb:27017 --db listing --drop --type csv --file /data/listing-details.csv --headerline