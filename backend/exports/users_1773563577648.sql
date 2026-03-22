-- users export
SET session_replication_role = replica;
INSERT INTO app_user (user_id, email, phone, created_at) VALUES (1, 'prof@example.com', NULL, '2026-03-15T01:32:48.504Z');
SET session_replication_role = DEFAULT;
