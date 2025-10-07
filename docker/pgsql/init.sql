SELECT 'CREATE DATABASE umami owner myuser' 
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'umami')\gexec;

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