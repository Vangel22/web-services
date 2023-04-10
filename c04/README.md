## Mongo DB

## Documents

- MongoDB stores data as JSON documents (BSON - Binary JSON).
- The fields in a document can vary from doc to doc.
- Documents can be nested to express hierarchy and store structures as arrays

## Collections

- Collection is a group of documents
- Collection is same as table in relational databases
- Collections do not enforce a schema, meaning documents in the same collection can have diff fields

## Replica Sets: Ensuring High Availability

- On creation of a database in MongoDB, there are two copies of the data made reffered to as a replica set
- A replica set is a group of at least three MongoDB instances that continuously replicate between them

## Sharding: Scalability to handle massive data growth

- Sharding is a term for distributing data intelligently across multiple machines
- MongoDB shards data at collection level, distributing documents in a collection across the shards in a cluster

## Indexes: Improving query speed

- Improving speed when querying the DB because queryies scan the index instead of reading every document in the collection

## Aggregation Pipelines: Fast data flows

## Programing languages support

- Node.js, C++, C, C#, Go, Java, Perl, PHP, Python, Ruby, Rust, Scala and Swift

## Mongoose

- Mongoose is a ODM (Object data modeling) library for MongoDB and Node.js
- Mongoose manages relationships between data
- Provides schema validation
- Translates between objects in code and the representations of these objects in MongoDB
