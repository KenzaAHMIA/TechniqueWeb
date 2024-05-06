sudo su - solr -c "/opt/solr/bin/solr create -c tradAPI"

curl -X POST -H 'Content-type:application/json' --data-binary '{"add-field": {"name":"id", "type":"integer", "multiValued":false, "stored":true, "indexed":true}}' http://localhost:8983/solr/tradAPI/schema

curl -X POST -H 'Content-type:application/json' --data-binary '{ "add-field": [ {"name":"langue", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_source", "type":"string", "multiValued":false, "stored":true, "indexed":true}, {"name":"trad_cible", "type":"string", "multiValued":false, "stored":true, "indexed":true} ]}' http://localhost:8983/solr/tradAPI/schema
