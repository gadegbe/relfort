/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
document.addEventListener('deviceready', onDeviceReady, false);

var db = null;

function onDeviceReady() {
  // alert("the device is ready !");

  db = window.sqlitePlugin.openDatabase({
    name: "resto.db",
    location: 'default'
  });



  db.transaction(function(tx) {
    tx.executeSql("CREATE TABLE IF NOT EXISTS res (id integer primary key, nom text, adr text, tel text)");

  }, function(tx, res) {
    console.log('Populated database OK');
    //alert("table created");
  }, function(tx, error) {
    console.log('Transaction ERROR: ' + error.message);
  });


}




$("#target").submit(function(event) {
  event.preventDefault();
  var nom = $("#nom").val();
  var adr = $("#adr").val();
  var tel = $("#tel").val();





  db.transaction(function(tx) {

    var query = "INSERT INTO res (nom, adr, tel) VALUES (?,?,?)";
    tx.executeSql(query, [nom, adr, tel], function(tx, res) {
      alert("le resto est bien enregistré");
      //alert(" this booking is added date1 "+d1+" date2"+ d2+" nb adults"+ ad+" nb children "+chi);
    });
  }, function(tx, error) {
    alert("An error occured while saving the note");
  });


});


$(document).on("pagebeforeshow", "#pfav",
  function() {

    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM res', [], function(tx, results) {
        var len = results.rows.length,
          i;
        $("#divtab").html("<p>  <b>Vous avez enregistré " + len + " restos :</b><br/></p><br/><br/><table id='tab' border=1 align='center' ><tr><th> Id </th> <th>Nom</th> <th>Adresse</th> <th>Téléphone</th></tr>");




        for (i = 0; i < len; i++) {
          $("#tab").append("<tr><td>" + results.rows.item(i).id + "</td><td>" + results.rows.item(i).nom + "</td><td>" + results.rows.item(i).adr + "</td><td><a href='tel:" + results.rows.item(i).tel + "'>" +
            results.rows.item(i).tel + "</a></td></tr>");
        }
        $("#tab").append("</table>");

      }, function(error) {
        alert("error");
      });

    });

  });

$("#nbs").click(function() {
  alert("lien non disponible");
})

$("#nbs1").click(function() {
  alert("lien non disponible");
})