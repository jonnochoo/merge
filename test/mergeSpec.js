var mergeFiles = require('./../merge');
var stringify = require('csv-stringify');
var expect = require('chai').expect;

describe("merge", function() {

  it("test", function(done) {
    var columns = [
      [ 'FirstName', 'LastName', 'Email' ]
    ];

    var files = [
      { name: 'data1', fileName: './test/data1.csv', mapping: [1, 2, 3] },
      { name: 'data2', fileName: './test/data2.csv', mapping: [3, 4, 1] }
    ];

    mergeFiles(columns, files, function(data) {
      expect(data).to.have.length(5);
      expect(data[0]).to.eql(['Source', 'FirstName', 'LastName', 'Email']);
      expect(data[1]).to.eql(['data1', 'Melissa', 'Simmons', 'msimmons0@jiathis.com']);
      expect(data[2]).to.eql(['data2', 'Philip', 'Dixon', 'pdixon0@lycos.com']);
      expect(data[3]).to.eql(['data1', 'Teresa', 'Long', 'tlong1@nhs.uk']);
      expect(data[4]).to.eql(['data2', 'Kathleen', 'Hill', 'khill1@bbb.org']);
      
      done();
    });
  });

});