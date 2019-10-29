'use strict';

module.exports = function(Barang) {
    Barang.getBarangByNama = function(nama, callback) {
        new Promise(function(resolve, reject) {
                // find name
          Barang.find({where: {nama_barang: {like: nama}}}, function(err, result) {
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
    Barang.remoteMethod(
        'getBarangByNama',
    {
      description: 'get barang by nama',
      accepts: [
                {arg: 'nama', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getBarangByNama', verb: 'get'},
    }
    );  

};
