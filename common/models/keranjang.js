'use strict';

const loopback = require('loopback');
const path = require('path');

module.exports = function(Keranjang){

    // email
    // web hook, after save
    Keranjang.observe('after save', function(context, next) {
      console.log(context);
      if (context.isNewInstance) {
          let Keranjang = context.instance;
      }
      return next();
  });


  // create detail email to ejs
  Keranjang.afterRemote('create', function(ctx, modelInstance, next) {
  
      process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  
      let renderer = loopback.template(path.resolve(__dirname,'../../server/views/konfirmasi-pesanan.ejs'));
      let myMessage = {heading:"Selamat datang di Java Travel", text:"Terima kasih sudah mendaftar di Java Travel. Berikut pesanan Bapak/Ibu : "};
      let html = renderer(myMessage);

      Keranjang.app.models.Email.send({
          to: "mfaqih918171@gmail.com",
          from: '"Pesanan" <noreply@javatravel.com>',
          subject: 'Konfirmasi pemesanan wisata',
          html: html
        }, function(err, mail) {
          if (err) return console.log(err + '> error sending request for quotation email');
          console.log('> sending request for quotation email to:', mail);
      });
      next();
  })

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