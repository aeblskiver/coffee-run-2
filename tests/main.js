//Initializes testing values and runs test scripts
/*global require:true*/

eval(require('fs').readFileSync('tests/scripts/datastore.js', 'utf8'));
eval(require('fs').readFileSync('tests/scripts/truck.js', 'utf8'));

eval(require('fs').readFileSync('tests/scripts/tests_datastore.js', 'utf8'));
eval(require('fs').readFileSync('tests/scripts/tests_truck.js', 'utf8'));
