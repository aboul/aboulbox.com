#!/bin/bash

set -e
set -u

function create_database_grant_privilege() {
        local database=$1
        echo "  Creating database '$database' and granting privileges to '$POSTGRES_USER'"
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
            CREATE DATABASE $database;
            GRANT ALL PRIVILEGES ON DATABASE $database TO "$POSTGRES_USER";
EOSQL

    if [[ $database != 'umami' ]]; then   
        psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
            \c $database

            CREATE TABLE IF NOT EXISTS contact (
                id integer GENERATED ALWAYS AS IDENTITY NOT NULL,
                email varchar(255) NOT NULL,
                name varchar(128) NOT NULL,
                phone varchar(10) DEFAULT NULL::character varying,
                message text NOT NULL,
                subject varchar(128),
                created_at timestamp without time zone DEFAULT NOW()::timestamp without time zone,
                mail_delivered boolean DEFAULT false,
                PRIMARY KEY (id)
            );

            COMMENT ON COLUMN contact.created_at IS '(DC2Type:datetime_immutable)';
EOSQL
    fi
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
        echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"
        for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
                create_database_grant_privilege $db
        done
        echo "Multiple databases created"
fi