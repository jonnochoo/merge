var parse = require('csv-parse');
var transform = require('stream-transform');
var fs = require('fs');

function mergeFiles(columns, files, callback) {

  columns[0].splice(0, 0, "Source");
  var dataRecords = columns;
  var numberOfFilesProcessed = 0;

  files.forEach(function(item) {
    transformRecords(fs.createReadStream(item.fileName), item.mapping, item.name, finish);
  })

  function transformRecords(input, dataMapping, sourceName, callback) {
    var isHeader = true;
    input
      .pipe(parse({delimiter: ','}))
      .pipe(transform(function(record) {        
        if(!isHeader) {
          var newRecord = [sourceName];
          dataMapping.forEach(function(index) {
            newRecord.push(record[index]);        
          })
          dataRecords.push(newRecord);          
          return newRecord;
        }
        
        isHeader = false;
        return null;
      }))
      .on('finish', function() {
        callback();
      });
  }

  function finish() {
    numberOfFilesProcessed++;
    if(numberOfFilesProcessed == files.length) {
      callback(dataRecords);
    }
  }
}

module.exports = mergeFiles;