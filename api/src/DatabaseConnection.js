import { MongoClient, ObjectId } from 'mongodb';

class MongoDBClient {
  constructor() {
    this.url = null;
    this.dbName = null;
    this.client = null;
    this.db = null;
    this.connected = false;
  }

  setup(url, dbName) {
    this.url = url;
    this.dbName = dbName;
    this.client = new MongoClient(this.url);
  }

  async connectIfNeeded() {
    if (!this.connected) {
      try {
        await this.client.connect();
        this.db = this.client.db(this.dbName);
        this.connected = true;
        console.log(`✅ Connected to MongoDB: ${this.dbName}`);
      } catch (err) {
        console.error('❌ MongoDB connection failed:', err);
        throw err;
      }
    }
  }

  async getCollection(name) {
    await this.connectIfNeeded();
    return this.db.collection(name);
  }

async update(collectionName, filter, update) {
    const collection = await this.getCollection(collectionName);
    return await collection.updateOne(filter, update);
}


  async findAll(collectionName, filter = {}) {
    const collection = await this.getCollection(collectionName);
    return await collection.find(filter).toArray();
  }

  toObjectId(id) {
    return new ObjectId(id);
  }

  async close() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
      console.log('🔌 MongoDB connection closed.');
    }
  }
}

let singletonInstance = new MongoDBClient();
export default singletonInstance;