-- ==============================================================================
-- Schema Migration: 20261110000000_init_schema.sql
-- Description: Client Acquisition, Inquiry Management, and Secure Admin RLS Schema
-- Author: Senior Full Stack Software Engineer / Database Architect
-- ==============================================================================

-- 1. Ensure required extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. Admin Profiles / Authorization Allowlist
-- Purpose: Strict role-based authorization to prevent any authenticated user from escalating to admin
CREATE TABLE IF NOT EXISTS public.admin_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;

-- Helper security function to verify if the executing user is a verified administrator
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.admin_profiles
    WHERE id = auth.uid()
  );
$$;

-- RLS for admin_profiles
CREATE POLICY "Admins can view admin profiles"
    ON public.admin_profiles
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

-- 3. Inquiries Table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    name TEXT NOT NULL CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 120),
    email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    company TEXT DEFAULT '',
    contact_number TEXT DEFAULT '',
    project_type TEXT NOT NULL CHECK (char_length(trim(project_type)) > 0),
    industry TEXT NOT NULL CHECK (char_length(trim(industry)) > 0),
    budget_range TEXT NOT NULL CHECK (char_length(trim(budget_range)) > 0),
    timeline TEXT NOT NULL CHECK (char_length(trim(timeline)) > 0),
    existing_website TEXT DEFAULT '',
    problem TEXT NOT NULL CHECK (char_length(trim(problem)) >= 5),
    desired_outcome TEXT NOT NULL CHECK (char_length(trim(desired_outcome)) >= 5),
    details TEXT NOT NULL CHECK (char_length(trim(details)) >= 10),
    consent BOOLEAN NOT NULL DEFAULT false CHECK (consent = true),
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (
        status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'IN_PROGRESS', 'COMPLETED', 'CLOSED')
    ),
    internal_notes TEXT DEFAULT ''
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_status ON public.inquiries (status);
CREATE INDEX IF NOT EXISTS idx_inquiries_email ON public.inquiries (email);
CREATE INDEX IF NOT EXISTS idx_inquiries_project_type ON public.inquiries (project_type);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS set_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER set_inquiries_updated_at
    BEFORE UPDATE ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 4. Inquiry Activity / Audit History Table
CREATE TABLE IF NOT EXISTS public.inquiry_activity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    note TEXT DEFAULT '',
    performed_by TEXT NOT NULL DEFAULT 'System',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_activity_inquiry_id ON public.inquiry_activity (inquiry_id, created_at DESC);
ALTER TABLE public.inquiry_activity ENABLE ROW LEVEL SECURITY;

-- 5. Row Level Security (RLS) Policies on Inquiries
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- Anonymous visitors:
-- Can INSERT new inquiries with valid status = 'NEW' and consent = true
CREATE POLICY "Public visitors can insert project inquiries"
    ON public.inquiries
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (
        status = 'NEW' AND
        consent = true AND
        char_length(trim(name)) >= 2 AND
        char_length(trim(email)) >= 5
    );

-- Strict Admin Access Policies:
-- Only users verified in admin_profiles can SELECT, UPDATE, or DELETE inquiries
CREATE POLICY "Admins can view inquiries"
    ON public.inquiries
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins can update inquiries"
    ON public.inquiries
    FOR UPDATE
    TO authenticated
    USING (public.is_admin())
    WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete inquiries"
    ON public.inquiries
    FOR DELETE
    TO authenticated
    USING (public.is_admin());

-- RLS on inquiry_activity
CREATE POLICY "Admins can view inquiry activities"
    ON public.inquiry_activity
    FOR SELECT
    TO authenticated
    USING (public.is_admin());

CREATE POLICY "Admins can create inquiry activity logs"
    ON public.inquiry_activity
    FOR INSERT
    TO authenticated
    WITH CHECK (public.is_admin());

-- Automated trigger to log initial inquiry creation
CREATE OR REPLACE FUNCTION public.log_new_inquiry()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.inquiry_activity (inquiry_id, action, note, performed_by)
    VALUES (NEW.id, 'INQUIRY_RECEIVED', 'Project inquiry received from website form.', COALESCE(NEW.name, 'Client'));
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_log_new_inquiry ON public.inquiries;
CREATE TRIGGER trigger_log_new_inquiry
    AFTER INSERT ON public.inquiries
    FOR EACH ROW
    EXECUTE FUNCTION public.log_new_inquiry();

