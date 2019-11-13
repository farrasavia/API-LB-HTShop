'use strict';

module.exports = function(Pemesanan) {
    Pemesanan.getPemesananByNama = function(nama, callback) {
        new Promise(function(resolve, reject) {
                // find name
          Pemesanan.find({where: {nama_pemesan: {like: nama}}}, function(err, result) {
            if (err) reject(err);
            if (result === null) {
              err = new Error('User not Found');
              err.statusCode = 404;
              reject(err);
            }
            resolve(result);
          });
        }).then(function(res) {
          if (!res) callback(err);
          return callback(null, res[0]);
        }).catch(function(err) {
          callback(err);
        });
      };
    Pemesanan.remoteMethod(
        'getPemesananByNama',
    {
      description: 'get pemesanan by nama',
      accepts: [
                {arg: 'nama', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getPemesananByNama', verb: 'get'},
    }
    );
    
Pemesanan.getStatusPemesanan = function(callback) {
  new Promise(function(resolve, reject) {
          // find name
    Pemesanan.find({where: {status:  true}}, function(err, result) {
      if (err) reject(err);
      if (result === null) {
        err = new Error('User not Found');
        err.statusCode = 404;
        reject(err);
      }
      resolve(result);
    });
  }).then(function(res) {
    if (!res) callback(err);
    return callback(null, res);
  }).catch(function(err) {
    callback(err);
  });
};
    Pemesanan.remoteMethod(
      'getStatusPemesanan',
  {
    description: 'get status pemesanan',
    returns: {
      arg: 'res', type: 'object', root: true,
    },
    http: {path: '/getStatusPemesanan', verb: 'get'},
  }
  );

};
