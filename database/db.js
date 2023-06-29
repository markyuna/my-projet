import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userGeo.db');

// async function openDatabase(pathToDatabaseFile: string): Promise<SQLite.WebSQLDatabase> {
//     if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
//       await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
//     }
//     await FileSystem.downloadAsync(
//       Asset.fromModule(require(pathToDatabaseFile)).uri,
//       FileSystem.documentDirectory + 'SQLite/userGeo.db'
//     );
//     return SQLite.openDatabase('userGeo.db');
//   }

// Initialisation
export const sqliteInit = () => {
    const initPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE IF EXISTS userGeo;',
                [],
                () => {
                    tx.executeSql(
                        'CREATE TABLE userGeo (id INTEGER PRIMARY KEY NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL);',
                        [],
                        () => {
                            resolve();
                        },
                        (_, error) => {
                            reject(error)
                        }
                    );
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return initPromise;
}



// Enregistrer les datas de géolocalisation
export const addUserGeo = (latitude, longitude) => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO userGeo (latitude, longitude) VALUES (?, ?)',
                [latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return insertPromise;
}


// récupérer la data
export const fetchInSQLite = () => {
    const fetchedPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM userGeo',
                [],
                (_, result) => {
                    if (result.rows.length > 0) {
                        resolve(result);
                    } else {
                        reject("No hay datos en la tabla userGeo.");
                    }
                },
                (_, error) => {
                    reject(error)
                }
            );
        });
    });

    return fetchedPromise;
}

