insert into public.show_media_types (id, created_at, type)
values (1, '2022-09-10 06:55:04+00', 'movie'),
  (2, '2022-09-10 06:55:20+00', 'tv');
insert into public.friendship_statuses (id, created_at, status)
values (1, '2022-09-09 23:44:18+00', 'accepted'),
  (2, '2022-09-09 23:44:57+00', 'invited'),
  (3, '2022-09-09 23:44:48+00', 'cancelled');
insert into auth.users(
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    invited_at,
    confirmation_token,
    confirmation_sent_at,
    recovery_token,
    recovery_sent_at,
    email_change_token_new,
    email_change,
    email_change_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    is_super_admin,
    created_at,
    updated_at,
    phone,
    phone_confirmed_at,
    phone_change,
    phone_change_token,
    phone_change_sent_at,
    -- confirmed_at,
    email_change_token_current,
    email_change_confirm_status,
    banned_until,
    reauthentication_token,
    reauthentication_sent_at
  )
values(
    '00000000-0000-0000-0000-000000000000',
    '3a26a657-32d1-4f2a-90fb-c47deb67a39a',
    'authenticated',
    'authenticated',
    'damien.herv@gmail.com',
    '$2a$10$wGw3wa3AVMF83qgNEyPbtu5RoeQU.VCuOfg.XO44SvoOqaBGya0/.',
    '2022-11-17 23:37:39.889131+00',
    '2022-11-17 23:37:11.959965+00',
    '',
    '2022-11-17 23:37:11.959965+00',
    '',
    null,
    '',
    '',
    null,
    '2022-11-17 23:37:39.890456+00',
    '{"provider":"email","providers":["email"]}',
    '{}',
    null,
    '2022-11-17 23:37:11.829585+00',
    '2022-11-17 23:37:39.896095+00',
    null,
    null,
    '',
    '',
    null,
    -- '2022-11-17 23:37:39.889131+00',
    '',
    0,
    null,
    '',
    null
  );
insert into public.profiles(id, updated_at, username, avatar_url)
values (
    '3a26a657-32d1-4f2a-90fb-c47deb67a39a',
    '2022-11-18 10:25:14.418+00',
    'damien',
    '0.3869922348285215.jpg'
  );
insert into storage.buckets (id, name)
values ('avatars', 'avatars');
create policy "bucket public access" on storage.objects as permissive for
select using (bucket_id = 'avatars');
create policy "bucket insert access" on storage.objects as permissive for
insert to authenticated with check (true);
create policy "bucket update access" on storage.objects as permissive for
update to authenticated with check (true);
-- CREATE POLICY "profiles read access for all users" ON "public"."profiles" AS PERMISSIVE FOR
-- SELECT TO public USING (true);
-- CREATE POLICY "profiles insert access for authenticated users" ON public.profiles AS PERMISSIVE FOR
-- INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "profiles update access for authenticated users" ON public.profiles AS PERMISSIVE FOR
-- UPDATE TO authenticated WITH CHECK (true);
-- CREATE POLICY "Enable read access for all users" ON public.profiles AS PERMISSIVE FOR
-- SELECT TO public USING (true);