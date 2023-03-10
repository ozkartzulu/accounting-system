
import { MongoTransferer, MongoDBDuplexConnector, LocalFileSystemDuplexConnector } from 'mongodb-snapshot';

export async function takeBackup(name) {

    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri: process.env.SERVER_URL,
            dbname: process.env.DB_NAME,
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: `./backup/${name}.tar`,
        },
    });

    const transferer = new MongoTransferer({
        source: mongo_connector,
        targets: [localfile_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}

export async function restoreBackup(name) {
    const mongo_connector = new MongoDBDuplexConnector({
        connection: {
            uri: process.env.SERVER_URL,
            dbname: process.env.DB_NAME,
        },
    });

    const localfile_connector = new LocalFileSystemDuplexConnector({
        connection: {
            path: `./backup/${name}`,
        },
    });

    const transferer = new MongoTransferer({
        source: localfile_connector,
        targets: [mongo_connector],
    });

    for await (const { total, write } of transferer) {
        console.log(`remaining bytes to write: ${total - write}`);
    }
}