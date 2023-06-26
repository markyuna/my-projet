import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('userGeo.db');

export const sqliteInit = () => {

    const initPromise = new Promise((resolve, reject) => {
       db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS userGeo (id INTEGER KEY NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL, date TEXT NOT NULL);',
            [],
            () => {
                resolve();
            },
            (_, error) => {
                reject(error);
            }
        )
       }) 
    });

    return initPromise;
}

// Enregistrer les datas de Geolocalisation

export const addUserGeo = (latitude, longitude) => {
    const insertPromise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'INSERT INTO userGeo (?, ?);',
                [latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, error) => {
                    reject(error);
                }
            );
        }); 
    });

    return insertPromise;

}