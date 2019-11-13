module.exports = function(Keranjang){
    Keranjang.getKeranjangByIdCust = function(nama, callback) {
        new Promise(function(resolve, reject) {
                // find name
          Keranjang.find({where: {id_customer: {like: nama}}}, function(err, result) {
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
          return callback(null,res);
        }).catch(function(err) {
          callback(err);
        });
      };
    Keranjang.remoteMethod(
        'getKeranjangByIdCust',
    {
      description: 'get keranjang by id',
      accepts: [
                {arg: 'nama', type: 'string'},
      ],
      returns: {
        arg: 'res', type: 'object', root: true,
      },
      http: {path: '/getKeranjangByIdCust', verb: 'get'},
    }
    );  
};