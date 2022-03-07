import { Collection, Db, Document } from 'mongodb'

let DB: Db;

const grantable = new Set([
  'access_token',
  'authorization_code',
  'refresh_token',
  'device_code',
  'backchannel_authentication_request',
]);

class CollectionSet extends Set<string> {
  add(name: string) {
    const nu = this.has(name);
    super.add(name);
    if (!nu) {
      DB.collection(name).createIndexes([
        ...(grantable.has(name)
          ? [{
            key: { 'payload.grantId': 1 },
          }] : []),
        ...(name === 'device_code'
          ? [{
            key: { 'payload.userCode': 1 },
            unique: true,
          }] : []),
        ...(name === 'session'
          ? [{
            key: { 'payload.uid': 1 },
            unique: true,
          }] : []),
        {
          key: { expiresAt: 1 },
          expireAfterSeconds: 0,
        },
      ]).catch(console.error); // eslint-disable-line no-console
    }
    return this
  }
}

const collections = new CollectionSet();

export class MongoAdapter {
  name: string;
  constructor(name: string) {
    this.name = name;

    // NOTE: you should never be creating indexes at runtime in production, the following is in
    //   place just for demonstration purposes of the indexes required
    collections.add(this.name);
  }

  // NOTE: the payload for Session model may contain client_id as keys, make sure you do not use
  //   dots (".") in your client_id value charset.
  async upsert(_id: string, payload: any, expiresIn: number) {
    let expiresAt;

    if (expiresIn) {
      expiresAt = new Date(Date.now() + (expiresIn * 1000));
    }

    await this.coll().updateOne(
      { _id },
      { $set: { payload, ...(expiresAt ? { expiresAt } : undefined) } },
      { upsert: true },
    );
  }

  async find(_id: string) {
    const result = await this.coll().find(
      { _id },
      // { payload: 1 },
    ).limit(1).next();

    if (!result) return undefined;
    return result.payload;
  }

  async findByUserCode(userCode: string) {
    const result = await this.coll().find(
      { 'payload.userCode': userCode },
      // { payload: 1 },
    ).limit(1).next();

    if (!result) return undefined;
    return result.payload;
  }

  async findByUid(uid: string) {
    const result = await this.coll().find(
      { 'payload.uid': uid },
      // { payload: 1 },
    ).limit(1).next();

    if (!result) return undefined;
    return result.payload;
  }

  async destroy(_id: string) {
    await this.coll().deleteOne({ _id });
  }

  async revokeByGrantId(grantId: string) {
    await this.coll().deleteMany({ 'payload.grantId': grantId });
  }

  async consume(_id: string) {
    await this.coll().findOneAndUpdate(
      { _id },
      { $set: { 'payload.consumed': Math.floor(Date.now() / 1000) } },
    );
  }

  coll(name: string = ''): Collection<Document> {
    return MongoAdapter.coll(name || this.name);
  }

  static coll(name: string = '') {
    return DB.collection(name);
  }

  // This is not part of the required or supported API, all initialization should happen before
  // you pass the adapter to `new Provider`
  // static async connect() {
  //   const connection = await MongoClient.connect('process.env.MONGODB_URI');
  //   db: Db = connection.db(connection.options.dbName);
  // }
}