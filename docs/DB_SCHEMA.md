# Database schema (Supabase Postgres)

## Enums

- `user_role`: `client | tasker | admin`
- `user_status`: `active | suspended`
- `job_status`: `open | assigned | payment_pending | payment_submitted | payment_verified | payment_rejected | in_progress | tasker_completed | client_confirmed | cancelled`
- `bid_status`: `submitted | accepted | rejected | withdrawn`
- `payment_proof_status`: `submitted | verified | rejected`

## Tables (public)

### `profiles`

- `id` (uuid, pk) → `auth.users.id`
- `role` (`user_role`)
- `status` (`user_status`)
- `display_name` (text)
- `phone` (text, nullable)
- `province_id` → `provinces.id` (nullable)
- `district_id` → `districts.id` (nullable)

### `categories`

- `id` (uuid, pk)
- `name` (unique)
- `slug` (unique)
- `icon` (nullable)
- `sort_order` (int)
- `is_active` (bool)

### `provinces`, `districts`

- `provinces`: 22 provinces seeded (PNG)
- `districts`: linked to `provinces` (`province_id`), seeded list

### `jobs`

- `client_id` → `profiles.id`
- `assigned_tasker_id` → `profiles.id` (nullable)
- `category_id` → `categories.id`
- `province_id` → `provinces.id`
- `district_id` → `districts.id` (nullable)
- `fixed_price` (numeric, > 0)
- `commission_percent` (numeric, default 25.00)
- `status` (`job_status`)
- `created_at`, `updated_at`

### `bids`

- `job_id` → `jobs.id`
- `tasker_id` → `profiles.id`
- `amount` (numeric, > 0)
- `message` (text)
- `status` (`bid_status`)

### `payment_proofs`

- `job_id` → `jobs.id`
- `uploader_id` → `profiles.id` (client)
- `storage_path` (text) → Supabase Storage object path
- `mime_type`, `original_filename`
- `amount` (numeric)
- `bank_reference` (text, nullable)
- `status` (`payment_proof_status`)
- `verified_by` → `profiles.id` (admin, nullable)
- `verified_at`, `reject_reason`

### `job_updates`

- `job_id` → `jobs.id`
- `author_id` → `profiles.id`
- `message` (text)

### `admin_actions`

- `admin_id` → `profiles.id`
- `action_type` (text)
- `entity_type` (text)
- `entity_id` (uuid)
- `metadata` (jsonb)

### `commission_settings`

- `percent` (numeric 0..100)
- `effective_from` (timestamptz)
- `created_by` → `profiles.id` (nullable)

## Migrations (applied)

- `20260209043410_create_core_schema`
- `20260209043422_seed_categories`
- `20260209043501_seed_provinces_districts`
- `20260209043529_enable_rls_and_policies`
- `20260209045840_fix_function_search_paths`

